"use client"
import { useState } from 'react'
import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const Login = () => {
    const [email , setEmail] = useState('')
  const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    const router = useRouter()
    const [user, setUser] = useState(false);

  const loginUser = async (e) => {
        e.preventDefault();
        if(email === '' || password === ''){
            setErrors("Please fill all the fields");
            return;
        }
        await axios.post('http://localhost:3001/admin/login', {email, password})
          .then((res) => {
              console.log(res.data);
              if(res.data.Status === "Success"){
                  router.push(`/admin/home?name=${encodeURIComponent(res.data.name)}`);
              }
              else if(res.data === "Password does not match"){
                    setErrors("Password does not match");
              }
              else{
                  setErrors("User does not exist");
              }
          })
            .catch((err) => {
                console.log(err);
        })
  }

  return (
      <>
          <title>Admin Login</title>
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-400'>

        <div className='w-[500px] md:w-[500px] lg:w-[500px] h-[500px] bg-pink-100 rounded-3xl p-4 mx-auto my-auto'>

            <div className={'w-full flex flex-col'}>
                <h2 className="text-center text-red-600 text-xl font-semibold">{errors}</h2>
                <h1 className='text-4xl md:text-5xl lg:text-5xl flex items-center justify-center font-semibold px-4 lg:mr-4 pt-4'>Login Page</h1>
                <p className='lg:text-xl pt-4 px-4 text-pink-100 select-none'>Be a Consumer,
                </p>
                <form action="" className='flex flex-col justify-center p-4 pt-6 gap-5'>
                <div className=' flex flex-col justify-center gap-5'>
                <input  className='p-2 outline outline-1 rounded outline-black' type="email" name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input  className='p-2 outline outline-1 rounded outline-black' type="password" name='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                    <button onClick={loginUser} className=' p-4 flex flex-col items-center bg-cyan-600 text-xl text-white border border-cyan-600 rounded-xl pt-auto' >Login</button>
                <div className='flex justify-center items-center gap-2 md:text-xl lg:text-xl'><p className='text-gray-500'>--------</p>
                <h3 className='text-center text-gray-500'>OR</h3>
                <p className='text-gray-500'>   --------</p>
                </div>

            </form>
            <div className='flex flex-col justify-center items-center'>
                    <button onClick={() => {window.location.assign('register')}} className='bg-red-600 text-white text-xl border-red-600 rounded-md p-4'>Register Yourself</button>
                </div>
            </div>


        </div>
    </div>
     </>
  )
}
export default Login
