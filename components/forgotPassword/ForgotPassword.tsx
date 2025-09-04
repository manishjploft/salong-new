"use client";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

const ForgotPassword = () => {
  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Ugyldig e-postadresse").required("E-post er påkrevd"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      const contactData = {
        customer_email: values.email
      }
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}forget-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(contactData),
        });
       

        if (response.ok) {
          toast.success("Sendt inn!");
          resetForm(); // Clear form after successful submission
        } else {
          toast.error("Bruker ikke funnet");
        }
      } catch (error) {
        toast.error("En feil oppstod, prøv igjen.");
        console.error(error);
      }

      setSubmitting(false);
    },
  });



  return (
    <>
      <div className="flex w-full flex-wrap h-full">
        <div className="w-full  lg:w-1/2 p-4">
          <div className="flex flex-col justify-center py-24 max-w-md mx-auto h-full">
            <form onSubmit={formik.handleSubmit}>
              <h1 className="text-3xl font-bold font-heading mb-4">
                Glemt Passord
              </h1>
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
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
              <button
                disabled={formik.isSubmitting}
                className="mt-8 h-14 inline-flex items-center justify-center py-4 px-6 text-white font-bold font-heading rounded-full bg-primary w-full text-center border border-primary shadow hover:bg-secondary hover:text-primary focus:ring focus:ring-secondary transition duration-200 mb-8"
                type="submit"
              >
                {formik.isSubmitting ? "Sender..." : "Send"}
              </button>
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

export default ForgotPassword;
