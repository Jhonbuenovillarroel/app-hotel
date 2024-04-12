import { ChevronRight } from "lucide-react";
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
        className={`relative flex flex-col gap-6 items-center justify-center text-white`}
      >
        <h2
          className={`${
            mounted ? "opacity-100 top-0" : "opacity-0 top-8"
          } relative transition-all duration-500 font-medium text-4xl max-w-[400px] text-center`}
        >
          {title}
        </h2>
        <p
          className={`${
            mounted ? "opacity-100 top-0" : "opacity-0 top-8"
          } relative text-base max-w-[600px] text-center transition-all duration-500`}
        >
          {subtitle}
        </p>
        <div
          className={`flex gap-4 justify-center mt-0 ${
            mounted ? "opacity-100 top-0" : "opacity-0 top-8"
          } relative transition-all duration-500`}
        >
          <Link
            href={``}
            className={`h-auto w-auto text-sm font-medium tracking-wide flex gap-1 hover:gap-2 items-center justify-center py-1 border-b border-transparent hover:border-white transition-all duration-300 text-white`}
          >
            <p>Ver detalles</p>
            <ChevronRight
              strokeWidth={1.5}
              className="w-4 h-4 relative top-[1px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
