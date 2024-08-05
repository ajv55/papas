import Header from '@/app/components/mainPage/header';
import React from 'react';
import style from '@/app/[locale]/style.module.css';
import Footer from '@/app/components/mainPage/footer';

const Page = () => (
  <div className={`${style.background} w-full mx-auto`}>
    <Header />
    <div className="max-w-6xl lg:p-0 p-2 mx-auto">
        <h1 className="lg:text-6xl text-3xl font-bold mt-6 mb-6 text-primary-dark">Privacy Policy</h1>
        <p className="text-gray-600 mb-6">Last Updated: July 17, 2024</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary-dark">Introduction</h2>
          <p className="text-gray-700">Papas Llenos (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary-dark">Information We Collect</h2>
          <p className="text-gray-700">We may collect information about you in a variety of ways. The information we may collect on the website includes:</p>
          <ul className="list-disc list-inside text-gray-700 mt-4">
            <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the website or place an order.</li>
            <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the website, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the website.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary-dark">Use of Your Information</h2>
          <p className="text-gray-700">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use the information collected to:</p>
          <ul className="list-disc list-inside text-gray-700 mt-4">
            <li>Process your transactions.</li>
            <li>Send you administrative information, such as order confirmations and updates.</li>
            <li>Improve our website and customer service.</li>
            <li>Respond to your inquiries and offer customer support.</li>
            <li>Send you marketing communications.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary-dark">Disclosure of Your Information</h2>
          <p className="text-gray-700">We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
          <ul className="list-disc list-inside text-gray-700 mt-4">
            <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
            <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, such as payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary-dark">Security of Your Information</h2>
          <p className="text-gray-700">We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary-dark">Policy for Children</h2>
          <p className="text-gray-700">We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary-dark">Changes to This Privacy Policy</h2>
          <p className="text-gray-700">We may update this Privacy Policy from time to time. We will notify you of any changes by updating the &quot;Last Updated&quot; date of this Privacy Policy. You are encouraged to review this Privacy Policy periodically to stay informed of updates.</p>
        </section>

        <section className='mb-10'>
          <h2 className="text-2xl font-semibold mb-4 text-primary-dark">Contact Us</h2>
          <p className="text-gray-700">If you have questions or comments about this Privacy Policy, please contact us at <a href="mailto:contact@papasllenos.com" className="text-primary-light hover:underline">contact@papasllenos.com</a>.</p>
        </section>
      </div>
    <Footer />
  </div>
);

export default Page;