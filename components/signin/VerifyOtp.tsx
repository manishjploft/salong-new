"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const VerifyOtp = ({ searchParams }: any) => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log("searchParams-verify", searchParams);

    // Check if the router is ready and query is available
    if (searchParams?.error) {
      const { error } = searchParams;

      // Set the error message based on the query parameter
      if (error === "CredentialsSignin") {
        setErrorMessage("Feil epost eller passord");
      } else {
        setErrorMessage(error);
      }
    }
  }, [searchParams]);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    otp: Yup.string()
      .length(4, "Koden må være nøyaktig 4 sifre")
      .matches(/^\d+$/, "Koden må kun inneholde tall")
      .required("Koden er påkrevd"),
  });

  const formik: any = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);

      const res: any = await signIn("credentials", {
        redirect: true,
        phone: localStorage.getItem("phone"),
        password: values.otp,
        callbackUrl: "/",
      });
      console.log("res", res);
      setSubmitting(false);
      if (res?.ok) {
        window.location.href = "/";
      } else {
        setErrorMessage(
          res.error === "CredentialsSignin" ? "Ugyldig OTP" : "noe gikk galt"
        );
      }
    },
  });

  const handleChangeOtp = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Autofocus next input
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }

      // Update Formik's OTP value
      formik.setFieldValue("otp", newOtp.join(""));
    }
  };

  const handleConfirmOtp = () => {
    formik.handleSubmit();
  };

  return (
    <>
      <label className="block text-sm font-medium mb-2" htmlFor="otpInput">
        Skriv inn koden
      </label>
      <div className="flex justify-between my-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChangeOtp(index, e.target.value)}
            className="w-20 text-2xl font-bold h-20 text-center border border-gray-200 rounded-xl shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200"
          />
        ))}
      </div>
      {formik.errors.otp && formik.touched.otp && (
        <div className="text-red-500 text-sm mb-4">{formik.errors.otp}</div>
      )}
      <button
        type="button"
        onClick={handleConfirmOtp}
        disabled={formik.isSubmitting}
        className="h-14 inline-flex items-center justify-center py-4 px-6 text-white font-bold font-heading rounded-full bg-primary w-full text-center border border-primary shadow hover:bg-secondary hover:text-primary focus:ring focus:ring-secondary transition duration-200 mb-8"
      >
        {formik.isSubmitting ? "Logger inn..." : "Bekreft kode"}
      </button>
      {errorMessage && (
        <div className="flex justify-center items-center text-center text-red-500">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default VerifyOtp;
