"use client";
import React, { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hook";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp } from "@/features/auth/actions/sign-up.action";
import toast from "react-hot-toast";
import Link from "next/link";

const Signup = () => {
  const { execute, result, ...rest } = useAction(signUp);

  // If there are errors from the signUp result
  const validationErrors: any = result?.validationError || {};

  const data = result.data as any;

  // State for the form fields
  // const [errors, setErrors] = useState<any>(validationErrors);
  // const [isAgreePrivacy, setIsAgreePrivacy] = useState(false);
  const [isNewsLetter, setIsNewsLetter] = useState(true);
  const [isInvoiceReceive, setIsInvoiceReceive] = useState(true);
  const [isCompanyLoading, setIsCompanyLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Password visibility toggle
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false); // Confirm password visibility toggle
  // const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");

  // Function to fetch city based on Zip code
  const fetchCityByZip = async (zip: string) => {
    if (zip.length === 4) {
      try {
        const response = await fetch(`https://www.bring.no/api/zipcode/${zip}`);
        const data = await response.json();
        if (data.city) {
          formik.setFieldValue("zip", data.city);
        } else {
          formik.setFieldValue("zip", "");
        }
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    }
  };

  // Function to fetch company details based on org.nr
  const fetchCompanyInfo = async (orgNumber: string) => {
    if (orgNumber.length === 9) {
      setIsCompanyLoading(true);
      try {
        const response = await fetch(
          `https://data.brreg.no/enhetsregisteret/api/enheter/${orgNumber}`
        );
        const data = await response.json();
        if (data.navn && data.forretningsadresse) {
          // Populate form fields with company name and address
          //console.log("data", data);

          formik.setFieldValue("company_name", data?.navn || "");
          formik.setFieldValue(
            "address",
            data?.forretningsadresse?.adresse?.length > 0
              ? data?.forretningsadresse?.adresse[0]
              : ""
          );
        } else {
          // Handle case when no data is returned
          formik.setFieldValue("company_name", "");
          formik.setFieldValue("address", "");
        }
      } catch (error) {
        console.error("Error fetching company info:", error);
      } finally {
        setIsCompanyLoading(false);
      }
    }
  };

  // Formik setup and Yup validation schema
  const formik = useFormik({
    initialValues: {
      company_number: "",
      company_name: "",
      customer_name: "",
      customer_phone: "",
      customer_email: "",
      password: "",
      password_confirmation: "",
      zip: "",
      address: "",
      city: "",
      checkbox_marketing_status: false,
      checkbox_privacy_status: false,
      // invoice_reference: '',
      // notice: '',
      // isAgreePrivacy: false,
    },
    validationSchema: Yup.object({
      company_number: Yup.string()
        .length(9, "Org. nr må være på 9 tegn")
        .required("Org. nr er påkrevd"),
      company_name: Yup.string().required("Firmanavn er påkrevd"),
      address: Yup.string().required("Adresse er påkrevd"),
      customer_name: Yup.string().required("Kontaktnavn er påkrevd"),
      customer_phone: Yup.string()
        .matches(
          /^\d{8}$/,
          "Telefonnummer må være 8 sifre og kun inneholde tall"
        )
        .required("Telefonnummer er påkrevd"),
      customer_email: Yup.string()
        .email("Ugyldig e-postadresse")
        .required("E-post er påkrevd"),
      password: Yup.string()
        .min(6, "Passordet må være på minst 6 tegn")
        .required("Passord er påkrevd"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Passord må samsvare")
        .required("Passordbekreftelse er påkrevd"),
      zip: Yup.string()
        .length(4, "Postnummeret må være 4 tegn langt. Vennligst prøv igjen.")
        .required("Postnummer er påkrevd"),
      city: Yup.string().required("Poststed er påkrevd"),
      checkbox_marketing_status: Yup.boolean().optional(),
      checkbox_privacy_status: Yup.boolean().optional(),
      // invoice_reference: Yup.string().optional(),
      // notice: Yup.string().optional(),
      // isAgreePrivacy: Yup.boolean()
      //   .oneOf([true], "Du må godta personvern og vilkårene") // Error message if checkbox is not checked
      //   .required("Du må godta personvern og vilkårene"),
    }),
    onSubmit: (values) => {
      setIsSubmitting(true);
      execute(values as any);
      // setIsSubmitting(false);
    },
  });

  useEffect(() => {
    if (formik.values.company_number) {
      fetchCompanyInfo(formik.values.company_number);
    }
  }, [formik.values.company_number]);

  useEffect(() => {
    if (result.data?.status === "200") {
      // Reset the form after successful submission
      formik.resetForm();
      // toast.success(result?.data?.msg);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
    }
  }, [result.data]);
  return (
    <>
      <div className="flex w-full flex-wrap h-full">
        <div className="w-full  lg:w-1/2 p-4">
          <div className="flex flex-col justify-center py-24 max-w-md mx-auto h-full">
            <form onSubmit={formik.handleSubmit}>
              <h1 className="text-3xl font-bold font-heading mb-4">
                Vil du forhandle våre produkter?
              </h1>
              <div className="inline-block text-gray-500 hover: transition duration-200 mb-2">
                <span>
                  Salongpartner er forhandler for skjønnhetsbransjen. For å
                  handle i vår nettbutikk må du registrere bedriften din med
                  org.nr i skjemaet under.
                </span>
                <span />
                <span className="font-bold font-heading">&nbsp;</span>
              </div>
              <Link
                className="inline-block text-gray-500 hover: transition duration-200 mb-8"
                href="/logg-inn"
              >
                <span>Allerede kunde?</span>
                <span />
                <span className="font-bold font-heading">&nbsp;Logg inn</span>
              </Link>
              <p className="font-semibold text-lg py-4">Kontaktinformasjon</p>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="textInput1"
              >
                Org. nr
              </label>
              <input
                className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200 mb-4"
                id="textInput1"
                type="text"
                name="company_number"
                value={formik.values.company_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                maxLength={9}
                placeholder=""
              />
              {isCompanyLoading && <p>Loading company info...</p>}
              {formik.touched.company_number &&
                formik.errors.company_number && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.company_number}
                  </p>
                )}
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="textInput1"
              >
                Firmanavn
              </label>
              <input
                className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200 mb-4"
                id="textInput1"
                type="text"
                name="company_name"
                value={formik.values.company_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder=""
              />
              {formik.touched.company_name && formik.errors.company_name && (
                <p className="text-red-500 text-sm">
                  {formik.errors.company_name}
                </p>
              )}

              <label
                className="block text-sm font-medium mb-2"
                htmlFor="textInput1"
              >
                Kontaktperson
              </label>
              <input
                className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200 mb-4"
                id="name"
                type="text"
                name="customer_name"
                value={formik.values.customer_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.customer_name && formik.errors.customer_name && (
                <p className="text-red-500 text-sm">
                  {formik.errors.customer_name}
                </p>
              )}

              <label
                className="block text-sm font-medium mb-2"
                htmlFor="textInput1"
              >
                Telefon
              </label>
              <input
                className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200 mb-4"
                id="textInput1"
                type="text"
                name="customer_phone"
                value={formik.values.customer_phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder=""
              />
              {formik.touched.customer_phone &&
                formik.errors.customer_phone && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.customer_phone}
                  </p>
                )}
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="textInput1"
              >
                Epost
              </label>
              <input
                className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200 mb-4"
                id="email"
                type="text"
                name="customer_email"
                value={formik.values.customer_email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.customer_email &&
                formik.errors.customer_email && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.customer_email}
                  </p>
                )}
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="textInput2"
              >
                Passord
              </label>
              <div className="flex items-center gap-1 w-full rounded-full px-4 border border-gray-100 shadow mb-3">
                <input
                  className="outline-none flex-1 placeholder-gray-500 py-4"
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {isPasswordVisible ? (
                  <svg
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_125_10638)">
                      <path
                        d="M12.0005 15.6973C14.0411 15.6973 15.6954 14.0431 15.6954 12.0025C15.6954 9.96186 14.0411 8.30762 12.0005 8.30762C9.9599 8.30762 8.30566 9.96186 8.30566 12.0025C8.30566 14.0431 9.9599 15.6973 12.0005 15.6973Z"
                        fill="#A3A3A3"
                      />
                      <path
                        d="M23.6319 10.9779C20.7917 7.54584 16.4926 4.24219 12 4.24219C7.50665 4.24219 3.20646 7.54815 0.368214 10.9779C-0.122738 11.5709 -0.122738 12.4318 0.368214 13.0248C1.08178 13.8871 2.57773 15.5516 4.57572 17.006C9.60759 20.6691 14.3814 20.6772 19.4244 17.006C21.4224 15.5516 22.9183 13.8871 23.6319 13.0248C24.1214 12.433 24.1239 11.5729 23.6319 10.9779ZM12 6.82858C14.8525 6.82858 17.1728 9.14894 17.1728 12.0014C17.1728 14.8538 14.8525 17.1741 12 17.1741C9.14763 17.1741 6.82726 14.8538 6.82726 12.0014C6.82726 9.14894 9.14763 6.82858 12 6.82858Z"
                        fill="#A3A3A3"
                      />
                      <path
                        d="M1 1L23 22"
                        stroke="#A3A3A3"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_125_10638">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21.25 9.15C18.94 5.52 15.56 3.43 12 3.43C10.22 3.43 8.49 3.95 6.91 4.92C5.33 5.9 3.91 7.33 2.75 9.15C1.75 10.72 1.75 13.27 2.75 14.84C5.06 18.48 8.44 20.56 12 20.56C13.78 20.56 15.51 20.04 17.09 19.07C18.67 18.09 20.09 16.66 21.25 14.84C22.25 13.28 22.25 10.72 21.25 9.15ZM12 16.04C9.76 16.04 7.96 14.23 7.96 12C7.96 9.77 9.76 7.96 12 7.96C14.24 7.96 16.04 9.77 16.04 12C16.04 14.23 14.24 16.04 12 16.04Z"
                      fill="#A3A3A3"
                    />
                    <path
                      d="M12.0004 9.14C10.4304 9.14 9.15039 10.42 9.15039 12C9.15039 13.57 10.4304 14.85 12.0004 14.85C13.5704 14.85 14.8604 13.57 14.8604 12C14.8604 10.43 13.5704 9.14 12.0004 9.14Z"
                      fill="#A3A3A3"
                    />
                  </svg>
                )}
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="textInput2"
              >
                Bekreft passord
              </label>
              <div className="flex items-center gap-1 w-full rounded-full px-4 border border-gray-100 shadow mb-3">
                <input
                  className="outline-none flex-1 placeholder-gray-500 py-4"
                  id="password_confirmation"
                  name="password_confirmation"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  value={formik.values.password_confirmation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {isConfirmPasswordVisible ? (
                  <svg
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_125_10638)">
                      <path
                        d="M12.0005 15.6973C14.0411 15.6973 15.6954 14.0431 15.6954 12.0025C15.6954 9.96186 14.0411 8.30762 12.0005 8.30762C9.9599 8.30762 8.30566 9.96186 8.30566 12.0025C8.30566 14.0431 9.9599 15.6973 12.0005 15.6973Z"
                        fill="#A3A3A3"
                      />
                      <path
                        d="M23.6319 10.9779C20.7917 7.54584 16.4926 4.24219 12 4.24219C7.50665 4.24219 3.20646 7.54815 0.368214 10.9779C-0.122738 11.5709 -0.122738 12.4318 0.368214 13.0248C1.08178 13.8871 2.57773 15.5516 4.57572 17.006C9.60759 20.6691 14.3814 20.6772 19.4244 17.006C21.4224 15.5516 22.9183 13.8871 23.6319 13.0248C24.1214 12.433 24.1239 11.5729 23.6319 10.9779ZM12 6.82858C14.8525 6.82858 17.1728 9.14894 17.1728 12.0014C17.1728 14.8538 14.8525 17.1741 12 17.1741C9.14763 17.1741 6.82726 14.8538 6.82726 12.0014C6.82726 9.14894 9.14763 6.82858 12 6.82858Z"
                        fill="#A3A3A3"
                      />
                      <path
                        d="M1 1L23 22"
                        stroke="#A3A3A3"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_125_10638">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21.25 9.15C18.94 5.52 15.56 3.43 12 3.43C10.22 3.43 8.49 3.95 6.91 4.92C5.33 5.9 3.91 7.33 2.75 9.15C1.75 10.72 1.75 13.27 2.75 14.84C5.06 18.48 8.44 20.56 12 20.56C13.78 20.56 15.51 20.04 17.09 19.07C18.67 18.09 20.09 16.66 21.25 14.84C22.25 13.28 22.25 10.72 21.25 9.15ZM12 16.04C9.76 16.04 7.96 14.23 7.96 12C7.96 9.77 9.76 7.96 12 7.96C14.24 7.96 16.04 9.77 16.04 12C16.04 14.23 14.24 16.04 12 16.04Z"
                      fill="#A3A3A3"
                    />
                    <path
                      d="M12.0004 9.14C10.4304 9.14 9.15039 10.42 9.15039 12C9.15039 13.57 10.4304 14.85 12.0004 14.85C13.5704 14.85 14.8604 13.57 14.8604 12C14.8604 10.43 13.5704 9.14 12.0004 9.14Z"
                      fill="#A3A3A3"
                    />
                  </svg>
                )}
              </div>
              {formik.touched.password_confirmation &&
                formik.errors.password_confirmation && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.password_confirmation}
                  </p>
                )}
              {/*
              
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="textInput1"
              >
                Kommentar
              </label>
              <input
                className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200 mb-4"
                id="textInput1"
                type="text"
                required
                placeholder=""
              />
              */}
              <p className="font-semibold text-lg py-4">Adresse</p>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="textInput1"
              >
                Adresse
              </label>
              <input
                className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200 mb-4"
                id="address"
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-red-500 text-sm">{formik.errors.address}</p>
              )}
              <div className="flex items-center gap-2">
                <div className="w-1/3">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="textInput1"
                  >
                    Postnr.
                  </label>
                  <input
                    className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200 mb-4"
                    id="zip"
                    type="text"
                    name="zip"
                    value={formik.values.zip}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.zip && formik.errors.zip && (
                    <p className="text-red-500 text-sm">{formik.errors.zip}</p>
                  )}
                </div>
                <div className="w-full">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="textInput1"
                  >
                    Poststed
                  </label>
                  <input
                    className="w-full rounded-full p-4 outline-none border border-gray-100 shadow placeholder-gray-500 focus:ring focus:ring-secondary transition duration-200 mb-4"
                    id="city"
                    type="text"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <p className="text-red-500 text-sm">{formik.errors.city}</p>
                  )}
                </div>
              </div>
              <div className="">
                <input
                  name="checkbox_privacy_status"
                  type="checkbox"
                  checked={formik.values.checkbox_privacy_status}
                  onChange={formik.handleChange}
                />
                <span> Jeg aksepterer personvern og vilkårene*</span>
              </div>
              <div className="">
                <input
                  name="checkbox_marketing_status"
                  type="checkbox"
                  checked={formik.values.checkbox_marketing_status}
                  onChange={formik.handleChange}
                />
                <span> Jeg ønsker motta nyhetsbrev</span>
              </div>
              <button
                disabled={rest.status === "executing" || isSubmitting}
                className="mt-8 h-14 inline-flex items-center justify-center py-4 px-6 text-white font-bold font-heading rounded-full bg-primary w-full text-center border border-primary shadow hover:bg-secondary hover:text-primary focus:ring focus:ring-secondary transition duration-200 mb-8"
                type="submit"
              >
                {isSubmitting ? "Sender inn" : "Registrer"}
              </button>
              <div
                className={`flex justify-center items-center text-center 
                ${
                  result?.data?.status === "200"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {(result?.data as any)?.msg || (result?.data as any)?.error}
              </div>
            </form>
          </div>
        </div>
        <div className="w-full flex lg:w-1/2">
          <div className="bg-secondary w-full m-8 rounded-3xl py-24 lg:py-72 xl:py-96">
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
    </>
  );
};

export default Signup;
