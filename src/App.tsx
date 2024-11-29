import { Login } from "./Pages/Login"
import { Home } from "./Pages/Home";
import ReactDOM from "react-dom/client";


import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home/>}/>
          <Route path="Login" element={<Login/>}/>
          
        
        </Route>
      </Routes>
    
    </BrowserRouter>
  )
}