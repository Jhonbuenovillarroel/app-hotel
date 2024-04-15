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
  hotelCenterId: string;
}

const FormAddImages = ({ hotelCenterId }: Props) => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  return (
    <div className="w-full h-full flex flex-col gap-8 items-center justify-center">
      <form
        onSubmit={async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          setFormLoading(true);
          const formData = new FormData();
          formData.append("hotelCenterId", `${hotelCenterId}`);
          imageFiles.forEach((image, i) => {
            formData.append(`image${i + 1}`, image);
          });

          try {
            const { data } = await axios.post(
              "/api/hotel-centers/api/upload-images",
              formData
            );

            if (data.ok) {
              toast.success(data.message);
              setImageFiles([]);
              router.refresh();
            } else if (data.error) {
              toast.error(data.error);
            }
          } catch (error) {
            toast.error("Algo salió mal, vuelve a intentarlo");
          }

          setTimeout(() => {
            setFormLoading(false);
          }, 2100);
        }}
        className="w-full max-w-[400px] space-y-6 pt-16 pb-4"
      >
        <h2 className="text-xl font-medium">Agrega Imagenes</h2>

        <div>
          <Dropzone
            accept={{
              "image/jpeg": [],
              "image/png": [],
              "image/jpg": [],
              "image/webp": [],
            }}
            onDropRejected={() => {
              toast.error("Sólo puedes subir imágenes");
            }}
            onDrop={(acceptedFiles) => {
              setImageFiles(acceptedFiles);
              console.log(acceptedFiles);
            }}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <section className="w-full h-40">
                <div
                  {...getRootProps()}
                  className={`border border-dashed px-6 border-zinc-400 dark:border-zinc-300 w-full h-full flex items-center justify-center cursor-pointer ${
                    isDragActive ? " bg-zinc-300 dark:bg-zinc-800  " : ""
                  } hover:border-gold-hr-dark dark:hover:border-gold-hr hover:text-gold-hr-dark dark:hover:text-gold-hr transition-all duration-300`}
                >
                  <input {...getInputProps()} />
                  <p className="text-sm text-center">
                    {isDragActive
                      ? "Suelta los archivos en esta zona"
                      : "Haz click o arrastra los archivos aquí"}
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        <div>
          {formLoading ? (
            <ButtonLoading />
          ) : (
            <Button>Agregar Imagen(es)</Button>
          )}
        </div>
      </form>

      {!!imageFiles.length && (
        <>
          <div className="flex flex-col items-center gap-8">
            <h3 className="text-base font-medium text-center">
              Vista Previa de Imagenes
            </h3>

            <div className="flex gap-6 flex-wrap max-w-[800px] justify-center pb-16">
              {imageFiles.map((image) => (
                <Image
                  key={image.name}
                  className="h-fit"
                  src={URL.createObjectURL(image)}
                  width={350}
                  height={200}
                  alt={image.name}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FormAddImages;
