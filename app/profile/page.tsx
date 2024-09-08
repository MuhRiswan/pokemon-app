import React from "react";
import Image from "next/image";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const Profile = () => {
  return (
    <div className="w-full md:max-w-lg px-5 py-24 md:py-28 mx-auto  p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
      <div className="flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 p-4  rounded-lg">
        <Image
          className="object-cover rounded-lg mt-3 mr-3"
          src={"/profile.jpg"}
          alt="Profile Picture"
          width={80}
          height={80}
        />
        <div>
          <p
            className="font-display mb-2 text-2xl font-semibold text-black"
            itemProp="author"
          >
            <a href="#" rel="author">
              M.Riswan
            </a>
          </p>
          <div className="mb-4 prose prose-sm text-gray-400">
            <p>
              Front End web developer yang senang mempelajari dan mengembangkan
              kemampuan dalam membuat user interface yang indah dan responsif.
            </p>
          </div>
          <div className="flex">
            <a
              href="https://www.linkedin.com/in/m-riswan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInLogoIcon className="text-brand-500 h-4 mr-4" />
            </a>
            <a
              href="https://github.com/MuhRiswan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubLogoIcon className="text-brand-500 h-4 mr-4" />
            </a>
          </div>
        </div>
      </div>
      <form
        className="space-y-4 mt-8 border-t-2 border-gray-200 pt-4"
        action="#"
      >
        <h3 className="text-lg font-medium text-gray-900">Update Profile</h3>
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center"
        >
          Update
          <ArrowRightIcon className="ml-2 -mr-1 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default Profile;
