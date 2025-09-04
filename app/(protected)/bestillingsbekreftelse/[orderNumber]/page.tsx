"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa6";
import { useRouter, useParams } from "next/navigation";
import { fetchOrderDetail } from "@/features/order/order.action";

const Bestillingsbekreftelse = () => {
  const params = useParams();
  const orderNumber: any = params?.orderNumber;
  const [orderDetail, setOrderDetail] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadOrderItem();
  }, []);

  const loadOrderItem = async () => {
    try {
      const fetchedDetail = await fetchOrderDetail(orderNumber);
      if (fetchedDetail.status === "404" || fetchedDetail.status === 404) {
        router.push("/404");
        return;
      }

      setOrderDetail(fetchedDetail.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: any) => {
    return new Intl.NumberFormat("nb-NO").format(num); // 'nb-NO' for Norwegian locale
  };

  return (
    <>
      <section>
        <div className="flex flex-wrap divide-x divide-gray-200">
          <div className="w-full lg:flex-1 p-8">
            <div className="flex flex-col justify-center px-4 text-center h-full">
              <div className="max-w-xl mx-auto">
                <div className="mb-12 text-7xl">🎉</div>
                <span className="mb-5 inline-block text-gray-400">
                  Bestillingen din er mottatt
                </span>
                <h2 className="mb-5 font-heading text-5xl text-">
                  Takk for din bestilling!
                </h2>
                <p className="mb-4 text-gray-400">
                  Vi setter stor pris på at dere velger oss som deres partner.
                  Bestillingen din er nå mottatt, og vi jobber med å klargjøre
                  den så raskt som mulig.
                </p>
                <p className="mb-20 text-gray-700">
                  Tidligere bestillinger finner du på profilen din
                </p>
                <p className="mb-5 text-gray-400 font-medium">
                  Hvordan gikk bestillingen?
                </p>
                <div className="flex flex-wrap justify-center -m-2.5 mb-14">
                  <a
                    href="https://www.google.no/search?q=salongpartner"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="grid grid-cols-5 gap-4">
                      <FaRegStar size={30} />
                      <FaRegStar size={30} />
                      <FaRegStar size={30} />
                      <FaRegStar size={30} />
                      <FaRegStar size={30} />
                    </div>
                  </a>
                </div>
                <Link
                  href="/"
                  className="bg-primary rounded-full hover:bg-primary/75 focus:ring-4 focus:ring-gray-200 text-white text-xs font-semibold px-4 h-9 inline-flex items-center transition duration-200"
                >
                  Tilbake til butikken
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full lg:max-w-md px-12 pt-16 pb-32">
            <div className="">
              <h3 className="mb-24 font-heading text-3xl text-gray-900">
                Bestilling #{orderDetail.order_number}
              </h3>
              <span className="mb-4 inline-block text-xl font-semibold text-neutral-900">
                {orderDetail?.items?.length} varer
              </span>
              <div className="flex flex-wrap justify-between -m-2">
                <div className="w-auto p-2">
                  <span className="text-gray-400">Sum ekslusiv MVA</span>
                </div>
                <div className="w-auto p-2">
                  <span className="font-semibold text-green-900">
                    kr{" "}
                    {formatNumber(
                      parseFloat(orderDetail?.total_amount) -
                        (parseFloat(orderDetail?.shipping_charges) +
                          parseFloat(orderDetail?.pricing?.total_mva || 0))
                    )}
                  </span>
                </div>
              </div>
              {orderDetail?.total_discount_amount > 0 && (
                <div className="flex flex-wrap justify-between -m-2">
                  <div className="w-auto p-2">
                    <span className="text-gray-400">Rabatt</span>
                  </div>
                  <div className="w-auto p-2">
                    <span className="font-semibold text-gray-900 uppercases">
                      - kr{" "}
                      {formatNumber(orderDetail?.total_discount_amount || 0)}
                      ,-
                    </span>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap justify-between -m-2">
                <div className="w-auto p-2">
                  <span className="text-gray-400">MVA</span>
                </div>
                <div className="w-auto p-2">
                  <span className="font-semibold text-green-900">
                    kr {formatNumber(orderDetail?.pricing?.total_mva || 0)},-
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-between -m-2 mb-7">
                <div className="w-auto p-2">
                  <span className="text-gray-400">Frakt</span>
                </div>
                <div className="w-auto p-2">
                  <span className="font-semibold text-gray-900 uppercases">
                    kr {formatNumber(orderDetail?.shipping_charges || 0)},-
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-between -m-2">
                <div className="w-auto p-2">
                  <span className="font-semibold text-neutral-900">
                    Total sum
                  </span>
                </div>
                <div className="w-auto p-2">
                  <span className="font-semibold text-green-900">
                    kr {formatNumber(orderDetail?.total_amount)}
                  </span>
                </div>
              </div>
              <span className="mb-12 inline-block text-xs text-gray-400 font-semibold">
                MVA inkludert
              </span>
              <div className="mb-12 flex flex-wrap justify-between -m-2">
                <div className="w-auto p-2">
                  <span className="text-gray-400">Estimert leveringstid</span>
                </div>
                <div className="w-auto p-2">
                  <span className="font-semibold text-gray-900">3-4 dager</span>
                </div>
              </div>
              <p className="mb-6 font-semibold text-gray-900">Leveres til:</p>
              <div className="mb-11">
                <p className="text-gray-400">
                  {orderDetail?.delivery_address?.address}
                </p>
                <p className="text-gray-400">
                  {orderDetail?.delivery_address?.city}
                </p>
                <br />
                <p className="text-gray-400">
                  Att: {orderDetail?.contact_person?.contact_person_name}
                </p>
                <p className="text-gray-400">
                  +{orderDetail?.contact_person?.contact_person_phone}
                </p>
              </div>
              <p className="mb-4 font-semibold text-gray-900">
                Trenger du assistanse?
              </p>
              <p className="text-gray-400">tv@salongpartner.no</p>
              <p className="text-gray-400">+47 99 04 54 55</p>
            </div>
          </div>
        </div>
      </section>
      {loading && (
        <div className="loaderContainer">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Bestillingsbekreftelse;
