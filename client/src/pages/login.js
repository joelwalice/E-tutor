"use client"
import React, {useState , Component} from 'react'
import Link from "next/link";
import {useRouter} from "next/router";
import axios from "axios";


export default class Login extends Component {
        constructor(props) {
            super(props);
            this.state = {
                email: '',
                password: '',
            }
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleSubmit(e) {
            e.preventDefault()
            const {email, password} = this.state;
            console.log(email, password);
            fetch("http://localhost:3001/login", {
                method: 'POST',
                crossDomain: true,
                headers: {'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                Accept: 'application/json'},
                body: JSON.stringify({email, password})
            })
            .then((res) => res.json())
                .then((data) => {
                    console.log(data,"user");
                    if(data.Status === "Success"){
                        alert("Login Successful");
                        window.localStorage.setItem("token", data.data);
                        window.localStorage.setItem("loggedIn", true);
                        window.location.href="/home";
                    }
                    else{
                        alert("Invalid Credentials");
                    }
            })
        }
        render () {
            return (
                <>
                    <title>Student Login</title>
                    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-400'>

                        <div
                            className='w-[500px] md:w-[500px] lg:w-[500px] h-[500px] bg-pink-100 rounded-3xl p-4 mx-auto my-auto'>

                            <div className={'w-full flex flex-col justify-center'}>
                                <h1 className='text-4xl md:text-5xl flex items-center justify-center lg:text-5xl font-semibold px-4 lg:mr-4 pt-2'>Student
                                    Login</h1>
                                <p className='lg:text-xl flex items-center justify-center pt-4 px-4'>If you are
                                    Admin, <Link href={"/admin/login"}>
                                        <button
                                            className='text-cyan-600 cursor-pointer font-semibold border border-pink-100 p-2'>Login
                                        </button>
                                    </Link>
                                </p>
                                <form action="" className='flex flex-col justify-center p-4 pt-6 gap-5'>
                                    <div className=' flex flex-col justify-center gap-5'>
                                        <input className='p-2 outline outline-1 rounded outline-black' type="email" name='email' placeholder='Email'  onChange={(e) => this.setState({email:e.target.value})}/>
                                        <input className='p-2 outline outline-1 rounded outline-black' type="password" name='password' placeholder='Password' onChange={(e) => this.setState({password:e.target.value})}/>
                                    </div>
                                    <button onClick={this.handleSubmit}
                                            className=' p-4 flex flex-col items-center bg-cyan-600 text-xl text-white border border-cyan-600 rounded-xl pt-auto'>Login
                                    </button>
                                    <div className='flex justify-center items-center gap-2 md:text-xl lg:text-xl'><p
                                        className='text-gray-500'>--------</p>
                                        <h3 className='text-center text-gray-500'>OR</h3>
                                        <p className='text-gray-500'> --------</p>
                                    </div>

                                </form>
                                <div className='flex flex-col justify-center items-center'>
                                    <button onClick={() => {
                                        window.location.assign('register')
                                    }} className='bg-red-600 text-white text-xl border-red-600 rounded-md p-4'>Register
                                        Yourself
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
}

