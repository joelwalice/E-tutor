
import React,{useEffect} from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'


export default function Home() {
    let isLoggedIn = false;
    useEffect(() => {
        if(typeof window !== "undefined"){
            // eslint-disable-next-line react-hooks/exhaustive-deps
            isLoggedIn = window.localStorage.getItem('loggedIn') === 'true';
        }

    }, [])

    const handleButtonClick = () => {
    if (isLoggedIn) {
      window.location.href = '/home'; // Redirect to home page
    } else {
      window.location.href = '/login'; // Redirect to login page
    }
  };
  return (
    <>
        <title>E-Tutor Site</title>
      <div className={'flex justify-center items-center bg-gradient-to-r from-violet-700 to-red-500 w-screen h-screen gap-4'}>
        <div className={'absolute left-[50px] md:left-[70px] lg:left-[100px] flex flex-col items-center'}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                 stroke="white" className="w-10 h-10">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
            </svg>
          </div>
        <h1 className={'text-3xl md:text-5xl lg:text-7xl font-semibold select-none'}>E-Tutor</h1>
          <h1 className={'text-3xl md:text-5xl lg:text-7xl font-semibold select-none'}>Site</h1>
        </div>
        <div className={'flex flex-col items-center absolute right-[50px] md:right-[70px] lg:right-[100px] gap-4'}>
          <h1 className={'text-2xl md:text-3xl lg:text-4xl font-semibold select-none'}>LOGIN AS</h1>
          <div className={'flex text-2xl md:text-3xl lg:text-4xl items-center justify-center gap-5'}>
          <button className={'shadow-lg bg-gray-400 border-gray-400 text-indigo-700 text-2xl hover:scale-110 duration-500 hover:bg-indigo-700 hover:border-indigo-700 hover:text-white md:text-3xl lg:text-4xl rounded-lg'} onClick={handleButtonClick}>Student</button>
          <Link href={'/admin/login'}><button className={'shadow-lg bg-gray-400 border-gray-400 text-indigo-700 text-2xl hover:scale-110 duration-500 hover:bg-indigo-700 hover:border-indigo-700 hover:text-white md:text-3xl lg:text-4xl rounded-lg'}>Admin</button></Link>
          </div>
        </div>
      </div>
    </>
  )
}
