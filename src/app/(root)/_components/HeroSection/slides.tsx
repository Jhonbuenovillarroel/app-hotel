import Slide from "./_components/Slide/slide";

const slides = {
  slide1: {
    index: 1,
    width: "w-full",
    childWidth: "w-full",
    zIndex: "z-30",
    bgColor: "bg-red-500",
    buttonBgColor: "bg-white",
    isMounted: true,
    htmlContent(mounted: boolean) {
      return (
        <>
          <Slide
            mounted={mounted}
            title="Encanto Central"
            subtitle="Bienvenido a Jauja"
            bgImage={`bg-[url('/images/hero-images/canon-de-shucto.jpg')]`}
          />
        </>
      );
    },
  },
  slide2: {
    index: 2,
    width: "w-0",
    childWidth: "w-[99.9%]",
    zIndex: "z-20",
    bgColor: "bg-cyan-700",
    buttonBgColor: "bg-zinc-400",
    isMounted: false,
    htmlContent(mounted: boolean) {
      return (
        <>
          <Slide
            mounted={mounted}
            title="Central y Comfortable"
            subtitle="Bienvenido a Jauja"
            bgImage={`bg-[url('/images/hero-images/laguna-de-paca.jpg')]`}
          />
        </>
      );
    },
  },
  slide3: {
    index: 3,
    width: "w-0",
    childWidth: "w-[99.9%]",
    zIndex: "z-10",
    bgColor: "bg-zinc-800",
    buttonBgColor: "bg-zinc-400",
    isMounted: false,
    htmlContent(mounted: boolean) {
      return (
        <>
          <Slide
            mounted={mounted}
            title="Cómodo y Céntrico"
            subtitle="Bienvenido a Jauja"
            bgImage={`bg-[url('/images/hero-images/plaza-jauja-noche.jpg')]`}
          />
        </>
      );
    },
  },
};

export default slides;
