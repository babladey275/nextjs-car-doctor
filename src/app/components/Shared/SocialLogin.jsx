"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";

const handleSocialLogin = (providerName) => {
  signIn(providerName);
};

export default function SocialLogin() {
  return (
    <div className="flex justify-center gap-8">
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        className="bg-[#4285F4] rounded-full p-3 cursor-pointer"
      >
        <FaGoogle className="text-white text-xl" />
      </button>
      <button
        type="button"
        onClick={() => handleSocialLogin("github")}
        className="bg-[#333] rounded-full p-3 cursor-pointer"
      >
        <FaGithub className="text-white text-xl" />
      </button>
    </div>
  );
}
