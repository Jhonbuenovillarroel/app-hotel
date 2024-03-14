import { Bona_Nova, Work_Sans } from "next/font/google";

const bonaNova = Bona_Nova({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const workSans = Work_Sans({
  subsets: ["latin"],
});

export { bonaNova, workSans };
