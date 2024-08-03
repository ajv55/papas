'use client';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import CartModal from './cartModal';
import { useRouter, usePathname } from 'next/navigation';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useDispatch } from 'react-redux';
import { setIsCartOpen } from '@/app/slices/cartSlice';
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
  const t = useTranslations('header');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);

  const router = useRouter();
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity) || 0;
  const dispatch = useDispatch();

  const pathname = usePathname();

  const openModal = () => {
    dispatch(setIsCartOpen(true));
  };

  const handleLocaleChange = (locale: string) => {
    // Remove the current locale prefix if it exists
    const currentPath = pathname.replace(/^\/[a-z]{2}/, '');
    // Construct the new path with the new locale
    const newPath = `/${locale}${currentPath}`;
    // Navigate to the new path
    router.push(newPath);
  };
  
    // const handleLocaleChange = (locale: string) => {
    //   document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31316000; SameSite=Lax`;
    //   router.refresh();
    // }

  return (
    <header className="bg-primary-orange p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white">{t('title')}</div>
        <div className='flex items-center gap-3'>
        <nav className="space-x-6">
          <a href="#menu" className="text-white hover:text-green-200">{t('menu')}</a>
          <a href="#about" className="text-white hover:text-green-200">{t('about')}</a>
          <a href="#order" className="text-white hover:text-green-200">{t('order')}</a>
          <a href="#contact" className="text-white hover:text-green-200">{t('contact')}</a>
        </nav>
        
        </div>
        <div className="relative cursor-pointer" onClick={openModal}>
        <FiShoppingCart className='text-primary-dark' size={30} />
        {totalQuantity! > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {totalQuantity}
          </span>
        )}
      </div>
      {isCartOpen && <CartModal />}
        <div className='flex text-sm justify-center gap-3 items-center'>
            <button className='hover:underline hover:underline-offset-2 text-white' onClick={() => handleLocaleChange('en')}>EN</button>
            <span className='text-white'>|</span>
            <button className='hover:underline hover:underline-offset-2 text-white' onClick={() => handleLocaleChange('es')}>ES</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
