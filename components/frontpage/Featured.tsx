import Link from "next/link";
import React, { useEffect } from "react";

const Featured = () => {
  return (
    <>
      <section className="w-full">
        <div className="p-2 xs:px-4 lg:px-10 container2 py-20">
          <div className="flex justify-between items-end flex-wrap gap-4 mb-14">
            <h3 className="font-light text-5xl lg:text-6xl">
              Anbefalt for deg
            </h3>
            <p className="text-gray-500 font-light text-lg max-w-none lg:max-w-sm text-end">
              De beste prisene på et bredt utvalg merker får du hos
              Salongpartner.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="w-full lg:w-1/3 p-4">
              <div className="group">
                <div
                  className="relative overflow-hidden rounded-2xl"
                  style={{ height: 750 }}
                >
                  <img
                    className="rounded-2xl object-cover w-full h-full transform group-hover:scale-105 transition duration-200"
                    src="/assets/content/evagarden-makeup.jpeg"
                    //src="/assets/content/perfect-skin.jpeg"
                    alt="EVAGARDEN Makeup"
                  />
                  <div className="absolute hidden top-6 left-6">
                    <h2 className="font-heading text-7xl text-white uppercase max-w-sm">
                      Evagarden Makeup
                    </h2>
                  </div>
                  <div className="absolute bottom-6 right-6">
                    <Link
                      href="/merke/evagarden"
                      className="bg-primary rounded-full hover:bg-secondary focus:ring-4 focus:ring-gray-200 text-white text-sm font-semibold h-16 w-16 flex items-center justify-center transition duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M17.92 6.62C17.8185 6.37565 17.6243 6.18147 17.38 6.08C17.2598 6.02876 17.1307 6.00158 17 6H7C6.73478 6 6.48043 6.10536 6.29289 6.29289C6.10536 6.48043 6 6.73478 6 7C6 7.26522 6.10536 7.51957 6.29289 7.70711C6.48043 7.89464 6.73478 8 7 8H14.59L6.29 16.29C6.19627 16.383 6.12188 16.4936 6.07111 16.6154C6.02034 16.7373 5.9942 16.868 5.9942 17C5.9942 17.132 6.02034 17.2627 6.07111 17.3846C6.12188 17.5064 6.19627 17.617 6.29 17.71C6.38296 17.8037 6.49356 17.8781 6.61542 17.9289C6.73728 17.9797 6.86799 18.0058 7 18.0058C7.13201 18.0058 7.26272 17.9797 7.38458 17.9289C7.50644 17.8781 7.61704 17.8037 7.71 17.71L16 9.41V17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18C17.2652 18 17.5196 17.8946 17.7071 17.7071C17.8946 17.5196 18 17.2652 18 17V7C17.9984 6.86932 17.9712 6.74022 17.92 6.62Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/3 p-4">
              <div className="group">
                <div
                  className="relative overflow-hidden rounded-2xl mb-4"
                  style={{ height: 360 }}
                >
                  <img
                    className="rounded-2xl object-cover w-full h-full transform group-hover:scale-105 transition duration-200"
                    src="/assets/content/fabbrows3.jpg"
                    alt="Fab Brows"
                  />
                  <div className="absolute hidden top-6 left-6">
                    <h2 className="font-heading text-7xl text-white uppercase max-w-sm">
                      Fab Brows
                    </h2>
                  </div>
                  <div className="absolute bottom-6 right-6">
                    <Link
                      href="/merke/fab-brows"
                      className="bg-primary rounded-full hover:bg-secondary focus:ring-4 focus:ring-gray-200 text-white text-sm font-semibold h-16 w-16 flex items-center justify-center transition duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M17.92 6.62C17.8185 6.37565 17.6243 6.18147 17.38 6.08C17.2598 6.02876 17.1307 6.00158 17 6H7C6.73478 6 6.48043 6.10536 6.29289 6.29289C6.10536 6.48043 6 6.73478 6 7C6 7.26522 6.10536 7.51957 6.29289 7.70711C6.48043 7.89464 6.73478 8 7 8H14.59L6.29 16.29C6.19627 16.383 6.12188 16.4936 6.07111 16.6154C6.02034 16.7373 5.9942 16.868 5.9942 17C5.9942 17.132 6.02034 17.2627 6.07111 17.3846C6.12188 17.5064 6.19627 17.617 6.29 17.71C6.38296 17.8037 6.49356 17.8781 6.61542 17.9289C6.73728 17.9797 6.86799 18.0058 7 18.0058C7.13201 18.0058 7.26272 17.9797 7.38458 17.9289C7.50644 17.8781 7.61704 17.8037 7.71 17.71L16 9.41V17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18C17.2652 18 17.5196 17.8946 17.7071 17.7071C17.8946 17.5196 18 17.2652 18 17V7C17.9984 6.86932 17.9712 6.74022 17.92 6.62Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -m-4">
                <div className="w-full md:w-1/2 p-4">
                  <div className="group">
                    <div
                      className="relative overflow-hidden rounded-2xl mb-4"
                      style={{ height: 360 }}
                    >
                      <img
                        className="rounded-2xl object-cover w-full h-full transform group-hover:scale-105 transition duration-200"
                        src="/assets/content/dibi-milano-face-perfection.jpg"
                        alt="DIBI Milano - Face Perfection"
                      />
                      <div className="absolute hidden top-6 left-6">
                        <h2 className="font-heading text-7xl text-white uppercase max-w-sm">
                          DIBI Milano - Face Perfection
                        </h2>
                      </div>
                      <div className="absolute bottom-6 right-6">
                        <a
                          href="#"
                          className="bg-primary rounded-full hover:bg-secondary focus:ring-4 focus:ring-gray-200 text-white text-sm font-semibold h-16 w-16 flex items-center justify-center transition duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M17.92 6.62C17.8185 6.37565 17.6243 6.18147 17.38 6.08C17.2598 6.02876 17.1307 6.00158 17 6H7C6.73478 6 6.48043 6.10536 6.29289 6.29289C6.10536 6.48043 6 6.73478 6 7C6 7.26522 6.10536 7.51957 6.29289 7.70711C6.48043 7.89464 6.73478 8 7 8H14.59L6.29 16.29C6.19627 16.383 6.12188 16.4936 6.07111 16.6154C6.02034 16.7373 5.9942 16.868 5.9942 17C5.9942 17.132 6.02034 17.2627 6.07111 17.3846C6.12188 17.5064 6.19627 17.617 6.29 17.71C6.38296 17.8037 6.49356 17.8781 6.61542 17.9289C6.73728 17.9797 6.86799 18.0058 7 18.0058C7.13201 18.0058 7.26272 17.9797 7.38458 17.9289C7.50644 17.8781 7.61704 17.8037 7.71 17.71L16 9.41V17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18C17.2652 18 17.5196 17.8946 17.7071 17.7071C17.8946 17.5196 18 17.2652 18 17V7C17.9984 6.86932 17.9712 6.74022 17.92 6.62Z"
                              fill="white"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-4">
                  <div className="group">
                    <div
                      className="relative overflow-hidden rounded-2xl mb-4"
                      style={{ height: 360 }}
                    >
                      <img
                        className="rounded-2xl object-cover w-full h-full transform group-hover:scale-105 transition duration-200"
                        src="/assets/content/lash-bomb.jpg"
                        alt="LASH BOMB"
                      />
                      <div className="absolute hidden top-6 left-6">
                        <h2 className="font-heading text-7xl text-white uppercase max-w-sm">
                          LASH BOMB
                        </h2>
                      </div>
                      <div className="absolute bottom-6 right-6">
                        <a
                          href="#"
                          className="bg-primary rounded-full hover:bg-secondary focus:ring-4 focus:ring-gray-200 text-white text-sm font-semibold h-16 w-16 flex items-center justify-center transition duration-200"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M17.92 6.62C17.8185 6.37565 17.6243 6.18147 17.38 6.08C17.2598 6.02876 17.1307 6.00158 17 6H7C6.73478 6 6.48043 6.10536 6.29289 6.29289C6.10536 6.48043 6 6.73478 6 7C6 7.26522 6.10536 7.51957 6.29289 7.70711C6.48043 7.89464 6.73478 8 7 8H14.59L6.29 16.29C6.19627 16.383 6.12188 16.4936 6.07111 16.6154C6.02034 16.7373 5.9942 16.868 5.9942 17C5.9942 17.132 6.02034 17.2627 6.07111 17.3846C6.12188 17.5064 6.19627 17.617 6.29 17.71C6.38296 17.8037 6.49356 17.8781 6.61542 17.9289C6.73728 17.9797 6.86799 18.0058 7 18.0058C7.13201 18.0058 7.26272 17.9797 7.38458 17.9289C7.50644 17.8781 7.61704 17.8037 7.71 17.71L16 9.41V17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18C17.2652 18 17.5196 17.8946 17.7071 17.7071C17.8946 17.5196 18 17.2652 18 17V7C17.9984 6.86932 17.9712 6.74022 17.92 6.62Z"
                              fill="white"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Featured;
