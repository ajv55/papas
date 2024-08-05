import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className="bg-primary-dark text-white py-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-lg font-semibold mb-2">{t('followUs')}</p>
          <div className="flex justify-center space-x-4">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-light transition-colors duration-300">
              <FaFacebookF size={20} />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-light transition-colors duration-300">
              <FaInstagram size={20} />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-light transition-colors duration-300">
              <FaTwitter size={20} />
            </Link>
          </div>
        </div>
        <div className="text-center text-sm mb-6">
          <p className="mb-2">&copy; {t('copyright')}</p>
          <p className="flex flex-col items-center lg:flex-row lg:justify-center lg:space-x-4">
            <Link href="#terms" className="underline hover:text-primary-light transition-colors duration-300">{t('termsOfService')}</Link>
            <span>|</span>
            <Link href="#privacy" className="underline hover:text-primary-light transition-colors duration-300">{t('privacyPolicy')}</Link>
          </p>
        </div>
        <p className="text-xs text-gray-300 text-center mt-6 lg:text-right">
          Designed and built by Abel J. Villareal
        </p>
      </div>
    </footer>
  );
};

export default Footer;

