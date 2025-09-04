"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [menuData, setMenuData] = useState({
    brands: [],
    categories: [],
  });

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "navmenu"
        );
        setMenuData(response.data.data); // Assuming `response.data` is an array of category items
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <>
      <section className="pt-20 bg-secondary border-t-2 border-gray-300 w-full pb-32">
        <div className="container2 mx-auto px-4">
          <div className="pb-20 border-b border-primary mb-4">
            <div className="flex flex-wrap -m-4">
              <div className="w-full lg:w-1/2 p-4">
                <a href="#" className="inline-block mb-6">
                  <Image
                    className="h-10"
                    src="/assets/logo.svg"
                    alt="Salongpartner logo"
                    height={50}
                    width={240}
                  />
                </a>
                <p className="text-primary pl-6">Din partner innen velvære</p>
              </div>
              <div className="w-full sm:w-1/3 lg:w-1/6 p-4">
                <p className="font-semibold text-primary tracking-wide mb-6">
                  Utforsk
                </p>
                <ul className="flex flex-col gap-4">
                  {menuData?.categories.slice(0, 3).map((item: any, i) => {
                    return (
                      <li key={i}>
                        <Link
                          href={`/kategori/${item.slug}`}
                          className="text-gray-900 tracking-wide font-light hover:text-primary transition duration-200"
                        >
                          {item.category_name}
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <Link
                      href="/kategori"
                      className="text-gray-900 tracking-wide font-light hover:text-primary transition duration-200"
                    >
                      Annet
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full sm:w-1/3 lg:w-1/6 p-4">
                <p className="font-semibold text-primary tracking-wide mb-6">
                  Mer
                </p>
                <ul className="flex flex-col gap-4">
                  <li>
                    <Link
                      href="/alle-produkter"
                      className="text-gray-900 tracking-wide font-light hover:text-primary transition duration-200"
                    >
                      Alle produkter
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/alle-produkter"
                      className="text-gray-900 tracking-wide font-light hover:text-primary transition duration-200"
                    >
                      Kategorier
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/alle-produkter"
                      className="text-gray-900 tracking-wide font-light hover:text-primary transition duration-200"
                    >
                      Merker
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/materiell"
                      className="text-gray-900 tracking-wide font-light hover:text-primary transition duration-200"
                    >
                      Materiell
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-full sm:w-1/3 lg:w-1/6 p-4">
                <p className="font-semibold text-primary tracking-wide mb-6">
                  Salongpartner
                </p>
                <ul className="flex flex-col gap-4">
                  <li>
                    <Link
                      href="/kontakt"
                      className="text-gray-900 tracking-wide font-light hover:text-primary transition duration-200"
                    >
                      Kundesupport
                    </Link>
                  </li>
                  {/*
                  <li>
                    <Link
                      href="#"
                      className="text-gray-900 tracking-wide font-light hover:text-primary transition duration-200"
                    >
                      Spor ordre
                    </Link>
                  </li>
                  */}

                  <li>
                    <Link
                      href="/minside"
                      className="text-black tracking-wide font-light hover:text-primary transition duration-200"
                    >
                      Min side
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="w-full md:w-1/3 p-4">
              <p className="text-primary">
                <span className="text-gray-500">Vilkår</span> |{" "}
                <span className="text-gray-500">Personvern</span> | ©{" "}
                {new Date().getFullYear()} Salongpartner AS.
              </p>
            </div>
            <div className="w-full md:w-1/3 p-4"></div>
            <div className="w-full md:w-1/3 p-4">
              <div className="flex md:justify-end flex-wrap gap-6">
                <a
                  href="https://www.facebook.com/profile.php?id=100063963578458"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-500 transition duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M17.34 5.46C17.1027 5.46 16.8707 5.53038 16.6733 5.66224C16.476 5.79409 16.3222 5.98151 16.2313 6.20078C16.1405 6.42005 16.1168 6.66133 16.1631 6.89411C16.2094 7.12689 16.3236 7.34071 16.4915 7.50853C16.6593 7.67635 16.8731 7.79064 17.1059 7.83694C17.3387 7.88324 17.5799 7.85948 17.7992 7.76866C18.0185 7.67783 18.2059 7.52402 18.3378 7.32668C18.4696 7.12935 18.54 6.89734 18.54 6.66C18.54 6.34174 18.4136 6.03652 18.1885 5.81147C17.9635 5.58643 17.6583 5.46 17.34 5.46ZM21.94 7.88C21.9206 7.0503 21.7652 6.2294 21.48 5.45C21.2257 4.78313 20.83 4.17928 20.32 3.68C19.8248 3.16743 19.2196 2.77418 18.55 2.53C17.7727 2.23616 16.9508 2.07721 16.12 2.06C15.06 2 14.72 2 12 2C9.28 2 8.94 2 7.88 2.06C7.04915 2.07721 6.22734 2.23616 5.45 2.53C4.78168 2.77665 4.17693 3.16956 3.68 3.68C3.16743 4.17518 2.77418 4.78044 2.53 5.45C2.23616 6.22734 2.07721 7.04915 2.06 7.88C2 8.94 2 9.28 2 12C2 14.72 2 15.06 2.06 16.12C2.07721 16.9508 2.23616 17.7727 2.53 18.55C2.77418 19.2196 3.16743 19.8248 3.68 20.32C4.17693 20.8304 4.78168 21.2234 5.45 21.47C6.22734 21.7638 7.04915 21.9228 7.88 21.94C8.94 22 9.28 22 12 22C14.72 22 15.06 22 16.12 21.94C16.9508 21.9228 17.7727 21.7638 18.55 21.47C19.2196 21.2258 19.8248 20.8326 20.32 20.32C20.8322 19.8226 21.2283 19.2182 21.48 18.55C21.7652 17.7706 21.9206 16.9497 21.94 16.12C21.94 15.06 22 14.72 22 12C22 9.28 22 8.94 21.94 7.88ZM20.14 16C20.1327 16.6348 20.0178 17.2637 19.8 17.86C19.6403 18.2952 19.3839 18.6884 19.05 19.01C18.7256 19.3405 18.3332 19.5964 17.9 19.76C17.3037 19.9778 16.6748 20.0927 16.04 20.1C15.04 20.15 14.67 20.16 12.04 20.16C9.41 20.16 9.04 20.16 8.04 20.1C7.38089 20.1123 6.72459 20.0109 6.1 19.8C5.68578 19.6281 5.31136 19.3728 5 19.05C4.66809 18.7287 4.41484 18.3352 4.26 17.9C4.01586 17.2952 3.88044 16.6519 3.86 16C3.86 15 3.8 14.63 3.8 12C3.8 9.37 3.8 9 3.86 8C3.86448 7.35106 3.98295 6.70795 4.21 6.1C4.38605 5.67791 4.65627 5.30166 5 5C5.30381 4.65617 5.67929 4.3831 6.1 4.2C6.70955 3.98004 7.352 3.86508 8 3.86C9 3.86 9.37 3.8 12 3.8C14.63 3.8 15 3.8 16 3.86C16.6348 3.86728 17.2637 3.98225 17.86 4.2C18.3144 4.36865 18.7223 4.64285 19.05 5C19.3777 5.30718 19.6338 5.68273 19.8 6.1C20.0223 6.70893 20.1373 7.35178 20.14 8C20.19 9 20.2 9.37 20.2 12C20.2 14.63 20.19 15 20.14 16ZM12 6.87C10.9858 6.87198 9.99496 7.17453 9.15265 7.73942C8.31035 8.30431 7.65438 9.1062 7.26763 10.0438C6.88089 10.9813 6.78072 12.0125 6.97979 13.0069C7.17886 14.0014 7.66824 14.9145 8.38608 15.631C9.10392 16.3474 10.018 16.835 11.0129 17.0321C12.0077 17.2293 13.0387 17.1271 13.9755 16.7385C14.9123 16.35 15.7129 15.6924 16.2761 14.849C16.8394 14.0056 17.14 13.0142 17.14 12C17.1413 11.3251 17.0092 10.6566 16.7512 10.033C16.4933 9.40931 16.1146 8.84281 15.6369 8.36605C15.1592 7.88929 14.5919 7.51168 13.9678 7.25493C13.3436 6.99818 12.6749 6.86736 12 6.87ZM12 15.33C11.3414 15.33 10.6976 15.1347 10.15 14.7688C9.60234 14.4029 9.17552 13.8828 8.92348 13.2743C8.67144 12.6659 8.6055 11.9963 8.73398 11.3503C8.86247 10.7044 9.17963 10.111 9.64533 9.64533C10.111 9.17963 10.7044 8.86247 11.3503 8.73398C11.9963 8.6055 12.6659 8.67144 13.2743 8.92348C13.8828 9.17552 14.4029 9.60234 14.7688 10.15C15.1347 10.6976 15.33 11.3414 15.33 12C15.33 12.4373 15.2439 12.8703 15.0765 13.2743C14.9092 13.6784 14.6639 14.0454 14.3547 14.3547C14.0454 14.6639 13.6784 14.9092 13.2743 15.0765C12.8703 15.2439 12.4373 15.33 12 15.33Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/salongpartner.no/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-500 transition duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M18.83 9.44C18.7383 9.30429 18.6146 9.19319 18.4699 9.11647C18.3252 9.03975 18.1638 8.99975 18 9H15V7H17.2C17.4652 7 17.7196 6.89464 17.9071 6.70711C18.0946 6.51957 18.2 6.26522 18.2 6V2C18.2 1.73478 18.0946 1.48043 17.9071 1.29289C17.7196 1.10536 17.4652 1 17.2 1H14C12.4617 1 10.9865 1.61107 9.89878 2.69878C8.81107 3.78649 8.2 5.26174 8.2 6.8V9H6C5.73478 9 5.48043 9.10536 5.29289 9.29289C5.10536 9.48043 5 9.73478 5 10V14C5 14.2652 5.10536 14.5196 5.29289 14.7071C5.48043 14.8946 5.73478 15 6 15H8.2V22C8.2 22.2652 8.30536 22.5196 8.49289 22.7071C8.68043 22.8946 8.93478 23 9.2 23H14C14.2652 23 14.5196 22.8946 14.7071 22.7071C14.8946 22.5196 15 22.2652 15 22V15H16.4C16.6003 15.0002 16.796 14.9402 16.9618 14.8279C17.1276 14.7156 17.2559 14.5561 17.33 14.37L18.93 10.37C18.9904 10.2186 19.0129 10.0547 18.9954 9.89259C18.978 9.7305 18.9212 9.57512 18.83 9.44ZM15.72 13H14C13.7348 13 13.4804 13.1054 13.2929 13.2929C13.1054 13.4804 13 13.7348 13 14V21H10.2V14C10.2 13.7348 10.0946 13.4804 9.90711 13.2929C9.71957 13.1054 9.46522 13 9.2 13H7V11H9.2C9.46522 11 9.71957 10.8946 9.90711 10.7071C10.0946 10.5196 10.2 10.2652 10.2 10V6.8C10.2026 5.79299 10.6038 4.82798 11.3159 4.11591C12.028 3.40384 12.993 3.00264 14 3H16.2V5H15.4C15.0614 4.95067 14.7163 4.97137 14.3861 5.06082C14.0558 5.15026 13.7474 5.30655 13.48 5.52C13.3177 5.6899 13.1915 5.8909 13.109 6.11089C13.0265 6.33087 12.9894 6.56529 13 6.8V10C13 10.2652 13.1054 10.5196 13.2929 10.7071C13.4804 10.8946 13.7348 11 14 11H16.52L15.72 13Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
