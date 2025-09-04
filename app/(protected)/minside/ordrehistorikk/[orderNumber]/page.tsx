import OrderHistoryItem from "@/components/mypage/OrderHistoryItem";
import ProfileLinks from "@/components/mypage/Sidebar";
import React from "react";

const Orderhistory = () => {
  const activeLink = "/minside/ordrehistorikk";
  return (
    <>
      <section className="py-8 w-full bg-background">
        <div className="container2 px-4 mx-auto">
          <div className="w-full">
            <h3 className="text-2xl lg:text-3xl font-light text-black mb-4">
              Min side - Ordrehistorikk
            </h3>
          </div>
          <div className="flex flex-col lg:flex-row -mx-3">
            <div className="w-full lg:w-1/3 px-3 mb-4 lg:mb-0">
              <div className="mb-4">
                <ProfileLinks activeLink={activeLink} />
              </div>
            </div>
            <section className=" w-full lg:w-2/3 px-4">
              <div className="max-w-5xl p-4 lg:p-8 bg-white rounded-xl mx-auto">
                <OrderHistoryItem />
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default Orderhistory;
