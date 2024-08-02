import { useTranslations } from 'next-intl';
import Link from 'next/link';

const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className="bg-primary-dark text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-4">{t('followUs')}</p>
        <div className="flex justify-center space-x-6">
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-light">
            {t('facebook')}
          </Link >
          <Link  href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-light">
            {t('instagram')}
          </Link >
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-light">
            {t('twitter')}
          </Link >
        </div>
        <p className="mt-4">{t('copyright')}</p>
        <p className="mt-2">
          <Link  href="#terms" className="underline hover:text-accent-dark">{t('termsOfService')}</Link > | 
          <Link  href="#privacy" className="underline hover:text-accent-dark">{t('privacyPolicy')}</Link >
        </p>
      </div>
    </footer>
  );
};

export default Footer;
