import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl'; 

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearnMoreModal: FC<LearnMoreModalProps> = ({ isOpen, onClose }) => {
  const t  = useTranslations();

  if (!isOpen) return null;

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div className="bg-primary-dark text-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 relative">
      <button className="absolute top-4 right-4 text-primary-light hover:text-primary-orange transition duration-300" onClick={onClose}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h3 className="text-3xl font-bold mb-4">{t('modal.title')}</h3>
      <p className="mb-4 text-lg">{t('modal.description')}</p>
      <h4 className="text-xl font-semibold mb-2">{t('modal.benefitsTitle')}</h4>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>{t('modal.benefits.0')}</li>
        <li>{t('modal.benefits.1')}</li>
        <li>{t('modal.benefits.2')}</li>
        <li>{t('modal.benefits.3')}</li>
        <li>{t('modal.benefits.4')}</li>
      </ul>
      <h4 className="text-xl font-semibold mb-2">{t('modal.testimonialTitle')}</h4>
      <blockquote className="italic mb-4 border-l-4 border-primary-light pl-4">
        {t('modal.testimonial')}
      </blockquote>
      <a onClick={onClose} href="#contact" className="bg-primary-light text-primary-dark px-6 py-3 rounded hover:bg-primary-orange transition duration-300">
        {t('modal.contactButton')}
      </a>
    </div>
  </motion.div>
  );
};

export default LearnMoreModal;


