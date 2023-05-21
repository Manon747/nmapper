import axios from "axios"

import { useEffect } from "react"
const History = () => {
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
            for (let i = 0; i < results.length; i++) {
                if (i == 0) document.getElementById("values").innerHTML = ''
                const newValue = component.replace("{{{result}}}", results[i].scanResult).replace("{{{host}}}", requests[i].host).replace("{{{scanType}}}", requests[i].scanType).replace("{{{maxRetries}}}", requests[i].maxRetries).replace("{{{hostTimeout}}}", requests[i].hostTimeout).replace("{{{port}}}", requests[i].port) + document.getElementById("values").innerHTML
                document.getElementById("values").innerHTML = newValue
            }
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
                <a className="actif" href="/history">Historique</a>
                <a href="/result">Résultat</a>
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

export default History

