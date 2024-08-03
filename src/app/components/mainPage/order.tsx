'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import LearnMoreModal from './learnMore';

const OrderOnline = () => {
  const t = useTranslations('whyChooseUs');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);


  return (
    <section id="why-choose-us" className="py-16 bg-primary-orange text-white">
  <div className="container mx-auto text-center">
    <h2 className="text-4xl font-bold mb-8">{t('title')}</h2>
    <p className="text-lg mb-8">{t('description')}</p>
    <button onClick={handleOpenModal} className="bg-primary-light px-6 py-3 rounded hover:bg-accent-dark transition duration-300">
      {t('button')}
    </button>
  </div>
  <LearnMoreModal isOpen={isModalOpen} onClose={handleCloseModal} />
</section>

  );
};

export default OrderOnline;
