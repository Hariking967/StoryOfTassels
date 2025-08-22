import HomeView from "@/modules/home/ui/views/home-view";
import React from "react";

export default function AboutPage() {
  return (
    <>
      <HomeView />
      <div className="min-h-screen flex flex-col">
        {/* About Section */}
        <section className="flex-1 bg-gradient-to-br from-[#eac24b] via-[#D4AF37] to-[#57250b] py-16 px-8 md:px-24">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            About Story of Tassels
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            At <span className="font-semibold">Story of Tassels</span>, we
            believe every celebration deserves a touch of magic. We specialize
            in creating beautiful, organized decorations for all your special
            occasions—from birthdays and housewarmings to haldi ceremonies, baby
            showers, and more. Our mission is to make your events unforgettable,
            stylish, and hassle-free. With creativity, passion, and attention to
            detail, we bring your vision to life one tassel at a time.
          </p>
        </section>

        {/* Contact Info Footer */}
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
      </div>
    </>
  );
}
