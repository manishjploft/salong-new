"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const SigninWithNumber = ({ onSendOtp }: any) => {
  const router: any = useRouter();

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^\d{8}$/, "Telefonnummer må være 8 sifre") // Ensure it is exactly 8 digits
      .required("Telefonnummer er påkrevd") // Ensure it's required
  });


  // Formik setup
  const formikWithPhone: any = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      // alert("lll")
      setSubmitting(true);

      // Sign-in logic
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login-with-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ phone: values.phone }),
      });

      if (response.ok) {
        onSendOtp(true);
        localStorage.setItem('phone', values.phone);
        toast.success("SMS sendt");
      } else {
        const errorData = await response.json(); // Parse the JSON response

        const errorMessage = errorData?.msg || "An error occurred"; // Fallback if no error message is present
        toast.error(errorMessage);
      }

      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formikWithPhone.handleSubmit}>
      {/* SMS/OTP Login */}
      <label
        className="block text-sm font-medium mb-2"
        htmlFor="phoneInput"
      >
        Telefonnummer
      </label>
      <div className="flex flex-row gap-2 w-full">
        <input
          className="w-1/4 rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200 mb-4"
          id="phoneInput"
          type="text"
          value="+47"
          disabled
        />
        <input
          className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200 mb-4"
          id="phoneInput"
          type="tel"
          name="phone"
          value={formikWithPhone.values.phone}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
            formikWithPhone.setFieldValue("phone", numericValue);
          }}
          onBlur={formikWithPhone.handleBlur}
          maxLength={8}
          placeholder="Skriv inn telefonnummer"
        />
      </div>
      {formikWithPhone.touched.phone && formikWithPhone.errors.phone && (
        <span className="text-red-500 text-sm">{formikWithPhone.errors.phone}</span>
      )}
      <button
        type="submit"
        className="h-14 inline-flex items-center justify-center py-4 px-6 text-white font-bold font-heading rounded-full bg-primary w-full text-center border border-primary shadow hover:bg-secondary hover:text-primary focus:ring focus:ring-secondary transition duration-200 mb-8"
      >
        Send kode
      </button>
    </form>
  );
};

export default SigninWithNumber;
