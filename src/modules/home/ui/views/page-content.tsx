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
          className="bg-[#FFB22C] text-white text-xl font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-[#e0a026] transition-all duration-300"
        >
          <Link href="/booking">Book Now</Link>
        </Button>
      </div>
    </div>
  );
}
