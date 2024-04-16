import { Room } from "@/types/Room/room";
import { format } from "date-fns";

export const formatDate = (date: Date) => {
  const formatedDate = new Date(format(new Date(date), "MM/dd/yyyy"));
  return formatedDate;
};

export const roomIsAvailable = ({
  room,
  checkIn,
  checkOut,
}: {
  room: Room;
  checkIn: Date;
  checkOut: Date;
}) => {
  let available = true;

  if (room.bookings.length) {
    for (let booking of room.bookings) {
      if (available) {
        if (
          !(formatDate(checkOut) <= formatDate(booking.checkIn)) ||
          !(formatDate(checkIn) >= formatDate(booking.checkOut))
        ) {
          available = false;
        }
      } else {
        return available;
      }
    }
  }
  return available;
};
