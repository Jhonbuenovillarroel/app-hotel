import { Room } from "@/types/Room/room";

export const formatDate = (date: Date) => {
  const formatedDate = new Date(date.toLocaleDateString());
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
  return available;
};
