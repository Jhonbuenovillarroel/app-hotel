"use client";

import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CldUploadWidget } from "next-cloudinary";
import { Images } from "lucide-react";
import { Room } from "@/types/Room/room";

interface Props {
  room: Room;
}

const FormAddImages = ({ room }: Props) => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-6 items-center justify-center">
      <h2 className="text-xl font-medium">Agregar Imagenes</h2>

      <CldUploadWidget
        signatureEndpoint="/api/cloudinary/api/sign-params"
        onQueuesEnd={async (result: any, { widget }) => {
          const images = result.info.files.map((file: any) => ({
            url: file.uploadInfo.secure_url,
            public_id: file.uploadInfo.public_id,
          }));

          try {
            const { data } = await axios.post(
              `/api/rooms/api/add-uploaded-images`,
              { roomId: room.id, images: images }
            );
            if (data.ok) {
              toast.success("Imagenes subidas correctamente");
              widget.close();
              router.refresh();
            }
          } catch (error) {
            toast.error("Algo salió mal, vuelve a intentarlo");
          }

          if (result.info) {
            setImageUrls([
              ...imageUrls,
              ...images.map((image: any) => image.url),
            ]);
          }
        }}
        onError={(result, { widget }) => {
          setTimeout(() => {
            toast.error("Ocurió un error durante el proceso");
            widget.close();
          }, 300);
        }}
        options={{
          folder: `${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}/sedes/${room.hotelcenter.name}/habitaciones/${room.roomNumber}`,
          maxFiles: 5,
          multiple: true,
        }}
      >
        {({ open, cloudinary }) => {
          return (
            <Button
              type="button"
              variant={"bookingFormButton"}
              onClick={() => {
                open();
              }}
              className="flex items-center gap-2"
            >
              <Images className="w-4 h-4" />
              Subir una imagen
            </Button>
          );
        }}
      </CldUploadWidget>

      {!!imageUrls?.length ? (
        <>
          <div className="w-full max-w-[900px] flex flex-col items-center justify-center gap-8 px-6 pb-12">
            <h3 className="text-lg font-medium">Vista previa Imagenes</h3>
            <div className="flex flex-wrap items-center justify-center gap-6 w-full">
              {imageUrls.map((url, i) => (
                <Image
                  className="w-auto h-auto"
                  key={i}
                  src={url}
                  width={200}
                  height={200}
                  alt={`Imagen subida ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FormAddImages;
