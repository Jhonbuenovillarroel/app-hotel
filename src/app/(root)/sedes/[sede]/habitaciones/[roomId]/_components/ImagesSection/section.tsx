import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Room } from "@/types/Room/room";
import React from "react";

interface Props {
  room: Room;
}

const ImagesSection = ({ room }: Props) => {
  return (
    <>
      <section>
        <div className={`w-[500px] mx-auto pb-20 flex flex-col gap-4`}>
          <p className="text-center text-2xl font-medium">Imagenes</p>
          <Carousel className="rounded-md overflow-hidden">
            <CarouselContent>
              {room.images.map((image) => (
                <CarouselItem key={image.id}>
                  <Image
                    className="w-full h-full"
                    src={image.url}
                    width={1000}
                    height={1000}
                    alt="Foto de la habitación"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="" />
            <CarouselNext className="" />
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default ImagesSection;
