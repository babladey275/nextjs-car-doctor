"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa6";

export default function SocialLogin() {
  const router = useRouter();
  const session = useSession();

  const handleSocialLogin = (providerName) => {
    signIn(providerName);
  };

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
      toast.success("Logged in Successfully!");
    }
  }, [session?.status]);
  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        className="bg-[#333] text-white text-xl btn w-full h-12 cursor-pointer flex items-center justify-center gap-2"
      >
        <FaGoogle className=" " />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}
