'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type LanguageModalProps = {
    isOpen?: () => void,
    onClose?: () => void
}

const LanguageModal = ({ isOpen, onClose }: LanguageModalProps) => {

    const router = useRouter();
  
    const handleLocaleChange = (locale: string) => {
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31316000; SameSite=Lax`;
      router.refresh();
    }
  return (
      
        <div
          className=" absolute top-10 right-3 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{duration: 1, stiffness: 80, type: 'spring'}}
            className=" bg-gradient-to-b from-accent-dark via-primary-orange to-primary-dark rounded-lg shadow-lg overflow-hidden w-44 max-w-lg"
          >
            <div className='w-full p-2 flex text-primary-dark justify-center items-center text-center bg-gradient-to-tr from-primary-orange via-primary-light to-primary-orange'>
                <h1>Language Switch</h1>
            </div>
            <div className="p-2">
                <div className='flex flex-col text-lg justify-center gap-3 items-center'>
                   <button className='hover:underline hover:underline-offset-2 text-white' onClick={() => handleLocaleChange('en')}>English</button>
                   <button className='hover:underline hover:underline-offset-2 text-white' onClick={() => handleLocaleChange('es')}>Spanish</button>
                </div>
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-primary-light hover:bg-primary-orange text-white font-bold py-1 px-4 rounded"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>

  );
};


export default LanguageModal;