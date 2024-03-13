import Image from "next/image";
import Herosection from "./_component/_homecomponent/Herosection";
import Featuresection from "./_component/_homecomponent/Featuresection";
import { Search } from "@mui/icons-material";
import Searchsection from "./_component/_homecomponent/Searchsection";

export default function Home() {
  return (
    <main className="">
      <Herosection/>
      <Featuresection/>
    </main>
  );
}
