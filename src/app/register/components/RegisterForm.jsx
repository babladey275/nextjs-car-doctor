import Link from "next/link";
import React from "react";

export default function RegisterForm() {
  return (
    <form className="fieldset w-full max-w-lg">
      <label className="fieldset-label font-bold">Name</label>
      <input type="text" className="input w-full" placeholder="Name" />

      <label className="fieldset-label font-bold mt-8">Email</label>
      <input type="email" className="input w-full" placeholder="Email" />

      <label className="fieldset-label font-bold mt-8">Password</label>
      <input type="password" className="input w-full" placeholder="Password" />

      <button className="w-full h-12 my-8 bg-orange-500 text-white font-bold">
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
