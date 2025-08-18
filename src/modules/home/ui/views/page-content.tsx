import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MainContent() {
  return (
    <div className="bg-gradient-to-br from-[#eac24b] via-[#D4AF37] to-[#57250b] h-screen w-full fixed">
      <div className="flex flex-col items-center p-4">
        <Image
          src="/sslogo.png"
          alt="Company Logo"
          width={100}
          height={100}
          className="rounded-full"
        />
        <h1 className="mt-2 text-5xl text-white font-semibold text-center pauline">
          Story Of Tassels
        </h1>
        <br />
        <br />
        <Button
          asChild
          className="bg-[#57250b] text-white text-xl font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-[#97551c] transition-all duration-300 border border-[#eac24b]"
        >
          <Link href="/booking">Book Now</Link>
        </Button>
      </div>
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-4xl text-white text-center">Our Projects</h1>
        <hr className="w-48 border-t-2 border-white mt-2" />
        <Birthday />
        <HouseWarming />
        <Haldi />
        <BabyShower />
      </div>
    </div>
  );
}

export function Birthday() {
  return (
    <div>
      <h2>Birthday</h2>
    </div>
  );
}

export function HouseWarming() {
  return (
    <div>
      <h2>House Warming</h2>
    </div>
  );
}

export function Haldi() {
  return (
    <div>
      <h2>Haldi</h2>
    </div>
  );
}

export function BabyShower() {
  return (
    <div>
      <h2>Baby Shower</h2>
    </div>
  );
}
