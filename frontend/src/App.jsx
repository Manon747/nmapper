import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Result from './views/result.jsx'
import Scan from './views/scan.jsx'
import Signin from './views/signin.jsx'
import Signup from './views/signup.jsx'
import History from './views/history.jsx'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/scan" element={<Scan />}></Route>
          <Route path="/result" element={<Result />}></Route>
          <Route path="/history" element={<History />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

