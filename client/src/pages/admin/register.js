"use client"
import React,{useState} from 'react'
import {useRouter} from "next/router";
import axios from "axios";


const Register = () => {
    const [name, setName] = useState('');
  const [email , setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('')
  const [cpassword, setCPassword] = useState('');
    const router = useRouter()
    var passw=  /^[A-Za-z]\w{1,14}$/

  const registerUser = async (e) => {
      e.preventDefault();
      if(email === '' || password === '' || name === '' || cpassword === ''){
            setErrors("Please fill all the fields");
            return;
        }
      if(password !== cpassword){
            setErrors("Password does not match");
            return;
      }
      if(password.length < 6){
            setErrors("Password should be atleast 6 characters");
            return;
      }
      if (password.match(passw)) {
            setErrors("Password needs atleast one uppercase Special letter");
            return;
      }
      await axios.post('http://localhost:3001/admin/register', {name, email, password})
          .then((res) => {
              console.log(res.data);
              router.replace('/admin/login')
          })
            .catch((err) => {
                console.log(err);
        })
  }

    return (
    <div>
        <title>Admin Register</title>
        <div className='min-h-screen flex flex-col justify-center items-center bg-gray-400'>
        <div className='w-[500px] md:w-[500px] lg:w-[500px] h-[500px] bg-pink-100 rounded-3xl p-4 mx-auto my-auto'>
            <div className={'w-full flex flex-col'}>
                <h2 className="text-center text-red-600 text-xl font-semibold">{errors}</h2>
                <h1 className='text-4xl  md:text-4xl lg:text-4xl flex justify-center font-semibold px-4 lg:mr-3 pt-4'>Admin Register</h1>
                <form action="" className='flex flex-col pt-10 p-4 gap-5 items-center'>
                <div className='flex flex-col justify-center gap-5'>
                <input  className='p-2   outline outline-1 rounded outline-black' type="text" name='Name' placeholder='User Name' value={name} onChange={(e) => setName(e.target.value)}/>
                <input  className='p-2  outline outline-1 rounded outline-black' type="email" name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input  className='p-2 outline outline-1 rounded outline-black' type="password" name='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input  className='p-2 outline outline-1 rounded outline-black' type="password" name='cpassword' placeholder='Confirm Password' value={cpassword} onChange={(e) => setCPassword(e.target.value)}/>
                <button onClick={registerUser} className='bg-cyan-600 border-cyan-600 text-white p-4 text-xl rounded-xl' >Login</button>
                </div>

            </form>
            </div>

        </div>
    </div>
    </div>
  )
}
export default Register
