import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('hero');

  return (
    <section className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("https://www.allrecipes.com/thmb/qcZxB4VshYreKE0aOnocvXUlfUs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/24332-ultimate-twice-baked-potato-DDMFS-4x3-1643-94592bde74914b7498d59c19c2d5e5ab.jpg")' }}>
      <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center text-white">
        <h1 className="lg:text-6xl text-4xl text-center text-primary-light font-bold">{t('title')}</h1>
        <p className="mt-4 lg:text-3xl text-xl text-center text-white">{t('description')}</p>
        <a href="#menu" className="mt-6 bg-primary-orange px-4 py-2 rounded hover:bg-primary-light">
          {t('orderButton')}
        </a>
      </div>
    </section>
  );
};

export default Hero;
