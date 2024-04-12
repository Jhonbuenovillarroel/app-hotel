import { Image } from "../Image/image";
import { Room } from "../Room/room";

export interface HotelCenter {
  id: string;
  name: string;
  reference: string;
  address: string;
  mapUrl: string;
  description: string;
  urlSegment: string;
  phone?: string;
  cellPhone?: string;
  garage: boolean;
  rooms: Room[];
  images: Image[];
}
