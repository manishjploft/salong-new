"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SigninWithNumber from "./SigninWithNumber";
import VerifyOtp from "./VerifyOtp";

const Signin = ({ searchParams }: any) => {
  const [isPasswordLogin, setIsPasswordLogin] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const router: any = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
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
    email: Yup.string()
      .email("Ugyldig e-postadresse")
      .required("E-post er påkrevd"),
    password: Yup.string()
      .min(6, "Passord må være minst 6 tegn")
      .required("Passord er påkrevd"),
  });

  // Formik setup
  const formik: any = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);

      // Sign-in logic
      const res: any = await signIn("credentials", {
        redirect: true,
        email: values.email,
        password: values.password,
        callbackUrl: "/", // Specify your desired redirect path
      });

      if (!res?.ok) {
        setErrors({
          ...formik.errors, // Keep other field errors intact
          general:
            res.error === "CredentialsSignin"
              ? "Feil epost eller passord"
              : "Noe gikk galt.",
        });
      } else {
        // router.push("/");
        window.location.href = "/";
      }

      setSubmitting(false);
    },
  });

  const toggleLoginMethod = () => {
    if (localStorage.getItem("phone")) {
      localStorage.removeItem("phone");
    }
    setIsPasswordLogin(!isPasswordLogin);
    setIsOtpSent(false);
  };

  const handleSendCode = () => {
    setIsOtpSent(true);
    // Simulate sending OTP
    console.log("OTP sent");
  };

  const handleChangeOtp = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleConfirmOtp = () => {
    const otpCode = otp.join("");
    //console.log("Entered OTP:", otpCode);
    router.push("/");
  };

  useEffect(() => {
    if (localStorage.getItem("phone")) {
      setIsPasswordLogin(false);
      setIsOtpSent(true);
    }
  }, []);

  return (
    <div className="flex w-full flex-wrap h-full">
      <div className="w-full lg:w-1/2 p-4">
        <div className="flex flex-col justify-center py-24 max-w-md mx-auto h-full">
          <h1 className="text-3xl font-bold font-heading mb-4">Logg inn</h1>
          <Link
            className="inline-block text-gray-500 transition duration-200 mb-8"
            href="/bli-forhandler"
          >
            <span>Ny på Salongpartner?</span>
            <span className="font-bold font-heading">&nbsp;Bli forhandler</span>
          </Link>

          {isPasswordLogin ? (
            <>
              <form onSubmit={formik.handleSubmit}>
                {/* Password Login */}
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="textInput1"
                >
                  Epost
                </label>
                <input
                  className={`w-full rounded-full p-4 outline-none border ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "border-gray-100"
                  } shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200 mb-4`}
                  id="textInput1"
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Skriv inn epostadresse"
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="text-red-500 text-sm">
                    {formik.errors.email}
                  </span>
                )}
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="textInput2"
                >
                  Passord
                </label>
                {/* <div className="flex items-center gap-1 w-full rounded-full p-4 border border-gray-100 shadow mb-3 focus:ring focus:ring-secondary transition duration-200"> */}
                <input
                  className={`w-full rounded-full p-4 outline-none border ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-gray-100"
                  } shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200 mb-4`}
                  id="textInput2"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Skriv inn passord"
                />
                {formik.touched.password && formik.errors.password && (
                  <span className="text-red-500 text-sm">
                    {formik.errors.password}
                  </span>
                )}
                {/* </div> */}
                <div className="mb-8 flex justify-end">
                  <Link
                    className="inline-block text-secondary hover:text-primary transition duration-200 text-sm font-semibold"
                    href="/glemt-passord"
                  >
                    Glemt Passord?
                  </Link>
                </div>
                {/* Login Button */}
                {/* <Link href="/"> */}
                <button
                  className="h-14 inline-flex items-center justify-center py-4 px-6 text-white font-bold font-heading rounded-full bg-primary w-full text-center border border-primary shadow hover:bg-secondary hover:text-primary focus:ring focus:ring-secondary transition duration-200 mb-8"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Logger inn..." : "Logg inn"}
                </button>
                {/* </Link> */}
                {formik.errors.general && (
                  <div className="flex justify-center items-center text-center text-red-500">
                    {formik.errors.general}
                  </div>
                )}
                {errorMessage && (
                  <div className="flex justify-center items-center text-center text-red-500">
                    {errorMessage}
                  </div>
                )}
              </form>
            </>
          ) : (
            <>
              {!isOtpSent ? (
                <SigninWithNumber onSendOtp={() => setIsOtpSent(true)} />
              ) : (
                <VerifyOtp searchParams={searchParams} />
              )}
            </>
          )}

          {/* Toggle Login Method */}
          <button
            type="button"
            onClick={toggleLoginMethod}
            className="w-full text-center text-primary font-semibold hover:underline mt-4"
          >
            {isPasswordLogin ? "Logg inn med SMS" : "Logg inn med passord"}
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <div className="bg-secondary m-8 rounded-3xl py-24 lg:py-72 xl:py-96">
          <div className="flex flex-col justify-center items-center h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={300}
              height={200}
              viewBox="0 0 63.5 47.7"
              fill="none"
            >
              <path
                fill="#3b1060"
                d="M54.1,4.7c3.2,0,6.2,1,8.7,2.8-10.8,2-18.9,11.5-18.9,23s0,.4,0,.6c-3.1-2.9-4.8-6.9-4.8-11.1,0-8.4,6.7-15.2,15.1-15.2h0ZM9.4,6.6c26.2,0,20.7,25.4,41.9,31.3-3.9,2.5-8.5,3.8-13.2,3.8-9.9,0-15.3-7.2-26-5.9,9.2-6.2,15.6,3.5,25.7,2.5C22.7,29,19.4,8.2,2.3,8.2s-1.6,0-2.3.1c3-1.1,6.2-1.7,9.4-1.7h0Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
