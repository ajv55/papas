import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-2 h-screen'>
        <h1>Access Denied!!</h1>
        <p>you are logged in, but you do not have the required access status. </p>
        <Link href='/'>Back to Home Page</Link>
    </div>
  )
}
