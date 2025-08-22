"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Review from "./review";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

type Review = {
  id: string;
  name: string;
  stars: number;
  review: string;
};

type Project = {
  name: string;
  images: string[];
};

export default function MainContent() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);
  return (
    <>
      <div className="bg-gradient-to-br from-[#eac24b] via-[#D4AF37] to-[#57250b] min-h-screen w-full">
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
          {projects.map((project, idx) => (
            <div key={idx} className="mt-8 w-full max-w-5xl px-4">
              <h2 className="text-2xl text-white font-semibold mb-4">
                {project.name}
              </h2>

              <Carousel className="w-full relative">
                <CarouselContent>
                  {project.images.map((img, i) => (
                    <CarouselItem
                      key={i}
                      className="basis-1/1 sm:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-2">
                        <Image
                          src={img}
                          alt={`${project.name}-${i}`}
                          width={500}
                          height={300}
                          className="rounded-xl shadow-lg object-cover w-full h-64"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Fix: force small round buttons at fixed positions */}
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#57250b] text-white shadow-md hover:bg-[#97551c]" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#57250b] text-white shadow-md hover:bg-[#97551c]" />
              </Carousel>
            </div>
          ))}
        </div>
        <Review />
        <br />
        <br />
        <br />
      </div>
      <div className="bg-[#57250b] text-white py-12 px-8 md:px-24">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>
          Email:{" "}
          <a href="mailto:info@storyoftassels.com" className="underline">
            info@storyoftassels.com
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href="tel:+911234567890" className="underline">
            0450 140 357
          </a>
        </p>
        <p>Address: 123 Celebration Street, Party City, India</p>
      </div>
    </>
  );
}
