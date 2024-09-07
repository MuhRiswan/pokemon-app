"use client";
import Image from "next/image";
import { useState } from "react";
import { X, AlignLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter(); // Initialize useRouter
  const Links = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Pokemon", link: "/pokemon" },
    { id: 3, name: "Profile", link: "/profile" },
  ];

  // Function to handle clearing search and navigating to '/'
  const handleHomeClick = () => {
    router.push("/"); // Navigate to '/'
    setOpen(false); // Close the mobile menu if it's open
  };

  return (
    <nav className="w-full drop-shadow-md bg-white fixed top-0 z-50">
      <div className="md:flex items-center justify-between py-4 px-8 md:px-28 container">
        <div className="flex items-center justify-between">
          <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
            <div onClick={handleHomeClick}>
              <Image src="/logo.svg" alt="logo" width={150} height={50} />
            </div>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="flex right-8 top-6 cursor-pointer md:hidden w-7 h-7 items-center transition-all duration-500 ease-in"
          >
            {open ? <X /> : <AlignLeft />}
          </div>
        </div>
        <ul
          className={cn(
            "md:flex md:items-center md:gap-x-10 md:pb-0 pb-5 md:static bg-transparent md:z-auto  w-full md:w-auto md:pl-0 px-2 md:px-3 transition-all duration-500 ease-in justify-between",
            open ? "block" : "hidden"
          )}
        >
          {Links.map((link) => (
            <li key={link.id} className="font-semibold py-3 md:py-0">
              <div
                className="text-gray-950 hover:text-amber-500 duration-200 cursor-pointer"
                onClick={
                  link.link === "/"
                    ? handleHomeClick
                    : () => router.push(link.link)
                }
              >
                {link.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
