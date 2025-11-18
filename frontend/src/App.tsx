import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify";

import 'animate.css';
import "react-toastify/dist/ReactToastify.css";

import Context from "./store/Context";

import NotFound from "./components/NotFound";

import RedirectGuard from "./guards/RedirectGuard";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login"

import Home from "./components/Home"
import AuthGuard from "./guards/AuthGuard";
import Layout from "./components/app/Layout"
import Students from "./components/app/UserProfile";
import Dashboard from "./components/app/Dashboard";
import StudentMarks from "./components/app/StudentMarks";





const App = () => {
  const [session, setSession] = useState< UserInterface | null>(null)

  
  return (
    <Context.Provider value={{session, setSession }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Students />} /> */}
          <Route element={<RedirectGuard /> }>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<AuthGuard />}>
            <Route path="/app" element={<Layout />}>
              <Route path="user" element={<Students />} />
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="marks/:id" element={<StudentMarks />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App