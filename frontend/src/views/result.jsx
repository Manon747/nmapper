import axios from "axios"

import { useEffect } from "react"
const Result = () => {
    let isRequested = false
    useEffect(() => {

        if (!localStorage.getItem("token")) { window.location.href = "/" }

        let component = `<tr className="bg-white border-b">
            <th className="px-6 py-4" style="vertical-align: top;">
                {{{host}}}
            </th>
            <td className="px-6 py-4" style="vertical-align: top;">
                {{{scanType}}}
            </td>
            <td className="px-6 py-4" style="vertical-align: top;">
                {{{maxRetries}}}
            </td>
            <td className="px-6 py-4" style="vertical-align: top;">
                {{{hostTimeout}}}
            </td>
            <td className="px-6 py-4" style="vertical-align: top;">
                {{{port}}}
            </td>
            <td className="px-6 py-4" style="vertical-align: top; white-space: pre-line; word-break: break-all;">
                {{{result}}}
            </td>
        </tr>
    `

        const request = async () => {
            if (isRequested) {
                let owner = localStorage.getItem("id")
                owner = owner.split('"').join("").split("'").join("")
                await axios.get(`http://localhost:3000/requests?owner=${owner}`, {})
                    .then((response) => {
                        if (response.data) document.getElementById("404").style.display = "none"
                        render(response.data.results, response.data.requests)
                    }).catch(() => alert("Impossible d'avoir la liste des requête"))
            }
            isRequested = true
        }

        const render = (results, requests) => {
            let temp = component.replace("{{{result}}}", results[results.length - 1].scanResult).replace("{{{host}}}", requests[results.length - 1].host)
            if (requests[results.length - 1].scanType) temp = temp.replace("{{{scanType}}}", requests[results.length - 1].scanType)
            else temp = temp.replace("{{{scanType}}}", "undefined")
            if (requests[results.length - 1].maxRetries) temp = temp.replace("{{{maxRetries}}}", requests[results.length - 1].maxRetries)
            else temp = temp.replace("{{{maxRetries}}}", "undefined")
            if (requests[results.length - 1].hostTimeout) temp = temp.replace("{{{hostTimeout}}}", requests[results.length - 1].hostTimeout)
            else temp = temp.replace("{{{hostTimeout}}}", "undefined")
            if (requests[results.length - 1].port != undefined) temp = temp.replace("{{{port}}}", requests[results.length - 1].port)
            else temp = temp.replace("{{{port}}}", "undefined")
            document.getElementById("values").innerHTML = temp
        }
        request()

        document.getElementById("disconnect").addEventListener("click", () => {
            localStorage.removeItem("id")
            localStorage.removeItem("username")
            localStorage.removeItem("token")
            window.location.href = "/"
        })
        return () => console.log("removed")
    }, [])


    return (
        <>
            <nav>
                <a href="/scan">Scanner</a>
                <a href="/history">Historique</a>
                <a className="actif" href="/result">Résultat</a>
                <a id="disconnect">Deconnexion</a>
            </nav>
            <div id="list" className="border-2 p-4 rounded-lg drop-shadow-sm bg-white">
                <h1 id="404">Aucun resultat pour l&apos;instant</h1>
                <div className="relative overflow-x-auto mb-4">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Host
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Scan type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Max retries
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Host timeout
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Port
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Resultat
                                </th>
                            </tr>
                        </thead>
                        <tbody id="values">
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Result

