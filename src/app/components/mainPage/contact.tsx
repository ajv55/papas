'use client';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
  const t = useTranslations('contact');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post('/api/sendMessage', {name, email, message}).then((res) => {
      console.log(res);
      toast.success('Message Sent! 📧');
      setName('');
      setEmail('');
      setMessage('');
    })
  }

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary-dark mb-6">{t('title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="text-left space-y-6">
            <h3 className="text-2xl font-semibold text-primary-dark">{t('location')}</h3>
            <p className="text-gray-700">{t('address')}</p>
            <h3 className="text-2xl font-semibold text-primary-dark">{t('hours')}</h3>
            <p className="text-gray-700">{t('hoursDetails.weekdays')}</p>
            <p className="text-gray-700">{t('hoursDetails.sunday')}</p>
            <h3 className="text-2xl font-semibold text-primary-dark">{t('contact')}</h3>
            <div className='flex flex-col justify-start items-start gap-2'>
            <a href="tel:+1234567890" className="hover:text-primary-light hover:underline">{t('phone')}</a>
            <a href="mailto:contact@papasllenos.com" className="hover:text-primary-light hover:underline">{t('email')}</a>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-primary-dark mb-4">{t('sendMessage')}</h3>
            <form onSubmit={sendEmail} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                placeholder={t('yourName')}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-orange"
              />
              <input
                type="email"
                placeholder={t('yourEmail')}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-orange"
              />
              <textarea
                placeholder={t('yourMessage')}
                value={message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-orange"
              ></textarea>
              <button
                type="submit"
                className="bg-primary-orange text-white px-6 py-3 rounded-lg shadow hover:bg-primary-light transition duration-300"
              >
                {t('sendButton')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
