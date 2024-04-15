"use client";

import { Button } from "@/components/ui/button";
import React, { FormEvent, useState } from "react";
import Dropzone from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { User } from "@/types/User/user";
import { Camera, ImageIcon, Trash2 } from "lucide-react";
import styles from "./form.module.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ButtonLoading from "@/components/Loading/ButtonLoading/button-loading";
import axios from "axios";
import router from "next/router";

interface Props {
  user: User;
}

const FormEditImage = ({ user }: Props) => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <div className="flex flex-col items-center gap-4">
          <DialogTrigger>
            <div className={`relative w-28 h-28 ${styles["image-container"]}`}>
              <div
                className={`absolute w-full h-full flex items-center justify-center flex-col gap-1 bg-zinc-200 dark:bg-zinc-800 rounded-full ${styles.shadow}`}
              >
                <span className="text-xs">Cambiar Foto</span>
                <Camera className="w-4 h-4" />
              </div>
              {user.image?.url ? (
                <Image
                  priority
                  src={user.image.url}
                  className="w-full h-full rounded-full"
                  width={200}
                  height={200}
                  alt={`Foto de perfil de ${user.username}`}
                />
              ) : (
                <>
                  <div className="border rounded-full border-zinc-300 dark:border-zinc-800 w-full h-full flex items-center justify-center">
                    <p className="text-3xl">{user.username[0]}</p>
                  </div>
                </>
              )}
            </div>
          </DialogTrigger>
          <DialogTrigger className="text-black dark:text-white border flex items-center gap-2 h-12 px-5 rounded-md text-sm border-zinc-300 dark:border-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-all duration-200">
            <ImageIcon className="w-4 h-4" strokeWidth={1.5} />
            <span>Cambiar Imagen</span>
          </DialogTrigger>
        </div>
        <DialogContent>
          <form
            onSubmit={async (e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              setFormLoading(true);

              const formData = new FormData();
              formData.append("userId", user.id);
              if (imageFile) {
                formData.append("image", imageFile);
              }

              try {
                const { data } = await axios.post(
                  "/api/users/api/upload-images",
                  formData
                );

                if (data.ok) {
                  toast.success(data.message);
                  setImageFile(undefined);
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
            className="space-y-6 w-full flex flex-col items-center justify-center"
          >
            <DialogTitle className="font-medium">Cambia imagen</DialogTitle>

            {imageFile ? (
              <div className="relative">
                <div
                  className="absolute -top-1 -right-1 rounded-full w-8 h-8 bg-red-500 cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center"
                  onClick={() => {
                    setImageFile(undefined);
                  }}
                >
                  <Trash2 strokeWidth={1.2} className="w-4 h-4" />
                </div>
                <Image
                  className="rounded-full h-32 w-fit"
                  src={URL.createObjectURL(imageFile)}
                  width={200}
                  height={200}
                  alt={imageFile.name}
                />
              </div>
            ) : (
              <>
                <Dropzone
                  accept={{
                    "image/jpg": [],
                    "image/jpeg": [],
                    "image/png": [],
                    "image/webp": [],
                  }}
                  maxFiles={1}
                  onDropRejected={(rejectedFiles) => {
                    if (rejectedFiles.length > 1) {
                      toast.error("No puedes subir más de un archivo");
                      return;
                    }
                    toast.error("Sólo puedes subir imagenes");
                  }}
                  onDrop={(acceptedFile) => {
                    setImageFile(acceptedFile[0]);
                  }}
                >
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <section className="w-full h-32">
                      <div
                        {...getRootProps()}
                        className={`w-full text-sm px-6 cursor-pointer flex items-center justify-center h-full border border-dashed border-zinc-400 dark:border-zinc-300 hover:border-gold-hr-dark dark:hover:border-gold-hr hover:text-gold-hr-dark dark:hover:text-gold-hr transition-all duration-300 ${
                          isDragActive ? "bg-zinc-800" : ""
                        }`}
                      >
                        <input {...getInputProps()} />
                        <p className="text-center">
                          {isDragActive
                            ? "Suelta la imagen aquí"
                            : "Haz click o arrastra la imagen aquí"}
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </>
            )}

            <div>
              {formLoading ? (
                <ButtonLoading />
              ) : (
                <Button>Guardar Imagen</Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormEditImage;
