'use client';
import { api } from "@/api";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";

export default function index() {

  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const { toast } = useToast()

  function handleSubmit(event) {
    event.preventDefault()
    api.post('/auth/login', {email, password})
      .then(response => {
        toast({
          description: "Login Successfull",
          className: "bg-green-500 text-white", // Use the custom CSS class
          duration: 2000,
          title: "Success",
          
        })
        localStorage.setItem('token', response.data)
      })
      .catch(error => {
        toast({
          description: "Login Failed",
          variant: "destructive", 
          duration: 2000,
          title: "Error",
        })
      })
  }

  return (
    <>

  <div className="bg-gray-100 flex justify-center items-center h-screen">
    
    <div className="w-1/2 h-screen hidden lg:block">
      <img
        src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
        alt="Placeholder Image"
        className="object-cover w-full h-full"
      />
    </div>
    
    <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
       
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">
            Email
          </label>
          <input
            type="text"
            id="username"
            name="email"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            autoComplete="off"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            autoComplete="off"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        
        
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
        >
          Login
        </button>
      </form>

    </div>
  </div>
</>
  );
}