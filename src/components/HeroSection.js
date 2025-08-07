import React from 'react';

const HeroSection = ({ title, subtitle }) => {
  return (
    <section
      className="min-h-[70vh] flex flex-col justify-center items-center text-center p-12 md:min-h-[60vh] md:p-8 md:px-6 bg-[url('/assets/rescuesnwdn.jpg')] bg-cover bg-center bg-fixed bg-gradient-to-b from-black/70 to-black/70"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-6xl mb-6 text-white font-bold tracking-tight drop-shadow-lg md:text-5xl">{title}</h1>
        {subtitle && (
          <p className="text-2xl text-gray-200 font-medium tracking-wide drop-shadow-md md:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default HeroSection;