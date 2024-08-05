import Header from '@/app/components/mainPage/header';
import React from 'react';
import style from '@/app/[locale]/style.module.css';
import Footer from '@/app/components/mainPage/footer';

const Page = () => (
  <div className={`${style.background} w-full mx-auto`}>
    <Header />
    <div className='container mx-auto'>
      <h1 className="lg:text-6xl text-3xl mt-4 font-bold mb-6 text-center" style={{ color: '#FB8B24' }}>Terms of Service</h1>
      <p className="text-gray-600 mb-8 text-center">Last Updated: July, 17, 2024</p>
      
      <section className="mb-8">
        <h2 className="lg:text-3xl text-xl font-semibold mb-4" style={{ color: '#E36414' }}>Welcome to Papas Llenos!</h2>
        <p className="text-gray-700">These Terms of Service (&quot;Terms&quot;) govern your use of our website and services. By accessing or using our website, you agree to comply with and be bound by these Terms.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#E36414' }}>Acceptance of Terms</h2>
        <p className="text-gray-700">By accessing our website, you agree to comply with these Terms. If you do not agree with any part of these Terms, you must not use our website.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#E36414' }}>Changes to Terms</h2>
        <p className="text-gray-700">We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting. Your continued use of the website after any modifications indicate your acceptance of the new Terms.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#E36414' }}>Use of Our Website</h2>
        <p className="text-gray-700">You agree to use our website only for lawful purposes and in accordance with these Terms. You must not use our website:</p>
        <ul className="list-disc list-inside text-gray-700">
          <li>In any way that violates any applicable local, national, or international law or regulation.</li>
          <li>To transmit, or procure the sending of, any unsolicited or unauthorized advertising or promotional material.</li>
          <li>To impersonate or attempt to impersonate Papas Llenos, a Papas Llenos employee, another user, or any other person or entity.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#E36414' }}>Intellectual Property Rights</h2>
        <p className="text-gray-700">All content on this website, including text, graphics, logos, images, and software, is the property of Papas Llenos and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from any content on our website without our express written permission.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#E36414' }}>User Accounts</h2>
        <p className="text-gray-700">To access certain features of our website, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#E36414' }}>Order Management</h2>
        <p className="text-gray-700">Our website allows you to place orders for products. By placing an order, you agree to pay the specified amount for the products ordered and any applicable taxes and shipping fees.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#E36414' }}>Disclaimer of Warranties</h2>
        <p className="text-gray-700">Our website is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, either express or implied. We do not warrant that our website will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#E36414' }}>Limitation of Liability</h2>
        <p className="text-gray-700">In no event will Papas Llenos, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind arising out of or in connection with your use of our website.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#E36414' }}>Governing Law</h2>
        <p className="text-gray-700">These Terms are governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law principles.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: '#E36414' }}>Contact Us</h2>
        <p className="text-gray-700">If you have any questions about these Terms, please contact us at <a href="mailto:contact@papasllenos.com" className="text-indigo-600 underline">contact@papasllenos.com</a>.</p>
      </section>
    </div>
    <Footer />
  </div>
);

export default Page;