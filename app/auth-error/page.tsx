'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthError({
    params,
  }: {
    params: any;
  }) {
  const router = useRouter();
  const { error, phone, message } = params;

  useEffect(() => {
    if (phone) {
      // Redirect to the OTP verification page with the phone and error message
      router.push(`/verifiser-otp?phone=${phone}&error=${error}&message=${message}`);
    } else {
      // Redirect to the login page with the error message
      router.push(`/logg-inn?error=${error}&message=${message}`);
    }
  }, [phone, error, message, router]);

  return <div>Redirecting...</div>;
}
