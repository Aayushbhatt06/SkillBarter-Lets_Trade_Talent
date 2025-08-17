import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log("Response:", data)

      if (data.success) {
        localStorage.setItem("token", data.jwtToken);
        navigate("/")   // redirect after successful login
      }
    } catch (err) {
      console.error("Error:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input 
        type="email" 
        name="email" 
        onChange={handleOnChange} 
        placeholder="Enter Valid Email" 
        required
      />

      <label htmlFor="password">Password</label>
      <input 
        type="password" 
        name="password" 
        onChange={handleOnChange} 
        placeholder="Password" 
        required
      />

      <button type="submit">Login</button>
    </form>
  )
}

export default Login
