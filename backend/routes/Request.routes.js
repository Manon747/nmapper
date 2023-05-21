import RequestModel from "../db/models/Request.model.js"
import UserModelRequest from "../db/models/UserRequest.model.js"

// CREATE REQUEST FUNCTION
export const createRequest = async (scanResult, owner) => {
  const newRequest = new RequestModel({ scanResult, owner })
  await newRequest.save()
}


export const MakeRequests = async (app) => {
  // GET ALL REQUEST PASSED
  app.get("/requests", async (req, res) => {
    try {
      const owner = req.query.owner
      const results = await RequestModel.find({ owner }, { _id: 0, owner: 0, __v: 0 })
      const requests = await UserModelRequest.find({ owner }, { _id: 0, owner: 0, __v: 0 })

      requests
        ? res.status(200).send({ results, requests })
        : res.status(404).send({ message: "Request not found" })
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: "Internal Server Error" })
    }
  })
}
