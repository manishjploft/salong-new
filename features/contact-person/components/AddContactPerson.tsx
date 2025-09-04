"use client";
import { useState } from 'react';
import { IoIosSave } from 'react-icons/io';
import { TiCancel } from 'react-icons/ti';

export interface ContactPerson {
  name: string;
  email: string;
  phoneNumber: string;
}

const AddContactPerson = ({
  handleAdd,
}: {
  handleAdd: (values: ContactPerson) => void;
}) => {
  const [isAdd, setIsAdd] = useState(false);
  const [values, setValues] = useState<ContactPerson>({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleChangeValues = (key: string, value: any) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsAdd(false);
    handleAdd(values);
  };

  if (!isAdd) {
    return (
      <button
        onClick={() => setIsAdd(true)}
        type="button"
        className="w-auto p-2 relative cursor-pointer"
      >
        <div className="inline-flex flex-wrap items-center py-2.5 text-sm font-medium text-gray-500 bg-white hover:text-black duration-200 ease-in border-gray-500 rounded">
          Endre kontaktperson
        </div>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col w-full rounded-md pt-4"
    >
      <div className="p-4">
        <div className="relative w-full h-14 py-4 px-3 mb-10 border border-gray-400 focus-within:border-TextHighlight rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold bg-white text-gray-400 px-1">
            Navn
          </span>
          <input
            className="block w-full outline-none bg-transparent text-sm text-gray-400 font-medium"
            type="text"
            name="navn"
            value={values.name}
            onChange={(e) => handleChangeValues("name", e.target.value)}
          />
        </div>

        <div className="relative w-full h-14 py-4 px-3 mb-10 border border-gray-400 focus-within:border-TextHighlight rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold bg-white text-gray-400 px-1">
            Epost adresse
          </span>
          <input
            className="block w-full outline-none bg-transparent text-sm text-gray-400 font-medium"
            type="text"
            name="email"
            value={values.email}
            onChange={(e) => handleChangeValues("email", e.target.value)}
          />
        </div>
        <div className="relative w-full h-14 py-4 px-3 mb-10 border border-gray-400 focus-within:border-TextHighlight rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold bg-white text-gray-400 px-1">
            Telefonnummer
          </span>
          <input
            className="block w-full outline-none bg-transparent text-sm text-gray-400 font-medium"
            type="text"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={(e) => handleChangeValues("phoneNumber", e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-full justify-end">
        {/* Onclick handle the delete function of the address */}

        <button className="flex text-black cursor-pointer p-4 border hover:bg-gray-100 duration-300 ease-in border-gray-400 rounded-md m-2">
          <IoIosSave size={20} /> <p>LAGRE</p>
        </button>
        <button
          onClick={() => setIsAdd(false)}
          type="button"
          className="flex text-black cursor-pointer p-4 border hover:bg-gray-100 duration-300 ease-in border-gray-400 rounded-md m-2"
        >
          <TiCancel size={20} /> <p>AVBRYT</p>
        </button>
      </div>
    </form>
  );
};

export default AddContactPerson;
