"use client"
import React, {Component} from 'react'
import axios from "axios";
import {useRouter} from "next/router";

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault()
        const {name, email, password} = this.state;
        console.log(name, email, password);
        fetch("http://localhost:3001/register", {
            method: 'POST',
            crossDomain: true,
            headers: {'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            Accept: 'application/json'},
            body: JSON.stringify({name, email, password})
        })
        .then((res) => res.json())
            .then((data) => {
                console.log(data,"user");
                if(data.Status === "Success"){
                    alert("Register Successful");
                    window.location.href="/login";
                }
        })
    }
     render (){
        return(
            <div>
                <title>Student Register</title>
                <div className='min-h-screen flex flex-col justify-center items-center bg-gray-400'>
                    <div className='w-[500px] md:w-[500px] lg:w-[500px] h-[500px] bg-pink-100 rounded-3xl p-4 mx-auto my-auto'>
                        <div className={'w-full flex flex-col justify-center'}>
                            <h1 className='text-4xl md:text-5xl lg:text-5xl flex items-center justify-center font-semibold px-4 lg:mr-3 pt-4'>Student Register</h1>
                            <p className='lg:text-xl flex items-center justify-center px-4 text-pink-100 select-none'>If you are Admin,</p>
                            <form action="" className='flex flex-col justify-center p-3 gap-5 items-center'>
                                <div className='flex flex-col justify-center gap-5'>
                                <input  className='p-2  outline outline-1 rounded outline-black' type="text" name='Name' placeholder='User Name' onChange={e=>this.setState({name:e.target.value})}/>
                                <input  className='p-2  outline outline-1 rounded outline-black' type="email" name='email' placeholder='Email' onChange={e=>this.setState({email:e.target.value})}/>
                                <input  className='p-2 outline outline-1 rounded outline-black' type="password" name='password' placeholder='Password' onChange={e=>this.setState({password:e.target.value})}/>
                                <input  className='p-2 outline outline-1 rounded outline-black' type="password" name='cpassword' placeholder='Confirm Password' />
                                <button className='bg-cyan-600 text-white p-4 text-xl border-cyan-600 rounded-xl' onClick={this.handleSubmit}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
     }
}

