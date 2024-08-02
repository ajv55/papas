import { useTranslations } from 'next-intl';

const Contact = () => {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="py-16 bg-gray-200">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold">{t('location')}</h3>
            <p className="mt-2">{t('address')}</p>
            <h3 className="text-2xl font-semibold mt-6">{t('hours')}</h3>
            <p className="mt-2">{t('hoursDetails.weekdays')}</p>
            <p className="mt-2">{t('hoursDetails.sunday')}</p>
            <h3 className="text-2xl font-semibold mt-6">{t('contact')}</h3>
            <p className="mt-2">{t('phone')}</p>
            <p className="mt-2">{t('email')}</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">{t('sendMessage')}</h3>
            <form className="mt-6 space-y-4">
              <input type="text" placeholder={t('yourName')} className="w-full p-3 rounded border" />
              <input type="email" placeholder={t('yourEmail')} className="w-full p-3 rounded border" />
              <textarea placeholder={t('yourMessage')} className="w-full p-3 rounded border"></textarea>
              <button type="submit" className="bg-primary-orange text-white px-4 py-2 rounded hover:bg-primary-light">
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
