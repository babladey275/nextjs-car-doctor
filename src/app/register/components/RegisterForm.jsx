"use client";
import { registerUser } from "@/app/actions/auth/registerUser";
import SocialLogin from "@/app/components/Shared/SocialLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);

    try {
      const result = await registerUser({ name, email, password });

      console.log(result);

      if (result?.success) {
        toast.success("Registration successful!");
        form.reset();
        router.push("/login");
      } else {
        toast.error(
          result?.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      toast.error(
        error?.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fieldset w-full max-w-lg">
      <label className="fieldset-label font-bold">Name</label>
      <input
        name="name"
        type="text"
        className="input w-full"
        placeholder="Name"
        required
      />

      <label className="fieldset-label font-bold mt-8">Email</label>
      <input
        name="email"
        type="email"
        className="input w-full"
        placeholder="Email"
        required
      />

      <label className="fieldset-label font-bold mt-8">Password</label>
      <input
        name="password"
        type="password"
        className="input w-full"
        placeholder="Password"
        required
      />

      <button
        disabled={loading}
        type="submit"
        className="w-full h-12 my-8 bg-[#FF3811] text-white  text-xl font-bold cursor-pointer"
      >
        {loading ? <ImSpinner9 className="animate-spin m-auto" /> : "Sign Up"}
      </button>
      <p className="text-center text-[18px]">Or Sign In with</p>
      <div className="my-7">
        <SocialLogin />
      </div>
      <p className="text-center text-[18px]">
        Don't Have an account?{" "}
        <Link href="/login" className="text-[#FF3811] font-bold">
          Login
        </Link>
      </p>
    </form>
  );
}
