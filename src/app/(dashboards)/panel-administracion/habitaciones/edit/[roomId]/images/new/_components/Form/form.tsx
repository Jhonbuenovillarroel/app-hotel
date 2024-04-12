"use client";

import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";

interface Props {
  roomId: string;
}

const FormAddImages = ({ roomId }: Props) => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  return (
    <div className="w-full h-full flex flex-col gap-12 items-center justify-center">
      <form
        onSubmit={async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setFormLoading(true);

          const formData = new FormData();

          formData.append("roomId", roomId);
          imageFiles.map((image, i) => {
            formData.append(`image${i + 1}`, image);
          });

          try {
            const { data } = await axios.post(
              "/api/rooms/api/upload-images",
              formData
            );

            if (data.error) {
              toast.error(data.error);
            } else if (data.ok) {
              toast.success(data.message);
              setImageFiles([]);
              router.refresh();
            }
          } catch (error) {
            toast.error("Algo salió mal, vuelve a intentarlo");
          }

          setTimeout(() => {
            setFormLoading(false);
          }, 2100);
        }}
        className="space-y-5 w-full max-w-[500px] pt-12"
      >
        <h2 className="text-xl font-medium">Agregar Imagenes</h2>

        <Dropzone
          accept={{
            "image/png": [],
            "image/jpg": [],
            "image/jpeg": [],
            "image/webp": [],
          }}
          onDropRejected={() => {
            toast.error("Sólo puedes subir imagenes");
          }}
          onDrop={(acceptedFiles) => {
            setImageFiles(acceptedFiles);
          }}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <section className="w-full h-40">
              <div
                {...getRootProps()}
                className={`w-full h-full border border-dashed flex items-center justify-center ${
                  isDragActive ? "bg-zinc-800" : ""
                } cursor-pointer hover:border-gold-hr hover:text-gold-hr transition-all duration-300`}
              >
                <input {...getInputProps()} />
                <p>
                  {isDragActive
                    ? "Suelta las imagenes aquí"
                    : "Haz click o arrastra imagenes aquí"}
                </p>
              </div>
            </section>
          )}
        </Dropzone>

        <div>
          {formLoading ? (
            <ButtonLoading />
          ) : (
            <Button>Agregar Imagen(es)</Button>
          )}
        </div>
      </form>

      {!!imageFiles?.length ? (
        <>
          <div className="w-full max-w-[900px] flex flex-col items-center justify-center gap-8 px-6 pb-12">
            <h3 className="text-lg font-medium">Vista previa Imagenes</h3>
            <div className="flex flex-wrap items-center justify-center gap-6 w-full">
              {imageFiles.map((image) => (
                <Image
                  src={URL.createObjectURL(image)}
                  width={200}
                  height={200}
                  alt={image.name}
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
