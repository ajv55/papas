'use client'
import { useState, useRef, useEffect } from "react";
import {signIn, useSession} from 'next-auth/react'
import {toast} from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";

import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

export default function Page() {
    const {data: session} = useSession();
    const router = useRouter();

    const ref = useRef<HTMLFormElement>(null);



    const [data, setData] = useState({
        email: '',
        password: ''
})

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        ref.current?.reset()
        console.log('this is where we are going to signin')
        signIn('credentials', {...data, redirect: false}).then((callback) => {
            if(callback?.error) {
                toast.error(callback.error)
            }

            if(callback?.ok && !callback?.error) {
                router.push('/orders')
                toast.success('you have successfully logged in')
            }
        })
    }

    useEffect(() => {
      if(session?.user && session?.user.role !== 'admin'){
        router.push('/denied')
     }
     if(session && session?.user.role === 'admin'){
      router.push('/orders')
   }
    }, [session?.user.role])

    console.log(session?.user.role)

  return (
    <div className={`  min-h-screen flex items-center justify-center bg-primary-light py-12 px-4 sm:px-6 lg:px-8`}>
    <div className="max-w-lg w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center lg:text-5xl text-3xl leading-12 font-extrabold text-primary-dark">
          Sign in to your account
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-lg shadow-indigo-100">
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={data.email} 
              onChange={(e) => setData({...data, email: e.target.value}) }
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 lg:text-xl text-md"
              placeholder="Email address"
            />
          </div>
          <div className="-mt-px">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={data.password} 
              onChange={(e) => setData({...data, password: e.target.value}) }
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 lg:text-xl text-md"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 rounded"
            />
            <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm leading-5">
            <a href="#" className="font-medium text-primary-dark hover:text-primary-dark">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-primary-light bg-primary-dark hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink"
          >
            Sign In
          </button>
        </div>

        

       
      </form>
    </div>
  </div>
  )
}

