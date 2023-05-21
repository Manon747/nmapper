import axios from "axios"

import { useEffect } from "react"
const Signup = () => {
    useEffect(() => {
        if (localStorage.getItem("token")) { window.location.href = "/scan" }

        return () => {
            console.log("removed")
        }
    }, [])

    const handleSubmit = async () => {
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value

        if (username && password) { await request(username, password) }
        else { alert("Veuillez remplir tout les champs") }
    }

    const request = async (username, password) => {
        await axios.post("http://localhost:3000/signup", { username: username, password: password })
            .then((response) => {
                console.log("Réponse du serveur :", response.data)
                localStorage.setItem("id", JSON.stringify(response.data.id))
                localStorage.setItem("username", JSON.stringify(response.data.username))
                localStorage.setItem("token", JSON.stringify(response.data.token))
                alert(`Inscrit en tant que ${response.data.username}`)
                window.location.href = "/scan"
            })
            .catch(() => { alert("Impossible de créer le compte") })
    }


    return (
        <>
            <div id="form" className="border-2 p-4 rounded-lg drop-shadow-sm bg-white">
                <h1 className="text-4xl font-medium text-gray-900 mb-4 w-full">Inscription</h1>
                <div className="mb-6">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Nom d&apos;utilisateur</label>
                    <input type="text" id="username"
                        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="john.doe" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                    <input type="password" id="password"
                        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="•••••••••" required />
                </div>
                <div className="flex items-start mb-6">
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Vous avez déjà un compte?
                        <a href="/"
                            className="text-blue-600 hover:underline dark:text-blue-500">Connexion</a>.</label>
                </div>
                <button id="submit" onClick={handleSubmit}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center">S&apos;inscrire</button>
            </div>
        </>
    )
}

export default Signup

