import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate()   // hook for navigation

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      console.log("Response:", data)

      if (data.success) {
        navigate("/login") 
      }
    } catch (err) {
      console.error("Error:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" onChange={handleOnChange} placeholder="Enter your Name" />

      <label htmlFor="email">Email</label>
      <input type="email" name="email" onChange={handleOnChange} placeholder="Enter Valid Email" />
      
      <label htmlFor="password">Password</label>
      <input type="password" name="password" onChange={handleOnChange} placeholder="Password" />

      <button type="submit">Submit</button>
    </form>
  )
}

export default Signup
