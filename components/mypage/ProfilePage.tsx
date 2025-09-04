"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function ProfilePage({ userDetail }: any) {
    const session = useSession();
    const [formData, setFormData] = useState({
        customer_email: userDetail?.email || "",
        customer_phone: userDetail?.phone || "",
        address: userDetail?.address || "",
        zip: userDetail?.zip || "",
        city: userDetail?.city || "",
    });
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<any>({});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev: any) => ({ ...prev, [name]: "" })); // clear error when typing
    };

    const validate = () => {
        let newErrors: any = {};

        if (!formData.customer_email) {
            newErrors.customer_email = "E-post er påkrevd";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customer_email)) {
            newErrors.customer_email = "Ugyldig e-postadresse";
        }

        if (!formData.customer_phone) {
            newErrors.customer_phone = "Telefonnummer er påkrevd";
        } else if (!/^\d{8}$/.test(formData.customer_phone)) {
            newErrors.customer_phone = "Telefonnummer må være nøyaktig 8 sifre";
        }

        if (!formData.address) {
            newErrors.address = "Adresse er påkrevd";
        }

        if (!formData.zip) {
            newErrors.zip = "Postnummer er påkrevd";
        } else if (!/^\d{4}$/.test(formData.zip)) {
            newErrors.zip = "Postnummer må være 4 sifre";
        }

        if (!formData.city) {
            newErrors.city = "Poststed er påkrevd";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // console.log("session", session?.data?.user?.accessToken);

        if (!validate()) return; // stop if validation fails
        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}updateProfile`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${session?.data?.user?.accessToken}`, // use .env
                    },
                    body: new URLSearchParams(formData),
                }
            );

            const data = await res.json();
            console.log("Update Response:", data);

            if (res.ok) {
                toast.success("Profilen er oppdatert!");
            } else {
                toast.error(data?.error || "Kunne ikke oppdatere profilen");
            }
        } catch (err) {
            console.error(err);
            toast.error("Noe gikk galt!");
        } finally {
            setLoading(false); // enable button back
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-wrap -mx-4 -mb-6">
                <div className="w-full px-4 mb-8">
                    <h4 className="text-gray-600 font-light mb-1">
                        Min informasjon
                    </h4>
                </div>
                <div className="w-full sm:w-1/2 lg:w-full xl:w-1/2 px-4 mb-6">
                    <div className="relative w-full h-14 py-4 px-3 border border-gray-400 focus-within:border-primary rounded-xl">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-medium text-gray-500 px-1 bg-white">
                            Firmanavn
                        </span>
                        <input
                            className="block w-full outline-none bg-transparent text-sm text-black font-medium"
                            id="accountInput1-1"
                            type="text"
                            //value={userDetail?.company_name}
                            value={userDetail?.customer_name}
                            disabled
                            placeholder=""
                        />
                    </div>
                </div>
                <div className="w-full sm:w-1/2 lg:w-full xl:w-1/2 px-4 mb-6">
                    <div className="relative w-full h-14 py-4 px-3 border border-gray-400 focus-within:border-primary rounded-xl">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-medium text-gray-500 px-1 bg-white">
                            Organsisasjonsnummer
                        </span>
                        <input
                            className="block w-full outline-none bg-transparent text-sm text-black font-medium"
                            id="accountInput1-2"
                            type="text"
                            value={userDetail?.customer_number}
                            disabled
                            placeholder=""
                        />
                    </div>
                </div>
                {/*
                    <div className="w-full sm:w-full lg:w-full xl:w-full px-4 mb-6">
                      <div className="relative w-full h-14 py-4 px-3 border border-gray-400 focus-within:border-primary rounded-xl">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-medium text-gray-500 px-1 bg-white">
                          Navn
                        </span>
                        <input
                          className="block w-full outline-none bg-transparent text-sm text-black font-medium"
                          id="accountInput1-1"
                          type="text"
                          value={userDetail?.customer_name}
                          disabled
                          placeholder=""
                        />
                      </div>
                    </div>
                    */}
                {/*
                    <div className="w-full sm:w-1/2 lg:w-full xl:w-1/2 px-4 mb-6">
                      <div className="relative w-full h-14 py-4 px-3 border border-gray-400 focus-within:border-primary rounded-xl">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-medium text-gray-500 px-1 bg-white">
                          Kundenummer
                        </span>
                        <input
                          className="block w-full outline-none bg-transparent text-sm text-black font-medium"
                          id="accountInput1-2"
                          type="number"
                          value={userDetail?.customer_number}
                          disabled
                          placeholder=""
                        />
                      </div>
                    </div>
                    */}
                <div className="w-full sm:w-1/2 lg:w-full xl:w-1/2 px-4 mb-6">
                    <div className="relative w-full h-14 py-4 px-3 border border-gray-400 focus-within:border-primary rounded-xl">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-medium text-gray-500 px-1 bg-white">
                            Epostadresse
                        </span>
                        <input
                            className="block w-full outline-none bg-transparent text-sm text-black font-medium"
                            id="accountInput1-3"
                            type="email"
                            name="customer_email"
                            value={formData.customer_email}
                            onChange={handleChange}
                            placeholder=""
                        />
                    </div>
                    {errors.customer_email && <p className="text-red-500 text-xs mt-1">{errors.customer_email}</p>}
                </div>
                <div className="w-full sm:w-1/2 lg:w-full xl:w-1/2 px-4 mb-6">
                    <div className="relative w-full h-14 py-4 px-3 border border-gray-400 focus-within:border-primary rounded-xl">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-medium text-gray-500 px-1 bg-white">
                            Telefonnummer
                        </span>
                        <input
                            className="block w-full outline-none bg-transparent text-sm text-black font-medium"
                            id="accountInput1-4"
                            type="text"
                            name="customer_phone"
                            value={formData.customer_phone}
                            onChange={handleChange}
                            placeholder=""
                        />
                    </div>
                    {errors.customer_phone && <p className="text-red-500 text-xs mt-1">{errors.customer_phone}</p>}
                </div>
                <div className="w-full px-4 mb-8">
                    <h4 className="text-gray-600 font-light mb-1">
                        Leveringsadresse
                    </h4>
                </div>
                <div className="w-full sm:w-1/2 lg:w-full xl:w-1/2 px-4 mb-6">
                    <div className="relative w-full h-14 py-4 px-3 border border-gray-400 focus-within:border-primary rounded-xl">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-medium text-gray-500 px-1 bg-white">
                            Adresse
                        </span>
                        <input
                            className="block w-full outline-none bg-transparent text-sm text-black font-medium"
                            id="accountInput1-3"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder=""
                        />
                    </div>
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div className="w-full sm:w-1/2 lg:w-full xl:w-1/2 px-4 mb-6">
                    <div className="relative w-full h-14 py-4 px-3 border border-gray-400 focus-within:border-primary rounded-xl">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-medium text-gray-500 px-1 bg-white">
                            Postnummer
                        </span>
                        <input
                            className="block w-full outline-none bg-transparent text-sm text-black font-medium"
                            id="accountInput1-4"
                            type="number"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                            maxLength={4}
                            placeholder=""
                        />
                    </div>
                    {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                </div>
                <div className="w-full sm:w-1/2 lg:w-full xl:w-1/2 px-4 mb-6">
                    <div className="relative w-full h-14 py-4 px-3 border border-gray-400 focus-within:border-primary rounded-xl">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-medium text-gray-500 px-1 bg-white">
                            Poststed
                        </span>
                        <input
                            className="block w-full outline-none bg-transparent text-sm text-black font-medium"
                            id="accountInput1-4"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder=""
                        />
                    </div>
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div className="w-full sm:w-1/2 lg:w-full xl:w-1/2 px-4 mb-6">
                    <div className="relative w-full h-14 py-4 px-3 border border-gray-400 focus-within:border-primary rounded-xl">
                        <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-medium text-gray-500 px-1 bg-white">
                            Land
                        </span>
                        <input
                            className="block w-full outline-none bg-transparent text-sm text-black font-medium"
                            id="accountInput1-4"
                            value={userDetail?.country}
                            type="text"
                            disabled
                            placeholder=""
                        />
                    </div>
                </div>
                <div className="w-full px-4 mb-6">
                    <button disabled={loading} type="submit" className={`inline-block h-14 py-4 px-12 text-center text-white font-bold leading-6 rounded-full transition duration-200
                        ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-primary hover:bg-secondary"
                        }`}>
                        {loading ? "Oppdaterer..." : "Lagre endringer"}
                    </button>
                </div>
            </div>
        </form>
    );
}
