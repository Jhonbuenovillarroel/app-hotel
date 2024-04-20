import { getAllHotelCenters } from "@/db/hotel-center/getAllHotelCenters";
import { HotelCenter } from "@/types/HotelCenter/hotelCenterTypes";
import Link from "next/link";
import FooterLocations from "./_components/Locations/locations";
import SubscriptionForm from "./_components/SubscriptionForm/form";
import ContactNumbers from "./_components/ContactNumbers/contact-numbers";

const getData = async () => {
  const hotelCenters = await getAllHotelCenters();
  return hotelCenters as HotelCenter[];
};

const Footer = async () => {
  const data = await getData();

  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 text-sm pb-6 text-zinc-900 dark:text-white">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16 xl:gap-28 py-12">
        <div className="text-center max-w-[300px] md:max-w-[200px] lg:max-w-[400px]">
          <p className="font-semibold tracking-widest uppercase">
            Nuestra Dirección
          </p>
          <FooterLocations hotelCenters={data} />
        </div>
        <div className="text-center max-w-[300px] md:max-w-[200px] lg:max-w-[400px]">
          <p className="font-semibold tracking-widest uppercase">
            Reservaciones
          </p>
          <ContactNumbers hotelCenters={data} />
        </div>
        <div className="px-8 mb-10 max-w-[300px] md:max-w-[500px]">
          <SubscriptionForm />
        </div>
      </div>
      <hr className="w-full border-t-zinc-300 dark:border-t-zinc-800" />
      <div className="pt-6">
        {/* <div>
          <ul className="flex gap-x-5 gap-y-2 flex-wrap justify-center">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">Nuestras Habitaciones</Link>
            </li>
            <li>
              <Link href="#">Sobre Nosotros</Link>
            </li>
            <li>
              <Link href="#">Contacto</Link>
            </li>
            <li>
              <Link href="#">Terminos y Condiciones</Link>
            </li>
          </ul>
        </div> */}
        <div className=" text-center px-6">
          <p>© Copyright Hospedaje El Riconcito 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
