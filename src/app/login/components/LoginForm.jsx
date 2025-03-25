"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
  // const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });
      // router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full max-w-lg">
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

      <button className="w-full h-12 my-8 bg-[#FF3811] text-white cursor-pointer font-bold">
        Sign In
      </button>
      <p className="text-center">Or Sign In with</p>

      <p className="text-center">
        Already have an account?{" "}
        <Link href="/register" className="text-[#FF3811] font-bold">
          Register
        </Link>
      </p>
    </form>
  );
}
