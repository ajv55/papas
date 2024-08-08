'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import style from '@/app/style.module.css'

export default function Page() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const userName = session?.user?.name;

    console.log(status)
    
    useEffect(() => {
        if(session && status !== 'authenticated'){
            router.push('/login')
        } 
        if(status === 'unauthenticated') {
            router.push('/login')
        }
    }, [session])



    const handleClick = () => {
        signOut();
    };

    return (
        <div className={`min-h-screen bg-primary-dark flex justify-center items-center`}>
            <div className=" bg-white w-[23rem] lg:w-[45%] ring-2 ring-accent-dark xl:w-[45%] rounded-xl p-8 flex flex-col justify-center items-center shadow-2xl">
                <h1 className="text-3xl lg:text-4xl font-extrabold text-center mb-6 tracking-wide text-primary-light">
                    Are you sure you want to sign out?
                </h1>
                <h6 className="text-lg lg:text-xl mb-8 text-primary-dark">
                    Bye, {userName?.toUpperCase()}!
                </h6>
                <button
                    onClick={handleClick}
                    className="w-full lg:w-[85%] py-3 bg-red-500 text-white rounded-lg text-lg lg:text-xl font-semibold hover:bg-red-600 transition-colors mb-4"
                >
                    Sign Out
                </button>
                <Link
                    href='/'
                    className="w-full lg:w-[85%] py-3 bg-primary-light text-center text-white rounded-lg text-lg lg:text-xl font-semibold hover:bg-primary-orange transition-colors"
                >
                    Cancel
                </Link>
            </div>
        </div>
    );
}

