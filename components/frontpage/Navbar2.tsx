import React from "react";

const Navbar2 = () => {
  return (
    <>
      <nav className="relative w-full bg-white py-3 shadow-lg">
        <div className="container2 mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="#" className="inline-block mr-10">
                <img className="h-18" src="/assets/logo.svg" alt="alt" />
              </a>
              <ul className="hidden lg:flex items-center gap-10">
                <li>
                  <a
                    href="#"
                    className="text-black text-sm font-medium hover:text-opacity-80 transition duration-200"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black text-sm font-medium hover:text-opacity-80 transition duration-200"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black text-sm font-medium hover:text-opacity-80 transition duration-200"
                  >
                    Product
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-black text-sm font-medium hover:text-opacity-80 transition duration-200"
                  >
                    Career
                  </a>
                </li>
              </ul>
            </div>
            <div className="hidden lg:flex gap-6">
              <div className="border border-gray-200 rounded-full py-3 px-4 flex items-center gap-2 focus-within:ring focus-within:ring-gray-100 transition duration-200">
                <a href="#" className="inline-block h-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M10.875 18.75C15.2242 18.75 18.75 15.2242 18.75 10.875C18.75 6.52576 15.2242 3 10.875 3C6.52576 3 3 6.52576 3 10.875C3 15.2242 6.52576 18.75 10.875 18.75Z"
                      stroke="black"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.4438 16.4438L21.0001 21.0001"
                      stroke="black"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <input
                  type="text"
                  className="flex-1 outline-none"
                  placeholder="Søk i hele butikken..."
                />
              </div>
              <a
                href="#"
                className="rounded-full bg-white border border-gray-200 p-3 flex items-center justify-between h-12 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19 7H16V6C16 4.93913 15.5786 3.92172 14.8284 3.17157C14.0783 2.42143 13.0609 2 12 2C10.9391 2 9.92172 2.42143 9.17157 3.17157C8.42143 3.92172 8 4.93913 8 6V7H5C4.73478 7 4.48043 7.10536 4.29289 7.29289C4.10536 7.48043 4 7.73478 4 8V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V8C20 7.73478 19.8946 7.48043 19.7071 7.29289C19.5196 7.10536 19.2652 7 19 7ZM10 6C10 5.46957 10.2107 4.96086 10.5858 4.58579C10.9609 4.21071 11.4696 4 12 4C12.5304 4 13.0391 4.21071 13.4142 4.58579C13.7893 4.96086 14 5.46957 14 6V7H10V6ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V9H8V10C8 10.2652 8.10536 10.5196 8.29289 10.7071C8.48043 10.8946 8.73478 11 9 11C9.26522 11 9.51957 10.8946 9.70711 10.7071C9.89464 10.5196 10 10.2652 10 10V9H14V10C14 10.2652 14.1054 10.5196 14.2929 10.7071C14.4804 10.8946 14.7348 11 15 11C15.2652 11 15.5196 10.8946 15.7071 10.7071C15.8946 10.5196 16 10.2652 16 10V9H18V19Z"
                    fill="black"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="rounded-full bg-gray-900 p-3 flex items-center justify-between h-12 hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15.7105 12.7101C16.6909 11.9388 17.4065 10.881 17.7577 9.68407C18.109 8.48709 18.0784 7.21039 17.6703 6.03159C17.2621 4.85279 16.4967 3.83052 15.4806 3.10698C14.4644 2.38344 13.2479 1.99463 12.0005 1.99463C10.753 1.99463 9.5366 2.38344 8.52041 3.10698C7.50423 3.83052 6.73883 4.85279 6.3307 6.03159C5.92257 7.21039 5.892 8.48709 6.24325 9.68407C6.59449 10.881 7.31009 11.9388 8.29048 12.7101C6.61056 13.3832 5.14477 14.4995 4.04938 15.94C2.95398 17.3806 2.27005 19.0914 2.07048 20.8901C2.05604 21.0214 2.0676 21.1543 2.10451 21.2812C2.14142 21.408 2.20295 21.5264 2.2856 21.6294C2.4525 21.8376 2.69527 21.971 2.96049 22.0001C3.2257 22.0293 3.49164 21.9519 3.69981 21.785C3.90798 21.6181 4.04131 21.3753 4.07049 21.1101C4.29007 19.1553 5.22217 17.3499 6.6887 16.0389C8.15524 14.7279 10.0534 14.0032 12.0205 14.0032C13.9876 14.0032 15.8857 14.7279 17.3523 16.0389C18.8188 17.3499 19.7509 19.1553 19.9705 21.1101C19.9977 21.3558 20.1149 21.5828 20.2996 21.7471C20.4843 21.9115 20.7233 22.0016 20.9705 22.0001H21.0805C21.3426 21.97 21.5822 21.8374 21.747 21.6314C21.9119 21.4253 21.9886 21.1625 21.9605 20.9001C21.76 19.0963 21.0724 17.3811 19.9713 15.9383C18.8703 14.4955 17.3974 13.3796 15.7105 12.7101ZM12.0005 12.0001C11.2094 12.0001 10.436 11.7655 9.7782 11.326C9.12041 10.8865 8.60772 10.2618 8.30497 9.53086C8.00222 8.79995 7.923 7.99569 8.07734 7.21976C8.23168 6.44384 8.61265 5.73111 9.17206 5.1717C9.73147 4.61229 10.4442 4.23132 11.2201 4.07698C11.996 3.92264 12.8003 4.00186 13.5312 4.30461C14.2621 4.60736 14.8868 5.12005 15.3264 5.77784C15.7659 6.43564 16.0005 7.209 16.0005 8.00012C16.0005 9.06099 15.5791 10.0784 14.8289 10.8286C14.0788 11.5787 13.0614 12.0001 12.0005 12.0001Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
            <button className="lg:hidden">
              <svg
                className="navbar-burger text-black"
                width={51}
                height={51}
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width={56} height={56} rx={28} fill="currentColor" />
                <path
                  d="M37 32H19M37 24H19"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div className="navbar-menu hidden fixed top-0 left-0 bottom-0 w-5/6 max-w-xs z-50">
        <div className="navbar-menu hidden fixed inset-0 bg-black opacity-20" />
        <nav className="relative p-8 w-full h-full bg-white overflow-y-auto">
          <div className="flex items-center justify-between">
            <a href="#" className="inline-block">
              <img className="h-18" src="/assets/logo.svg" alt="alt" />
            </a>
            <button>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6L18 18"
                  stroke="#111827"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col gap-12 py-12">
            <li>
              <a href="#" className="text-sm font-medium">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-medium">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-medium">
                Product
              </a>
            </li>
            <li>
              <a href="#" className="text-sm font-medium">
                Career
              </a>
            </li>
          </ul>
          <div className="flex flex-col gap-10">
            <div className="border border-gray-200 rounded-full py-3 px-4 flex items-center gap-2 w-full focus-within:ring focus-within:ring-gray-100 transition duration-200">
              <a href="#" className="inline-block h-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10.875 18.75C15.2242 18.75 18.75 15.2242 18.75 10.875C18.75 6.52576 15.2242 3 10.875 3C6.52576 3 3 6.52576 3 10.875C3 15.2242 6.52576 18.75 10.875 18.75Z"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.4438 16.4438L21.0001 21.0001"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <input
                type="text"
                className="flex-1 outline-none"
                placeholder="Search Product"
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#"
                className="rounded-full bg-white border border-gray-200 p-3 flex items-center justify-between h-12 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19 7H16V6C16 4.93913 15.5786 3.92172 14.8284 3.17157C14.0783 2.42143 13.0609 2 12 2C10.9391 2 9.92172 2.42143 9.17157 3.17157C8.42143 3.92172 8 4.93913 8 6V7H5C4.73478 7 4.48043 7.10536 4.29289 7.29289C4.10536 7.48043 4 7.73478 4 8V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V8C20 7.73478 19.8946 7.48043 19.7071 7.29289C19.5196 7.10536 19.2652 7 19 7ZM10 6C10 5.46957 10.2107 4.96086 10.5858 4.58579C10.9609 4.21071 11.4696 4 12 4C12.5304 4 13.0391 4.21071 13.4142 4.58579C13.7893 4.96086 14 5.46957 14 6V7H10V6ZM18 19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V9H8V10C8 10.2652 8.10536 10.5196 8.29289 10.7071C8.48043 10.8946 8.73478 11 9 11C9.26522 11 9.51957 10.8946 9.70711 10.7071C9.89464 10.5196 10 10.2652 10 10V9H14V10C14 10.2652 14.1054 10.5196 14.2929 10.7071C14.4804 10.8946 14.7348 11 15 11C15.2652 11 15.5196 10.8946 15.7071 10.7071C15.8946 10.5196 16 10.2652 16 10V9H18V19Z"
                    fill="black"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="rounded-full bg-gray-900 p-3 flex items-center justify-between h-12 hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15.7105 12.7101C16.6909 11.9388 17.4065 10.881 17.7577 9.68407C18.109 8.48709 18.0784 7.21039 17.6703 6.03159C17.2621 4.85279 16.4967 3.83052 15.4806 3.10698C14.4644 2.38344 13.2479 1.99463 12.0005 1.99463C10.753 1.99463 9.5366 2.38344 8.52041 3.10698C7.50423 3.83052 6.73883 4.85279 6.3307 6.03159C5.92257 7.21039 5.892 8.48709 6.24325 9.68407C6.59449 10.881 7.31009 11.9388 8.29048 12.7101C6.61056 13.3832 5.14477 14.4995 4.04938 15.94C2.95398 17.3806 2.27005 19.0914 2.07048 20.8901C2.05604 21.0214 2.0676 21.1543 2.10451 21.2812C2.14142 21.408 2.20295 21.5264 2.2856 21.6294C2.4525 21.8376 2.69527 21.971 2.96049 22.0001C3.2257 22.0293 3.49164 21.9519 3.69981 21.785C3.90798 21.6181 4.04131 21.3753 4.07049 21.1101C4.29007 19.1553 5.22217 17.3499 6.6887 16.0389C8.15524 14.7279 10.0534 14.0032 12.0205 14.0032C13.9876 14.0032 15.8857 14.7279 17.3523 16.0389C18.8188 17.3499 19.7509 19.1553 19.9705 21.1101C19.9977 21.3558 20.1149 21.5828 20.2996 21.7471C20.4843 21.9115 20.7233 22.0016 20.9705 22.0001H21.0805C21.3426 21.97 21.5822 21.8374 21.747 21.6314C21.9119 21.4253 21.9886 21.1625 21.9605 20.9001C21.76 19.0963 21.0724 17.3811 19.9713 15.9383C18.8703 14.4955 17.3974 13.3796 15.7105 12.7101ZM12.0005 12.0001C11.2094 12.0001 10.436 11.7655 9.7782 11.326C9.12041 10.8865 8.60772 10.2618 8.30497 9.53086C8.00222 8.79995 7.923 7.99569 8.07734 7.21976C8.23168 6.44384 8.61265 5.73111 9.17206 5.1717C9.73147 4.61229 10.4442 4.23132 11.2201 4.07698C11.996 3.92264 12.8003 4.00186 13.5312 4.30461C14.2621 4.60736 14.8868 5.12005 15.3264 5.77784C15.7659 6.43564 16.0005 7.209 16.0005 8.00012C16.0005 9.06099 15.5791 10.0784 14.8289 10.8286C14.0788 11.5787 13.0614 12.0001 12.0005 12.0001Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar2;
