"use client"
import React, {Component, useState} from 'react'
import {useRouter} from "next/router";
import Link from "next/link";
import axios from "axios";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            show: false,
            s:false,
        }
    }
componentDidMount() {
    fetch("http://localhost:3001/user", {
            method: 'POST',
            crossDomain: true,
            headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            Accept: 'application/json'},
            body: JSON.stringify({
                token: window.localStorage.getItem("token")
            }),
        })
        .then((res) => res.json())
        .then((data) => {
                console.log(data,"userData");
                this.setState({name: data.data.name, email: data.data.email})
        })
}

logOut(){
        window.localStorage.clear()
        window.location.href="/login"
}
    render(){
    return (
    <div>
        <title>E-tutor</title>
        <div className={'flex items-center p-4 border border-gray-300 border-1 gap-2'}>
            <div className={'rounded-full ml-4 p-3 shadow-md hover:shadow-lg font-semibold bg-gray-100 cursor-pointer'}
                 onClick={() => {
                     this.setState({show: !this.state.show})
                 }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="gray"
                     className="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                </svg>
            </div>
            <div className={'ml-2 select-none cursor-pointer'}>
                <a href={`/home`}
                   className={'text-2xl md:text-3xl lg:text-4xl font-bold text-gray-600'}>E-Tutor </a>
            </div>
            <div className={'hidden md:flex items-center'}>

            </div>
            <div></div>
            <div className={'hidden md:flex absolute right-[182px] lg:right-[220px] items-center ml-4'}>
                <div
                    className={'hidden md:flex items-center p-2 gap-4 bg-white rounded-full shadow-md hover:shadow-lg w-full'}>
                    <div className={'ml-2'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                             stroke="gray" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                        </svg>
                    </div>
                    <input className={'focus:outline-none'} type={'text'} alt={'/'}/>
                </div>
            </div>
            <div
                className={'fixed right-10 ml-2 flex items-center rounded-full p-2 shadow-md hover:shadow-lg font-semibold bg-gray-100 cursor-pointer gap-2'}
                onClick={() => {
                    this.setState({s: !this.state.s})
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="w-7 h-7">
                    <path fill-rule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                          clip-rule="evenodd"/>
                </svg>
                <div className={'mr-2 text-gray-600 text-[13px]'}>
                    <h1>{this.state.name}</h1>
                </div>
            </div>
            {this.state.show ?
                    <div>
                        <div className={'absolute left-0 items-center mt-[38px] h-screen border '}>
                            <div className={'flex flex-col'}>
                                <ul className={'p-6 gap-4 text-gray-600 font-semibold'}>
                                    <li className={''}><a href={`/home`}>Dashboard</a>
                                    </li>
                                    <li className={'mt-4'}><a href={'/about'}>About us</a></li>
                                    <li className={'mt-4'}><a href={'/news'}>News</a></li>
                                    <li className={'mt-4'}><a href={'/user'}>User Policy</a></li>
                                    <li className={'mt-4'}><a href={'/contact'}></a>Contact us</li>
                                </ul>

                            </div>
                        </div>
                    </div> : ""
            }
            {this.state.s ?<div className={'fixed duration-200 right-5 top-12 w-[150px] h-[120px] rounded-lg items-center justify-center mt-10 h-screen border bg-gray-200 '}>
                <div className={'flex flex-col mt-4'}>
                    <div>
                    <div className={'flex flex-col items-center justify-center'}>
                            <h1 className={'text-xl font-semibold'}>{this.state.name}</h1>
                        <button onClick={this.logOut} className={'bg-red-200 border border-red-200 rounded-lg shadow-md mt-4 text-xl text-red-700 hover:shadow-lg font-semibold'}>Logout</button>
                        </div>
                    </div>
                </div>
            </div> : <div className={'fixed right-[-1000px] duration-500 top-12 w-[180px] h-[120px] rounded-lg justify-center mt-10 h-screen border bg-gray-300 '}>
                <div className={'flex flex-col p-4'}>
                    <div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
            }

        </div>
        <div>
            <h1 className={'flex justify-center mt-10 font-semibold text-4xl text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-red-600 from-violet-700 to-red-500 items-center justify-center text-4xl md:text-5xl lg:text-6xl'}>
                Welcome to dashboard
            </h1>
        </div>

        <div className={'flex mt-10 pt-5 justify-center items-center gap-4'}>
            <div className={'flex flex-col items-center gap-4'}>
                <h1 className={'text-2xl md:text-3xl lg:text-4xl font-semibold select-none'}>Where you need to go?</h1>
                <div className={' mt-5 flex text-2xl md:text-3xl lg:text-4xl items-center justify-center gap-5'}>
                    <Link href={`/chat`}>
                        <button
                            className={'shadow-lg bg-gray-300 border-gray-300 text-indigo-700 text-2xl hover:scale-110 duration-500 hover:bg-indigo-700 hover:border-indigo-700 hover:text-white md:text-3xl lg:text-4xl font-semibold rounded-lg'}>Connect
                        </button>
                    </Link>
                    <Link href={`/test`}>
                        <button
                            className={'shadow-lg bg-gray-300 border-gray-300 text-indigo-700 text-2xl hover:scale-110 duration-500 hover:bg-indigo-700 hover:border-indigo-700 hover:text-white md:text-3xl lg:text-4xl font-semibold rounded-lg'}>Test
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
)
}
}

