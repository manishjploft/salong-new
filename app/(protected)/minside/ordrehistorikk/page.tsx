'use client'
import React, { useEffect, useState } from "react";
import OrderHistory from "@/components/mypage/OrderHistory";
import ProfileLinks from "@/components/mypage/Sidebar";
import { fetchOrders } from "@/features/order/order.action";

const Orderhistory = () => {
  const activeLink = "/minside/ordrehistorikk";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      loadOrderItems();
  }, []);

  const loadOrderItems = async () => {
    try {
      const fetchedOrders = await fetchOrders();

      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

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
                <OrderHistory orders={orders} />
              </div>
            </section>
          </div>
        </div>
      </section>
      {loading && <div className="loaderContainer">
        <div className="loader"></div>
      </div>}
    </>
  );
};

export default Orderhistory;
