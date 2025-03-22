"use client";
import { registerUser } from "@/app/actions/auth/registerUser";
import Link from "next/link";
import React from "react";

export default function RegisterForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    registerUser({ name, email, password });
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

      <button className="w-full h-12 my-8 bg-orange-500 text-white font-bold cursor-pointer">
        Sign Up
      </button>
      <p className="text-center">Or Sign In with</p>

      <p className="text-center">
        Don't Have an account?{" "}
        <Link href="/login" className="text-orange-500 font-bold">
          Login
        </Link>
      </p>
    </form>
  );
}
