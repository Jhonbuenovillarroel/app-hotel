import { Room } from "@/types/Room/room";
import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Swal, { SweetAlertCustomClass } from "sweetalert2";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSweetAlertPopup = ({
  title,
  subtitle,
  confirmButtonText,
  confirmButtonColor,
  showDenyButton,
  denyButtonColor,
  denyButtonText,
  customClass,
  preConfirm,
  icon,
  showLoaderOnConfirm,
}: {
  title?: string;
  subtitle?: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  showDenyButton?: boolean;
  denyButtonColor?: string;
  denyButtonText?: string;
  customClass?: SweetAlertCustomClass;
  preConfirm?: () => Promise<void>;
  icon?: "error" | "info" | "question" | "success" | "warning";
  showLoaderOnConfirm?: boolean;
}) => {
  return Swal.fire({
    icon: icon ? icon : undefined,
    html: `<div class="flex flex-col items-center w-full justify-center gap-2">
            <h2 class="text-lg font-semibold text-zinc-950 dark:text-zinc-100">
              ${title ? title : ""}
            </h2>
            <p class="text-sm text-zinc-900 dark:text-zinc-200">
              ${subtitle ? subtitle : ""}
            </p>
          </div>`,
    customClass: {
      popup: "bg-zinc-100 dark:bg-zinc-950 text-sm",
      validationMessage:
        "bg-red-500 text-zinc-200 w-fit mx-auto rounded-md text-xs py-2.5",
      ...customClass,
    },
    confirmButtonColor: confirmButtonColor ? confirmButtonColor : "#DD892F",
    confirmButtonText: confirmButtonText ? confirmButtonText : "Si, continuar",
    showDenyButton: showDenyButton ? showDenyButton : false,
    denyButtonColor: denyButtonColor ? denyButtonColor : "rgb(40, 40, 40)",
    denyButtonText: denyButtonText ? denyButtonText : "No, cancelar",
    preConfirm: async () => {
      if (preConfirm) {
        await preConfirm();
      }
    },
    showLoaderOnConfirm: showLoaderOnConfirm ? showLoaderOnConfirm : false,
  });
};

export function calculateBookingTotalAmount(
  rooms: {
    room: Room;
    checkIn: Date;
    checkOut: Date;
  }[]
) {
  const total = rooms.reduce(
    (suma, room) =>
      suma +
      room.room.price *
        (parseInt(format(room.checkOut, "dd", { locale: es })) -
          parseInt(format(room.checkIn, "dd", { locale: es }))),
    0
  );

  return total;
}
