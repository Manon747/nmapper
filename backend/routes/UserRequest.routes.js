import { createRequest } from "./Request.routes.js"
import { spawn } from "child_process"
import UserModelRequest from "../db/models/UserRequest.model.js"
import { ObjectId } from "mongodb"

export const MakeUserRequest = (app) => {
  // GET USER OWNER REQUEST - HISTORY OF USER REQUEST
  app.get("/request/user", async (req, res) => {
    try {
      const userRequest = await UserModelRequest.aggregate([
        {
          $match: { owner: new ObjectId(req.query.owner_id) },
        },
      ])
      userRequest
        ? res.status(200).send(userRequest)
        : res.status(404).send({ message: "User Request not found" })
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: "Error when getting user request" })
    }
  })

  // SCAN REQUEST WITH NMAP
  app.post("/request/scan", (req, res) => {
    try {
      let { host, scanType, maxRetries, hostTimeout, port, owner } = req.body
      owner = owner.split('"').join("").split("'").join("")
      const opt = []

      if (scanType) {
        opt.push(scanType)
      }
      if (maxRetries) {
        opt.push("--max-retries")
        opt.push(maxRetries)
      }
      if (hostTimeout) {
        opt.push("--host-timeout")
        opt.push(hostTimeout)
      }
      if (port) {
        opt.push("-p")
        opt.push(port)
      }
      opt.push(host)

      console.log(opt);
      const nmapProcess = spawn("nmap", opt)
      let scanResult = ""
      nmapProcess.stdout.on("data", async (data) => {
        scanResult += data.toString()
      })


      nmapProcess.on("error", (error) => {
        console.error("An error occurred while executing Nmap process:", error)
        // Gérer l'erreur liée au processus Nmap
      })

      nmapProcess.on("close", async (code) => {
        console.log(code)

        if (code === 0) {
          // SAVE USER REQUEST TO HISTORY
          const NewUserModelRequest = new UserModelRequest({
            host,
            scanType,
            maxRetries,
            hostTimeout,
            port,
            owner,
          })
          await NewUserModelRequest.save()

          // SAVE REQUEST IN DATABASE
          await createRequest(scanResult, owner)
          res.status(200).send({ message: "Request saved successfully" })
        } else {
          res.status(500).send({ message: "Error when scan" })


          return
        }
      })
    } catch (error) {
      console.log("error ", error)
      res.status(500).send({ message: "Error when making scan request" })
    }
  })
}
