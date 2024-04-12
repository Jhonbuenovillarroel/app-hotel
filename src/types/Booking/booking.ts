import { Room } from "../Room/room";
import { User } from "../User/user";

export type Booking = {
  id: string;
  checkIn: Date;
  checkOut: Date;
  userId: string;
  rooms: Room[];
  user: User;
};
