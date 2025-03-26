"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      toast.error("Please fill in both fields");
      return;
    }

    setLoading(true);

    try {
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });
      console.log(response);
      if (response.ok) {
        toast.success("Logged In Successfully!");
        router.push("/");
        form.reset();
      } else {
        toast.error("Authentication failed. Please check your credentials.");
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

      <button
        disabled={loading}
        type="submit"
        className="w-full h-12 my-8 bg-[#FF3811] text-white cursor-pointer font-bold"
      >
        {loading ? (
          <ImSpinner9 className="animate-spin m-auto text-xl" />
        ) : (
          "Sign In"
        )}
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
