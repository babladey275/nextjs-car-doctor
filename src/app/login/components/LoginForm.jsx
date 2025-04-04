"use client";
import React, { useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import SocialLogin from "@/app/components/Shared/SocialLogin";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  // Get safe redirect URL
  const callbackUrl = useMemo(() => {
    const redirect = searchParams.get("redirect");
    return redirect && redirect.startsWith("/")
      ? decodeURIComponent(redirect)
      : "/";
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl,
        redirect: false,
      });

      if (response.ok) {
        toast.success("Logged In Successfully!");
        form.reset();

        window.location.href = callbackUrl;
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
      <label className="fieldset-label font-bold">Email</label>
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
        className="w-full h-12 my-8 bg-[#FF3811] text-white cursor-pointer text-xl font-bold"
      >
        {loading ? <ImSpinner9 className="animate-spin m-auto" /> : "Sign In"}
      </button>
      <p className="text-center text-[18px]">Or Sign In with</p>
      <div className="my-7">
        <SocialLogin />
      </div>
      <p className="text-center text-[18px]">
        Already have an account?{" "}
        <Link href="/register" className="text-[#FF3811] font-bold">
          Register
        </Link>
      </p>
    </form>
  );
}
