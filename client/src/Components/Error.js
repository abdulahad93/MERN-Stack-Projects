import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate();
  return (
    <>
      <div style={{textAlign:"center" ,color : "blueviolet"}}>
        <h1>Error</h1>
        <button style={{cursor:"pointer"}} onClick={()=>navigate("/login")}>Click To Login</button>
      </div>
    </>
  )
}

export default Error