import { Room } from "../Room/room";
import { User } from "../User/user";

export type Booking = {
  id: string;
  checkIn: Date;
  checkOut: Date;
  creationMode: "manual" | "paid";
  userId: string;
  roomId: string;
  room: Room;
  user: User;
};
