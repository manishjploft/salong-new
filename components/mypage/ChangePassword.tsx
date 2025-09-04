"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hook";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassord } from "@/features/auth/actions/sign-up.action";
import {
  deleteAccount,
  updateNotification,
} from "@/features/customer/customer.action";
import toast from "react-hot-toast";

export default function ChangePassword({ user }: any) {
  const { execute, result, ...rest } = useAction(changePassord);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      const deleteUser = await deleteAccount();
      if (deleteUser.status === "200") {
        signOut(); // Wait for the sign-out process to complete
      } else {
        toast.error("Noe gikk galt");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleChangeNotification = async (
    notificationType: string,
    status: boolean
  ) => {
    try {
      setLoading(true);
      const updateData = {
        notificationType: notificationType,
        status: status,
      };

      const checkUpdate = await updateNotification({ updateData });

      if (checkUpdate.status === "200") {
        toast.success("Statusendring vellykket");
      } else {
        toast.error("Noe gikk galt");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  // Formik setup and Yup validation schema
  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Password confirmation is required"),
    }),
    onSubmit: (values) => {
      setIsSubmitting(true);
      execute(values as any);
      // setIsSubmitting(false);
    },
  });

  useEffect(() => {
    if (result.data?.status === "200") {
      // Reset the form after successful submission
      formik.resetForm();
      toast.success(result?.data?.msg);
      setIsSubmitting(false);
    } else if (result?.data) {
      toast.error(result?.data?.error);
      setIsSubmitting(false);
    }
  }, [result.data]);

  return (
    <>
      <hr />
      {/*
            <div className="py-12 px-4 md:px-10 mb-10 bg-tertiary rounded-xl">
                <div className="flex items-center justify-between mb-12 -mx-4">
                    <div className="max-w-md px-4">
                        <h4 className="text-gray-600 font-bold">Kjøpsvilkår</h4>
                        <p className="text-xs font-medium leading-normal text-gray-400">
                            Jeg godtar kjøpsvilkårene
                        </p>
                    </div>
                    <div className="px-4">
                        {user.checkbox_terms_status ?
                            <button onClick={() => handleChangeNotification('checkbox_terms_status', !user.checkbox_terms_status)} className="flex items-center justify-center h-6 w-11 bg-primary rounded-full">
                                <div className="h-5 w-5 rounded-full bg-transparent" />
                                <div className="h-5 w-5 rounded-full bg-white" />
                            </button>
                            :
                            <button onClick={() => handleChangeNotification('checkbox_terms_status', !user.checkbox_terms_status)} className="flex items-center justify-center h-6 w-11 bg-secondary rounded-full">
                                <div className="h-5 w-5 rounded-full bg-white" />
                                <div className="h-5 w-5 rounded-full bg-transparent" />
                            </button>
                        }
                    </div>
                </div>
                <div className="flex items-center justify-between mb-12 -mx-4">
                    <div className="max-w-md px-4">
                        <h4 className="text-gray-600 font-bold">
                            Personvern policy
                        </h4>
                        <p className="text-xs font-medium leading-normal text-gray-400">
                            Jeg godtar personvern policien
                        </p>
                    </div>
                    <div className="px-4">
                        {user.checkbox_privacy_status ?
                            <button onClick={() => handleChangeNotification('checkbox_privacy_status', !user.checkbox_privacy_status)} className="flex items-center justify-center h-6 w-11 bg-primary rounded-full">
                                <div className="h-5 w-5 rounded-full bg-transparent" />
                                <div className="h-5 w-5 rounded-full bg-white" />
                            </button>
                            :
                            <button onClick={() => handleChangeNotification('checkbox_privacy_status', !user.checkbox_privacy_status)} className="flex items-center justify-center h-6 w-11 bg-secondary rounded-full">
                                <div className="h-5 w-5 rounded-full bg-white" />
                                <div className="h-5 w-5 rounded-full bg-transparent" />
                            </button>
                        }
                    </div>
                </div>
                <div className="flex items-center justify-between -mx-4">
                    <div className="max-w-md px-4">
                        <h4 className="text-gray-600 font-bold">Nyhetsbrev</h4>
                        <p className="text-xs font-medium leading-normal text-gray-400">
                            Jeg godtar nyhetsbrev
                        </p>
                    </div>
                    <div className="px-4">
                        {user.checkbox_marketing_status ?
                            <button onClick={() => handleChangeNotification('checkbox_marketing_status', !user.checkbox_marketing_status)} className="flex items-center justify-center h-6 w-11 bg-primary rounded-full">
                                <div className="h-5 w-5 rounded-full bg-transparent" />
                                <div className="h-5 w-5 rounded-full bg-white" />
                            </button>
                            :
                            <button onClick={() => handleChangeNotification('checkbox_marketing_status', !user.checkbox_marketing_status)} className="flex items-center justify-center h-6 w-11 bg-secondary rounded-full">
                                <div className="h-5 w-5 rounded-full bg-white" />
                                <div className="h-5 w-5 rounded-full bg-transparent" />
                            </button>
                        }
                    </div>
                </div>
            </div>
            */}
      <div className="flex flex-wrap justify-between -mx-4 mt-10 mb-16">
        <div className="w-full md:w-1/2 px-4 mb-10 md:mb-0">
          <div className="max-w-xs">
            <h4 className="text-gray-600 leading-6 font-light">
              Oppdater passord
            </h4>
            <p className="text-xs text-gray-400 leading-normal font-medium mb-4">
              Oppdater passordet ditt her, har du glemt passordet ditt kan du
              klikke under.
            </p>
            <Link
              className="inline-block py-1 px-4 text-sm leading-5 text-white font-bold bg-primary hover:bg-gray-700 rounded-full transition duration-200"
              href="/glemt-passord"
            >
              Glemt passord?
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4">
          <form onSubmit={formik.handleSubmit}>
            {/* <div className="relative w-full h-14 px-3 mb-8 border border-gray-400 hover:border-primary focus-within:border-primary rounded-xl">
                            <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-600 px-1 bg-white">
                                Nåværende passord
                            </span>
                            <input
                                className="block w-full outline-none py-4 bg-transparent text-sm text-black font-medium"
                                id="securityInput1-1"
                                name="current_password"
                                type="password"
                                value={formik.values.current_password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.current_password && formik.errors.current_password && (
                                <p className="text-red-500 text-sm mt-2">{formik.errors.current_password}</p>
                            )}
                        </div> */}
            <div className="relative w-full h-14 px-3 mb-8 border border-gray-400 hover:border-primary focus-within:border-primary rounded-xl">
              <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-600 px-1 bg-white">
                Nytt passord
              </span>
              <input
                className="block w-full outline-none py-4 bg-transparent text-sm text-black font-medium"
                id="securityInput1-2"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div className="relative w-full h-14 px-3 mb-6 border border-gray-400 hover:border-primary focus-within:border-primary rounded-xl">
              <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-600 px-1 bg-white">
                Gjenta nytt passord
              </span>
              <input
                className="block w-full outline-none py-4 bg-transparent text-sm text-black font-medium"
                id="securityInput1-2"
                name="password_confirmation"
                type="password"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password_confirmation &&
                formik.errors.password_confirmation && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.password_confirmation}
                  </p>
                )}
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="block w-full py-3 px-6 text-center text-blue-50 leading-6 font-semibold bg-primary hover:bg-secondary rounded-full transition duration-200"
            >
              {isSubmitting ? "Sender inn" : "Oppdater passord"}
            </button>
          </form>
        </div>
      </div>
      <div className="border-b border-tertiary px-4 mb-8" />
      <div className="flex flex-wrap justify-between items-center -mx-4">
        <div className="w-full md:w-auto px-4 mb-6 md:mb-0">
          <div className="max-w-xs">
            <h4 className="text-gray-600 font-light mb-1">Slett min konto</h4>
            <p className="text-xs text-gray-400 leading-normal font-medium">
              Før du sletter kontoen, merk at Salongpartner ikke kan reversere
              det.
            </p>
          </div>
        </div>
        <div className="w-full md:w-auto px-4">
          <button
            onClick={() => setShowModal(true)}
            className="inline-block py-2 px-5 text-center text-white font-semibold leading-6 bg-red-500 hover:bg-red-600 rounded-full transition duration-200"
          >
            Slett
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h2 className="text-lg font-semibold text-gray-800">
              Bekreft sletting
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Er du sikker på at du vil slette kontoen?
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                Avbryt
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                onClick={handleDelete}
              >
                Slett
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="loaderContainer">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
