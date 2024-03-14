import { workSans } from "@/fonts/fonts";
import Link from "next/link";

interface Props {
  title: string;
  subtitle: string;
  bgImage: string;
  mounted: boolean;
}

const Slide = ({ title, subtitle, bgImage, mounted }: Props) => {
  return (
    <div
      className={`w-full h-full ${bgImage} bg-[length:1400px_1000px] bg-center before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[rgba(0,0,0,0.75)] before:z-0 flex justify-center`}
    >
      <div
        className={`relative flex flex-col gap-8 items-center justify-center text-white`}
      >
        <h2
          className={`${
            mounted ? "opacity-100 top-0" : "opacity-0 top-8"
          } relative transition-all duration-500 text-7xl max-w-[400px] text-center`}
        >
          {title}
        </h2>
        <p
          className={`${
            mounted ? "opacity-100 top-0" : "opacity-0 top-8"
          } relative text-lg transition-all duration-500 ${workSans.className}`}
        >
          {subtitle}
        </p>
        <div
          className={`flex gap-4 justify-center mt-4 ${
            mounted ? "opacity-100 top-0" : "opacity-0 top-8"
          } relative transition-all duration-500 ${workSans.className}`}
        >
          <Link
            href={``}
            className={`h-10 w-44 text-sm font-medium tracking-wide flex items-center justify-center rounded-md bg-[#bd9b57] hover:bg-[#cbab69] transition-all duration-300 text-white px-6`}
          >
            Reservar
          </Link>
          <Link
            href={``}
            className={`h-10 w-44 text-sm font-medium tracking-wide flex items-center justify-center rounded-md bg-white transition-all duration-300 text-black px-6`}
          >
            Ver Habitaciones{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
