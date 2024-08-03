'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GiCupcake } from 'react-icons/gi';
import { MdDashboard } from "react-icons/md";
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import Receipt from '@/app/components/manageOrder';
import Analytics from '@/app/components/analytics';
import Product from '@/app/components/product';

// Separate viewport configuration
export const viewport = 'width=device-width, initial-scale=1';


const Page =  () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {data: session} = useSession();

  console.log(session);

  

  const pathname = usePathname();
  console.log(pathname)

  // const {data: session} = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session === null){
      return router.push('/login')
    }
    
    if(session && session === null){
      return router.push('/login')
    }
    
    session && session?.user?.role !== 'admin' && router.push('/denied')
  }, [session])

  const fetchOrders = async () => {
    setIsLoading(true)
    await axios.get('/api/getOrders').then((res) => {
        if(res.status === 201) {
            setOrders(res?.data)
        }
    })
    setIsLoading(false)
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string) => {

    await axios.post('/api/completed', {id}).then((res) => {
      if(res.status === 201){
        toast.success('updated a order');
        fetchOrders()
      }
    })
  };

  // console.log(session)


  console.log(orders)

  return (
    <div className="flex lg:flex-row flex-col h-screen bg-primary-light">
       <AnimatePresence>
          {isOpen && (
                    <motion.div
                        initial={{ x: '-100vw' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100vw' }}
                        transition={{ type: 'spring', stiffness: 50 }}
                        className="fixed top-0 left-0 w-64 h-screen rounded-r-2xl bg-gradient-to-bl from-primary-dark via-primary-dark to-primary-dark flex flex-col justify-between items-start shadow-lg z-50"
                    >
                        <nav>
    
      <h2 className="text-2xl text-center text-primary-light font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-14">
          <li>
            <button
              className={`text-2xl  font-medium w-full text-left ${activeTab === 'orders' ? 'text-primary-pink' : 'text-white'}`}
              onClick={() => {setActiveTab('orders'); setIsOpen(!isOpen)}}
            >
              Orders
            </button>
          </li>
          <li>
            <button
              className={`text-2xl font-medium w-full text-left ${activeTab === 'analytics' ? 'text-primary-pink' : 'text-white'}`}
              onClick={() => {setActiveTab('analytics'); setIsOpen(!isOpen)}}
            >
              Analytics
            </button>
          </li>
          <li>
            <button
              className={`text-2xl font-medium w-full text-left ${activeTab === 'products' ? 'text-primary-pink' : 'text-white'}`}
              onClick={() => {setActiveTab('products'); setIsOpen(!isOpen)}}
            >
              Products
            </button>
          </li>
        </ul>
      </nav>
                        
                        <div className=' lg:w-full lg:mt-0 mt-8 w-[97%] h-[5rem] gap-4 flex flex-col justify-center p-1 items-center'>
                          <Link href='/' className='text-white self-start'>Home</Link>
                            <p className='text-sm self-end text-white  text-center lg:text-right'>Copyright © 2024 Sweet Bliss Bakery. All rights reserved.</p>
                        </div>
                    </motion.div>
                )}
      </AnimatePresence>
    <aside className="w-1/4 lg:flex hidden bg-primary-dark  flex-col justify-between text-white p-4">
      
    <nav>
    <div className=" flex justify-center mb-8 items-center gap-3 font-bold"><h1 className={` text-4xl text-primary-light mt-2`}>Papas Llenos</h1></div>
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              className={`text-xl font-medium w-full text-left ${activeTab === 'orders' ? 'text-primary-pink' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
          </li>
          <li>
            <button
              className={`text-xl font-medium w-full text-left ${activeTab === 'analytics' ? 'text-primary-pink' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </button>
          </li>
          <li>
            <button
              className={`text-xl font-medium w-full text-left ${activeTab === 'products' ? 'text-primary-pink' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
          </li>
        </ul>
      </nav>
      <div className='w-full flex justify-between items-center'>
         <Link href='/'
         className='text-sm'
            >
              Home Page
            </Link>
            
        </div>
    </aside>
    <div className='self-end md:hidden border-b-2 border-primary-dark  flex justify-between items-center w-full'>
        <h1 className='text-2xl font-medium text-primary-dark tracking-wide p-2'>Dashboard</h1>
        <MdDashboard onClick={() => setIsOpen(!isOpen)} className='text-primary-dark' size={50} />
      </div>

    <main className="flex-1 lg:p-8 p-2 overflow-scroll">
    
      {activeTab === 'orders' && <Receipt isLoading={isLoading} orders={orders} onCompleteOrder={updateStatus} />}
      {activeTab === 'analytics' && <Analytics orders={orders} />}
      {activeTab === 'products' && <Product />}
    </main>
  </div>
  );
};

export default Page;
