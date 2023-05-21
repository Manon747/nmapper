import axios from "axios"

import { useEffect } from "react"
const Scan = () => {
    useEffect(() => {
        if (!localStorage.getItem("token")) { window.location.href = "/" }
        document.getElementById("disconnect").addEventListener("click", () => {
            localStorage.removeItem("id")
            localStorage.removeItem("username")
            localStorage.removeItem("token")
            window.location.href = "/"
        })
        return () => {
            console.log("removed")
        }
    }, [])

    const handleSubmit = async () => {
        let maxRetries = document.getElementById("maxRetries").value
        let scanType = document.getElementById("scanType").value
        let host = document.getElementById("host").value
        let port = document.getElementById("port").value
        let hostTimeout = document.getElementById("hostTimeout").value
        let owner = localStorage.getItem("id")
        let data = {}
        port ? data = { maxRetries, scanType, host, port, hostTimeout, owner } : data = { maxRetries, scanType, host, hostTimeout, owner }

        if (host && owner) await request(data)
        else alert("Veuillez remplir au moin le champ host")
    }

    const request = async (data) => {
        const scanning = document.getElementById("scanning")
        const submit = document.getElementById("submit")
        submit.style.display = "none"
        scanning.style.display = "block"
        await axios.post("http://localhost:3000/request/scan", data).then(() => {
            window.location.href = "/result"
            alert(`Scan réussi`)
        }).catch((e) => alert("Impossible de faire le scan"))
        scanning.style.display = "none"
        submit.style.display = "block"
    }


    return (
        <>
            <nav>
                <a className="actif" href="/scan">Scanner</a>
                <a href="/history">Historique</a>
                <a href="/result">Résultat</a>
                <a id="disconnect">Deconnexion</a>
            </nav>
            <div id="form" className="border-2 p-4 rounded-lg drop-shadow-sm bg-white">
                <h1 className="text-4xl font-medium text-gray-900 mb-4 w-full">Scanner</h1>
                <div className="mb-6">
                    <label htmlFor="scanType" className="block mb-2 text-sm font-medium text-gray-900">scanType</label>
                    <select id="scanType"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                        <option selected value="-sS">-sS</option>
                        <option value="-sO">-sO</option>
                        <option value="">Aucun</option>
                    </select>

                </div>
                <div className="mb-6">
                    <label htmlFor="host" className="block mb-2 text-sm font-medium text-gray-900 ">Host</label>
                    <input type="text" id="host"
                        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="192.165.20.1" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="port" className="block mb-2 text-sm font-medium text-gray-900 ">Port</label>
                    <input type="number" id="port"
                        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="8080" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="hostTimeout" className="block mb-2 text-sm font-medium text-gray-900 ">Host Timeout (en ms)</label>
                    <input type="text" id="hostTimeout"
                        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="1000" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="maxRetries" className="block mb-2 text-sm font-medium text-gray-900 ">Max Retries</label>
                    <input type="number" id="maxRetries"
                        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="1" required />
                </div>
                <button id="submit" onClick={handleSubmit}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center">Scanner</button>
                <button id="scanning"
                    className="text-white bg-blue-800  font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center">Scan en
                    cours...</button>
            </div>
        </>
    )
}

export default Scan

