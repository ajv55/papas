import { useTranslations } from 'next-intl';

const OrderOnline = () => {
  const t = useTranslations('orderOnline');

  return (
    <section id="order" className="py-16 bg-primary-orange text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">{t('title')}</h2>
        <p className="text-lg mb-8">{t('description')}</p>
        <a href="#menu" className="bg-primary-light px-6 py-3 rounded hover:bg-accent-dark transition duration-300">
          {t('button')}
        </a>
      </div>
    </section>
  );
};

export default OrderOnline;
