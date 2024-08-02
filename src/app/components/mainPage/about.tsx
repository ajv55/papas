import { useTranslations } from 'next-intl';

const AboutUs = () => {
  const t = useTranslations('aboutUs');

  return (
    <section id="about" className="py-16 bg-primary-light">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-primary-dark">{t('title')}</h2>
        <p className="text-lg leading-relaxed text-accent-dark">
          {t('description')}
        </p>
        <div className="mt-8 flex justify-center">
          {/* <img src="/images/team.jpg" alt={t('imageAlt')} className="w-1/2 rounded-lg shadow-lg" /> */}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
