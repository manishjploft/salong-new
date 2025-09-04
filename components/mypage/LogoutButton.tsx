'use client'
import { signOut } from "next-auth/react";
import React, { useState } from "react";


export default function LogoutButton() {
    const [showModal, setShowModal] = useState(false);

    const handleLogout = async () => {
        try {
            signOut(); // Wait for the sign-out process to complete
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <>
            <div onClick={() => setShowModal(true)} className="block cursor-pointer sm:inline-block px-5 py-3 text-sm text-center font-semibold text-primary hover:text-white hover:bg-secondary border border-primary hover:border-secondary rounded transition duration-200">
                Logg ut
            </div>
            {showModal && (
                <div onClick={() => setShowModal(false)} className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Bekreft utlogging
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Er du sikker på at du vil logge ut?
                        </p>
                        <div className="mt-4 flex justify-end space-x-4">
                            {/* <button
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                                onClick={() => setShowModal(false)}
                            >
                                Kansellere
                            </button> */}
                            <button
                                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                                onClick={handleLogout}
                            >
                                Logg ut
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
