'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { getCookie, setCookie } from 'cookies-next'
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addItem } from '@/app/slices/cartSlice';
import toast from 'react-hot-toast';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const t = useTranslations('menu');
  const dispatch = useDispatch();

  const lang = getCookie('NEXT_LOCALE');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('/api/getPotatoes/');
        setMenuItems(response.data);
      } catch (error) {
        setError('Failed to fetch menu items.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [lang]);

  console.log(lang)

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;

  const handleAddToCart = (item: any) => {
    dispatch(addItem(item));
  };


  return (
    <section id="menu" className="py-16 bg-gray-100">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold mb-8 text-primary-dark">{t('title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {menuItems.map((item: any) => (
          <motion.div whileHover={{scale: 1.06, rotate: 2}} whileTap={{scale: 1.15, }} key={item.id} className="bg-white hover:ring-2 hover:ring-primary-dark cursor-pointer hover:shadow-primary-light  rounded-lg h-[28rem] shadow-lg overflow-hidden">
            <div className="relative flex flex-col justify-center items-center pb-2/3">
              <Image
                src={item?.image}
                width={200}
                height={200}
                alt={lang === 'en' ? item.name_en : item.name_es}
                className=" h-[15rem] w-full object-cover "
              />
            </div>
            <div className="p-4">
              <h3 className="text-2xl font-semibold text-primary-dark">{lang === 'en' ? item.name_en : item.name_es}</h3>
              <p className="mt-2 text-accent-dark">{lang === 'en' ? item.description_en : item.description_es}</p>
              <p className="mt-4 font-bold text-xl text-primary-orange">${item.price}</p>
              <button 
                  onClick={() => {handleAddToCart(item); toast.success('Item added to your cart 🥔')}} 
                  className="mt-2 bg-primary-dark text-white px-4 py-2 rounded hover:bg-primary-light"
                >
                  {t('addToCart')}
                </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Menu;
