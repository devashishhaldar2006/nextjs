'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router=useRouter()
 

    const handleSignIn=async (e:React.FormEvent)=>{
        e.preventDefault()
try {
    const result=await signIn('credentials',{
        email,password,redirect:false
    })
    router.push("/")
} catch (error) {
    console.log(error)
}
    }
  
    return (
        <div className='min-h-screen flex items-center justify-center bg-black text-white px-4'>
            <div className='w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg bg-gray-900'>
                <h1 className='text-2xl font-semibold text-center mb-6'>Login</h1>
                <form className='space-y-6' onSubmit={handleSignIn}>
                   
                    <div>
                        <label className='block mb-1 font-medium'>Email</label>
                        <input
                            type="text"
                            placeholder='Enter Email'
                            className='w-full border-b border-white py-2 px-1 bg-gray-900 text-white outline-none placeholder-gray-400'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div>
                        <label className='block mb-1 font-medium'>Password</label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            className='w-full border-b border-white py-2 px-1 bg-gray-900 text-white outline-none placeholder-gray-400'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <p className='text-sm text-center mt-1' onClick={()=>router.push("/register")}>Want To Create an account ? <span className='text-blue-400 hover:underline'>Register</span></p>



                    <button className='w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors'>Login</button>
                </form>


                <div className='flex items-center gap-[5px] justify-center my-5'>
                    <hr className="flex-grow border-gray-500" />
                    <span>OR</span>
                    <hr className="flex-grow border-gray-500" />
                </div>

                <button className='w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-400 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors' onClick={async ()=>{
                    await signIn('google',{
                      callbackUrl:"/"
                    })
                   
                    }}>
                    <FcGoogle />
                    <span >Sign In With Google</span>
                </button>



            </div>
        </div>
    )
}

export default Login