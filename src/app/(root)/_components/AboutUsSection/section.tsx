import Image from "next/image";
import React from "react";

const AboutUsSection = () => {
  return (
    <section className="pb-48 xl:flex lg:gap-32">
      <div className="relative xl:top-20 px-6 lg:px-20 xl:max-w-[600px] flex flex-col xl:items-center xl:justify-center">
        <p className="uppercase tracking-widest text-xs text-center xl:self-start xl:text-start">
          Sobre Hospedaje El Rinconcito
        </p>
        <h2 className="text-3xl mt-4 font-bold text-center xl:self-start xl:text-start xl:text-4xl">
          Historia y Hospitalidad
        </h2>
        <p className="mt-4 text-sm leading-7">
          En Hospedaje &quot;El Rinconcito&quot;, nuestra historia es la de la
          hospitalidad auténtica. Nos enorgullecemos de ofrecer un refugio
          tranquilo y cómodo en el corazón de Jauja. Cada detalle, desde
          nuestras habitaciones hasta nuestro servicio, está diseñado para hacer
          que tu estancia sea especial. Descubre quiénes somos y lo que hacemos
          en Hospedaje &quot;El Rinconcito&quot;. Esperamos ser tu elección en
          tu próxima visita a Jauja.
        </p>
      </div>
      <div className="mt-24 flex flex-col items-center justify-center">
        <div className="h-auto w-auto relative flex">
          <Image
            className="relative left-[-44px] sm:left-[-80px] md:left-[-80px] w-48 sm:w-80 md:w-96"
            src="/images/hero-images/laguna-de-paca.jpg"
            width={800}
            height={800}
            alt="laguna de paca jauja"
          />
          <Image
            className="absolute left-24 top-4 sm:left-36 md:left-48 z-10 w-36 sm:w-64 md:w-80"
            src="/images/hero-images/canon-de-shucto.jpg"
            width={800}
            height={800}
            alt="laguna de paca jauja"
          />
          <Image
            className="absolute left-12 top-28 sm:left-24 md:left-28 sm:top-40 md:top-48 w-32 sm:w-56 md:w-72"
            src="/images/hero-images/plaza-jauja-noche.jpg"
            width={800}
            height={800}
            alt="laguna de paca jauja"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
