'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import { addItem, removeItem, updateQuantity, setIsCartOpen } from '../../slices/cartSlice';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
import CustomerInfoForm from './customerInfoForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CartModal = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
  const dispatch = useDispatch();

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const lang = getCookie('NEXT_LOCALE');

  const handleAddItem = (item: any) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCustomerInfoChange = (info: any) => {
    setCustomer(info);
  };

  const closeModal = () => {
    dispatch(setIsCartOpen(false));
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('/api/create-checkout-session', {
        items: cartItems,
        customer,
      });
  
      const { id } = response.data;
      const stripe = await stripePromise;
  
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId: id });
  
        if (error) {
          console.error('Error redirecting to checkout:', error);
        }
      } else {
        console.error('Stripe.js failed to load.');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  console.log(lang);

  return (
    <div className={`fixed inset-0 z-50 ${isCartOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isCartOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed right-0 top-0 h-full w-full max-w-lg bg-primary-dark shadow-lg overflow-y-auto"
      >
        <div className="p-6 relative bg-primary-dark text-white">
          <button onClick={closeModal} className="absolute top-2 right-2 text-accent-dark">
            <FaTimes size={20} />
          </button>
          <h2 className="text-2xl font-bold mb-4 border-b border-primary-light pb-2">Your Cart</h2>
          {cartItems?.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cartItems?.map((item: any) => (
                <div key={item.id} className="mb-4 flex justify-between items-center p-4 border-b border-primary-light bg-primary-dark text-white rounded-lg">
                  <div>
                    <Image
                      src={item?.image}
                      width={200}
                      height={200}
                      alt={lang === 'en' ? item.name_en : item.name_es}
                      className="h-[8rem] w-[40%] object-cover mb-4"
                    />
                    <h3 className="text-lg font-semibold">{lang === 'en' ? item.name_en : item.name_es}</h3>
                    <p className="text-gray-300">{lang === 'en' ? item?.description_en : item?.description_es}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="bg-accent-dark text-white px-2 py-1 rounded"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                        className="w-9 mx-2 text-center text-primary-dark border border-primary-light rounded"
                      />
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="bg-primary-orange text-white px-2 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-primary-light font-semibold">${item.price  || 0}</p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <p className="text-lg font-bold">Total Quantity: {totalQuantity || 0}</p>
                <p className="text-lg font-bold">Total Price: ${totalPrice?.toFixed(2) || 0}</p>
              </div>
              <CustomerInfoForm onCustomerInfoChange={handleCustomerInfoChange} />
              <div className="mt-6 flex justify-between">
                <button
                  onClick={closeModal}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CartModal;
