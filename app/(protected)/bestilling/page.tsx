"use client";
import React, { useEffect, useState } from "react";
import { fetchCartItems, removeFromCart, updateCartItem } from "@/features/cart/cart.action";
import {
  fetchCustomerGroup,
  fetchUserDetails,
} from "@/features/customer/customer.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addToOrder } from "@/features/order/order.action";
import { toast } from "react-hot-toast";
import {
  calculateProductPrice,
  calculateProductPriceByShowPrice,
  getCustomerGroupDiscount,
} from "@/utils/price.util";
import { fetchSetting } from "@/features/setting/setting.action";
import { useServerAction } from "zsa-react";
import { BiRefresh, BiTrash } from "react-icons/bi";

const Bestilling = () => {
  const session = useSession();
  const router = useRouter();
  const [carts, setCarts] = useState<any[]>([]); // Replace `any` with the actual cart item type if available.
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalMVA, setTotalMVA] = useState(0);
  const [totalShippingCost, setTotalShippingCost] = useState(0);
  const [subTotalAmount, setSubTotalAmount] = useState(0);
  const [totalFinalDicount, setTotalFinalDiscount] = useState(0);
  const [setting, setSetting] = useState<any>({});
  const [customerGroups, setCustomerGroup] = useState([]);
  const [user, setUser] = useState<any>({});
  const [formData, setFormData] = useState({
    organization_number: "",
    company_name: "",
    name: "",
    email: "",
    phone: "",
    street_name: "",
    zip_code: "",
    city: "",
    reference: "",
    comment: "",
  });
  const removeFromCartAction = useServerAction(removeFromCart);
  const updateCartItemAction = useServerAction(updateCartItem);

  useEffect(() => {
    // Dynamically set the title and description
    document.title = "Bestilling"; // Set page title
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Bestilling");
    }
  }, []);

  useEffect(() => {
    const fetchCustomerGroupData = async () => {
      const fetchedCustomertGroup = await fetchCustomerGroup();
      setCustomerGroup(fetchedCustomertGroup);
    };

    fetchCustomerGroupData();
  }, []);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const fetchedUser = await fetchUserDetails();
      setUser(fetchedUser);
      setFormData({
        organization_number: fetchedUser?.customer_number,
        company_name: fetchedUser?.customer_name,
        //THIS DOES NOT WORK RIGHT NOW
        name: fetchedUser?.customer_name,
        email: fetchedUser?.email,
        phone: fetchedUser?.phone,
        street_name: fetchedUser?.address,
        zip_code: fetchedUser?.zip,
        city: fetchedUser?.city,
        reference: "",
        comment: "",
      });
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const loadCartItems = async () => {
    try {
      const fetchedSetting: any = await fetchSetting();
      setSetting(fetchedSetting);

      const fetchedCarts = await fetchCartItems();
      setCarts(fetchedCarts);

      let total: any = 0;
      let subTotal = 0;
      let totalDiscount = 0;
      let totalMVA = 0;

      // Process each cart item
      fetchedCarts.forEach((item: any) => {
        // // Get the discount for the current product based on the customer group
        // const discount = getCustomerGroupDiscount(
        //   customerGroups,
        //   item.product.product_id,
        //   item.product.category_id
        // );

        // // Calculate the product prices based on the special price and discount
        // const {
        //   price,
        //   finalNormalPrice,
        //   finalSpecialPrice,
        //   shouldShowSpecialPrice,
        //   finalDiscount,
        // } = calculateProductPrice({
        //   price: item.product.price_inc_vat,
        //   vatrate: item.product.vatrate_percent,
        //   isVAT: false,
        //   specialPrice: item.product.special_price,
        //   customerGroupDiscount: discount ?? 0,
        // });

        // New

        var shouldShowSpecialPrice: boolean = false; // Initialize with a default value
        var finalNormalPrice: number = 0;
        var finalSpecialPrice: number = 0;
        var price: number = 0;
        var finalPriceInVat: number = 0;

        const productData = item.product;

        if (productData.pricelist.length > 0 && productData.has_pricelist) {
          var {
            discountedPrice,
            discount,
            customer_group_name,
            discountedPriceWithVat,
          } = calculateProductPriceByShowPrice({
            productData,
            customerGroups,
            priceIncVat: productData.price_inc_vat,
            isVAT: false,
          });

          if (customer_group_name === "") {
            var discount: any = getCustomerGroupDiscount(
              customerGroups,
              productData.product_id,
              productData.category_id
            );

            var {
              price,
              finalNormalPrice,
              finalSpecialPrice,
              shouldShowSpecialPrice,
              finalDiscount,
              finalPriceInVat,
            } = calculateProductPrice({
              price: productData.price_inc_vat,
              vatrate: productData.vatrate_percent,
              isVAT: false,
              specialPrice: productData.special_price,
              customerGroupDiscount: discount ?? 0,
            });
          }
        } else {
          var discount: any = getCustomerGroupDiscount(
            customerGroups,
            productData.product_id,
            productData.category_id
          );

          var {
            price,
            finalNormalPrice,
            finalSpecialPrice,
            shouldShowSpecialPrice,
            finalDiscount,
            finalPriceInVat,
          } = calculateProductPrice({
            price: productData.price_inc_vat,
            vatrate: productData.vatrate_percent,
            isVAT: false,
            specialPrice: productData.special_price,
            customerGroupDiscount: discount ?? 0,
          });
        }

        // New

        // Add the final special price to the total amount
        if (productData.pricelist.length > 0 && productData.has_pricelist) {
          if (customer_group_name === "") {
            total +=
              item.quantity *
              (shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice);
            subTotal += item.quantity * price;
            totalDiscount +=
              (price -
                (shouldShowSpecialPrice
                  ? finalSpecialPrice
                  : finalNormalPrice)) *
              item.quantity;
            totalMVA +=
              item.quantity *
              (finalPriceInVat -
                (shouldShowSpecialPrice
                  ? finalSpecialPrice
                  : finalNormalPrice));
          } else {
            total += item.quantity * discountedPrice;
            subTotal +=
              item.quantity * (discount === 0 ? discountedPrice : discount);
            totalDiscount +=
              ((discount === 0 ? discountedPrice : discount) -
                discountedPrice) *
              item.quantity;
            totalMVA +=
              item.quantity * (discountedPriceWithVat - discountedPrice);
          }
        } else {
          total +=
            item.quantity *
            (shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice);
          subTotal += item.quantity * price;
          totalDiscount +=
            (price -
              (shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice)) *
            item.quantity;
          totalMVA +=
            item.quantity *
            (finalPriceInVat -
              (shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice));
        }

        // total += item.quantity * (shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice);
        // subTotal += item.quantity * price;
        // totalDiscount += (price - (shouldShowSpecialPrice ? finalSpecialPrice : finalNormalPrice)) * item.quantity;
      });
      //console.log("fetchedSetting", fetchedSetting.shipping_cost_percentage);

      if (total < fetchedSetting.free_shipping_above) {
        const shipping_cost_percentage =
          fetchedSetting.shipping_cost_percentage;
        const shipping_cost = shipping_cost_percentage; // Calculate the shipping cost based on the percentage
        //console.log("total", total);
        //console.log("shipping_cost_percentage", shipping_cost_percentage);
        //console.log("shipping_cost", shipping_cost);

        const newTotalAmount = parseFloat(total) + parseFloat(shipping_cost); // Add the shipping cost to the total
        //console.log("shipping_cost", shipping_cost);

        setTotalShippingCost(shipping_cost);
        setTotalAmount(newTotalAmount + totalMVA); // Set the new total amount with the shipping cost added
      } else {
        setTotalShippingCost(0);
        setTotalAmount(total + totalMVA);
      }
      // if (total < fetchedSetting.free_shipping_above) {
      //   const shipping_cost_percentage = fetchedSetting.shipping_cost;
      //   const shipping_cost = (total * shipping_cost_percentage) / 100;  // Calculate the shipping cost based on the percentage
      //   const newTotalAmount = total + shipping_cost;  // Add the shipping cost to the total
      //   setTotalShippingCost(shipping_cost);
      //   setTotalAmount(newTotalAmount);  // Set the new total amount with the shipping cost added
      // } else {
      //   setTotalAmount(total);
      // }

      // Set the calculated total amount
      setSubTotalAmount(subTotal);
      setTotalFinalDiscount(totalDiscount);
      setTotalMVA(totalMVA);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCartItems();
  }, [customerGroups]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckout = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (session.status === "authenticated") {
        const cartItemsWithCalculatedPrices = carts.map((item: any) => {
          // New
          var shouldShowSpecialPrice: boolean = false; // Initialize with a default value
          var finalNormalPrice: number = 0;
          var finalSpecialPrice: number = 0;
          var price: number = 0;
          var finalDiscount: number = 0;
          var totalMVA: number = 0;

          var PriceWithVat = 0;
          const productData = item.product;

          if (productData.pricelist.length > 0 && productData.has_pricelist) {
            var {
              discountedPrice,
              discount,
              customer_group_name,
              discountedPriceWithVat,
            } = calculateProductPriceByShowPrice({
              productData,
              customerGroups,
              priceIncVat: productData.price_inc_vat,
              isVAT: false,
            });

            PriceWithVat = discountedPriceWithVat;

            if (customer_group_name === "") {
              var discount: any = getCustomerGroupDiscount(
                customerGroups,
                productData.product_id,
                productData.category_id
              );

              var {
                price,
                finalNormalPrice,
                finalSpecialPrice,
                shouldShowSpecialPrice,
                finalDiscount,
                finalPriceInVat,
              } = calculateProductPrice({
                price: productData.price_inc_vat,
                vatrate: productData.vatrate_percent,
                isVAT: false,
                specialPrice: productData.special_price,
                customerGroupDiscount: discount ?? 0,
              });

              PriceWithVat = finalPriceInVat;
            }
          } else {
            var discount: any = getCustomerGroupDiscount(
              customerGroups,
              productData.product_id,
              productData.category_id
            );

            var {
              price,
              finalNormalPrice,
              finalSpecialPrice,
              shouldShowSpecialPrice,
              finalDiscount,
              finalPriceInVat,
            } = calculateProductPrice({
              price: productData.price_inc_vat,
              vatrate: productData.vatrate_percent,
              isVAT: false,
              specialPrice: productData.special_price,
              customerGroupDiscount: discount ?? 0,
            });

            PriceWithVat = finalPriceInVat;
          }

          // New

          // Return the transformed item with the necessary fields

          if (productData.pricelist.length > 0 && productData.has_pricelist) {
            if (customer_group_name === "") {
              return {
                product_id: item.product.product_id,
                product_name: item.product.product_name,
                quantity: item.quantity,
                vatrate_percent: item.product.vatrate_percent,
                price_inc_vat: PriceWithVat,
                finalNormalPrice,
                finalSpecialPrice: shouldShowSpecialPrice
                  ? finalSpecialPrice
                  : finalNormalPrice,
                finalDiscount,
              };
            } else {
              return {
                product_id: item.product.product_id,
                product_name: item.product.product_name,
                quantity: item.quantity,
                vatrate_percent: item.product.vatrate_percent,
                price_inc_vat: PriceWithVat,
                finalNormalPrice: discountedPrice,
                finalSpecialPrice: discountedPrice,
                finalDiscount: discount - discountedPrice,
              };
            }
          } else {
            return {
              product_id: item.product.product_id,
              product_name: item.product.product_name,
              quantity: item.quantity,
              vatrate_percent: item.product.vatrate_percent,
              price_inc_vat: PriceWithVat,
              finalNormalPrice,
              finalSpecialPrice: shouldShowSpecialPrice
                ? finalSpecialPrice
                : finalNormalPrice,
              finalDiscount,
            };
          }
        });

        const payload: any = {
          delivery_address: {
            address: formData.street_name,
            zip: formData.zip_code,
            city: formData.city,
          },
          contact_person: {
            contact_person_name: formData.name,
            contact_person_email: formData.email,
            contact_person_phone: formData.phone,
          },
          reference: formData.reference,
          comment: formData.comment,
          cartData: cartItemsWithCalculatedPrices,
          totalAmount: totalAmount,
          totalMVA: totalMVA,
          shippingCharges: totalShippingCost,
          totalDiscountAmount: totalFinalDicount,
        };

        const data = await addToOrder(payload);

        if (data.status) {
          router.push(`/bestillingsbekreftelse/${data.data.order_number}`);
        } else {
          loadCartItems();
          setLoading(false);
          toast.dismiss();
          toast.error(data.message);
        }
      } else {
        router.push("/logg-inn");
      }
    } catch (error) {
      setLoading(false);
      console.log("error for order", error);
    }
  };

  const formatNumber = (num: any) => {
    return new Intl.NumberFormat("nb-NO").format(num); // 'nb-NO' for Norwegian locale
  };

  const handleDelete = async (cartItemId: string) => {
    setLoading(true);
    await removeFromCartAction.execute({ cartItemId });
    await loadCartItems();
    setLoading(false);
  };

  const handleDecreaseQuantity = async (
    cartItemId: string,
    quantity: number
  ) => {
    setLoading(true);
      await updateCartItemAction.execute({
        cartItemId,
        newQuantity: quantity,
      });
      await loadCartItems();
      setLoading(false);
  };

  return (
    <>
      <section className="pt-9 pb-16">
        <form onSubmit={handleCheckout}>
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-light text-5xl mb-10">
              Bestilling
            </h1>
            <div className="flex flex-wrap -m-8 xl:-m-16">
              <div className="w-full md:w-7/12 p-8 xl:p-16">
                <h6 className="mb-4 text-lg font-semibold">Leveringsmåte</h6>
                <div className="relative mb-8">
                  <select
                    name="country"
                    id="select-01-2"
                    disabled
                    className="appearance-none block py-3 px-4 w-full text-sm text-gray-500 placeholder-gray-500 outline-none border border-gray-200 focus:border-gray-300 focus:ring focus:ring-gray-100 rounded-md transition duration-200"
                  >
                    <option disabled hidden>
                      Frakt alternativer
                    </option>
                    <option selected value="bring">
                      Bring
                    </option>
                  </select>
                  <svg
                    className="absolute top-1/2 right-5 transform -translate-y-1/2"
                    width={12}
                    height={8}
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.0002 1.16994C10.8128 0.983692 10.5594 0.87915 10.2952 0.87915C10.031 0.87915 9.77756 0.983692 9.59019 1.16994L6.00019 4.70994L2.46019 1.16994C2.27283 0.983692 2.01938 0.87915 1.75519 0.87915C1.49101 0.87915 1.23756 0.983692 1.05019 1.16994C0.956464 1.26291 0.88207 1.37351 0.831301 1.49537C0.780533 1.61723 0.754395 1.74793 0.754395 1.87994C0.754395 2.01195 0.780533 2.14266 0.831301 2.26452C0.88207 2.38638 0.956464 2.49698 1.05019 2.58994L5.29019 6.82994C5.38316 6.92367 5.49376 6.99806 5.61562 7.04883C5.73747 7.0996 5.86818 7.12574 6.00019 7.12574C6.1322 7.12574 6.26291 7.0996 6.38477 7.04883C6.50663 6.99806 6.61723 6.92367 6.71019 6.82994L11.0002 2.58994C11.0939 2.49698 11.1683 2.38638 11.2191 2.26452C11.2699 2.14266 11.296 2.01195 11.296 1.87994C11.296 1.74793 11.2699 1.61723 11.2191 1.49537C11.1683 1.37351 11.0939 1.26291 11.0002 1.16994Z"
                      fill="#787A88"
                    />
                  </svg>
                </div>
                <h6 className="mb-8 text-lg font-semibold">Mottaker</h6>
                <div className="flex flex-wrap -m-4 mb-2">
                  <div className="w-full md:w-1/2 p-4">
                    <div className="mb-6">
                      <label
                        htmlFor="input-02-1"
                        className="mb-1.5 inline-block text-sm font-semibold"
                      >
                        Firmanavn
                      </label>
                      <input
                        id="input-02-1"
                        name="company_name"
                        type="text"
                        value={formData.company_name}
                        onChange={handleInputChange}
                        className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border border-gray-100 focus:border-gray-300 focus:ring focus:ring-gray-100 rounded-md transition duration-200"
                        //placeholder="Firmanavn AS"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="input-02-2"
                        className="mb-1.5 inline-block text-sm font-semibold"
                      >
                        Epostadresse
                      </label>
                      <input
                        id="input-02-2"
                        name="email"
                        type="text"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border border-gray-100 focus:border-gray-300 focus:ring focus:ring-gray-100 rounded-md transition duration-200"
                        //placeholder="ola.nordmann@firmanavn.no"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="input-02-2"
                        className="mb-1.5 inline-block text-sm font-semibold"
                      >
                        Leveringsadresse
                      </label>
                      <input
                        id="input-02-2"
                        name="street_name"
                        type="text"
                        value={formData.street_name}
                        onChange={handleInputChange}
                        className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border border-gray-100 focus:border-gray-300 focus:ring focus:ring-gray-100 rounded-md transition duration-200"
                        //placeholder="Storgata 34"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="input-02-3"
                        className="mb-1.5 inline-block text-sm font-semibold"
                      >
                        Postnr
                      </label>
                      <input
                        id="input-02-3"
                        name="zip_code"
                        type="text"
                        value={formData.zip_code}
                        onChange={handleInputChange}
                        className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border border-gray-100 focus:border-gray-300 focus:ring focus:ring-gray-100 rounded-md transition duration-200"
                        //placeholder="1020"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-4">
                    <div className="mb-6">
                      <label
                        htmlFor="input-04-1"
                        className="mb-1.5 inline-block text-sm font-semibold"
                      >
                        Organisasjonsnummer
                      </label>
                      <input
                        id="input-04-1"
                        name="organization_number"
                        type="text"
                        value={formData.organization_number}
                        onChange={handleInputChange}
                        className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border border-gray-100 focus:border-gray-300 focus:ring focus:ring-gray-100 rounded-md transition duration-200"
                        //placeholder="987876765"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="input-05-1"
                        className="mb-1.5 inline-block text-sm font-semibold"
                      >
                        Telefonnummer
                      </label>
                      <input
                        id="input-05-1"
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border border-gray-100 focus:border-gray-300 focus:ring focus:ring-gray-100 rounded-md transition duration-200"
                        //placeholder="99 88 77 66"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="input-02-2"
                        className="mb-1.5 inline-block text-sm font-semibold"
                      >
                        Kontaktperson
                      </label>
                      <input
                        id="input-02-2"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border border-gray-100 focus:border-gray-300 focus:ring focus:ring-gray-100 rounded-md transition duration-200"
                        //placeholder="Ola Nordmann"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="input-06-1"
                        className="mb-1.5 inline-block text-sm font-semibold"
                      >
                        Poststed
                      </label>
                      <input
                        id="input-06-1"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border border-gray-100 focus:border-gray-300 focus:ring focus:ring-gray-100 rounded-md transition duration-200"
                        //placeholder="Storbyåsen"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full p-4">
                    <div>
                      <label
                        htmlFor="input-07-1"
                        className="mb-1.5 inline-block text-sm font-semibold"
                      >
                        Referanse
                      </label>
                      <input
                        id="input-07-1"
                        name="reference"
                        type="text"
                        value={formData.reference}
                        onChange={handleInputChange}
                        className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border border-gray-100 focus:border-gray-300 focus:ring focus:ring-gray-100 rounded-md transition duration-200"
                        placeholder=""
                      />
                    </div>
                    <div className="pt-2">
                      <label
                        htmlFor="input-07-1"
                        className="mb-1.5 inline-block text-sm font-semibold"
                      >
                        Kommentar
                      </label>
                      <input
                        id="input-07-1"
                        name="comment"
                        type="text"
                        value={formData.comment}
                        onChange={handleInputChange}
                        className="py-3 px-4 w-full text-sm placeholder-gray-500 outline-none border border-gray-100 focus:border-gray-300 focus:ring focus:ring-gray-100 rounded-md transition duration-200"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
                <h6 className="mb-4 text-lg font-semibold">
                  Betalingsinformasjon
                </h6>
                <div className="flex flex-wrap justify-between -m-4 mb-2">
                  <div className="w-auto p-4">
                    <label className="relative flex items-center gap-4">
                      <input
                        className="custom-radio-1 opacity-0 absolute h-4 w-4"
                        type="radio"
                        name="field-radio"
                        defaultChecked
                      />
                      <span className="border border-gray-500 bg-gray-50 w-4 h-4 flex justify-center items-center rounded-full">
                        <svg
                          className="fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          width={8}
                          height={8}
                          viewBox="0 0 8 8"
                          fill="none"
                        >
                          <circle cx={4} cy={4} r={4} fill="#1E2238" />
                        </svg>
                      </span>
                      <span>
                        <span className="mb-1 font-semibold block">
                          Faktura
                        </span>
                        <span className="text-sm text-gray-500 block">
                          Du vil få tilsendt en faktura på EHF / Epost
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="w-auto p-4">
                    <span className="font-semibold">0,-</span>
                  </div>
                </div>
                <div className="hidden flexx flex-wrap justify-between -m-4 mb-2">
                  <div className="w-auto p-4">
                    <label className="relative flex items-center gap-4">
                      <input
                        className="custom-radio-1 opacity-0 absolute h-4 w-4"
                        type="radio"
                        name="field-radio"
                      />
                      <span className="border border-gray-500 bg-gray-50 w-4 h-4 flex justify-center items-center rounded-full">
                        <svg
                          className="fill-current hidden"
                          xmlns="http://www.w3.org/2000/svg"
                          width={8}
                          height={8}
                          viewBox="0 0 8 8"
                          fill="none"
                        >
                          <circle cx={4} cy={4} r={4} fill="#1E2238" />
                        </svg>
                      </span>
                      <span>
                        <span className="mb-1 font-semibold block">
                          Kortbetaling
                        </span>
                        <span className="text-sm text-gray-500 block">
                          Du kan betale med firmakort
                        </span>
                      </span>
                    </label>
                  </div>
                  <div className="w-auto p-4">
                    <span className="font-semibold">45,-</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-5/12 p-8 xl:p-16">
                <h6 className="mb-4 text-lg font-semibold">Produktsoversikt</h6>
                <div className="pb-6 border-b border-dashed border-gray-300">
                  {carts.map((item, i) => {
                    // const discount = getCustomerGroupDiscount(
                    //   customerGroups,
                    //   item.product.product_id,
                    //   item.product.category_id
                    // );

                    // const {
                    //   finalNormalPrice,
                    //   finalSpecialPrice,
                    //   shouldShowSpecialPrice,
                    //   finalDiscount,
                    // } = calculateProductPrice({
                    //   price: item.product.price_inc_vat,
                    //   vatrate: item.product.vatrate_percent,
                    //   isVAT: false,
                    //   specialPrice: item.product.special_price,
                    //   customerGroupDiscount: discount ?? 0,
                    // });

                    // New

                    var shouldShowSpecialPrice: boolean = false; // Initialize with a default value
                    var finalNormalPrice: number = 0;
                    var finalSpecialPrice: number = 0;

                    const productData = item.product;
                    console.log("productData", productData);

                    if (
                      productData.pricelist.length > 0 &&
                      productData.has_pricelist
                    ) {
                      var { discountedPrice, discount, customer_group_name } =
                        calculateProductPriceByShowPrice({
                          productData,
                          customerGroups,
                          priceIncVat: productData.price_inc_vat,
                          isVAT: false,
                        });

                      if (customer_group_name === "") {
                        var discount: any = getCustomerGroupDiscount(
                          customerGroups,
                          productData.product_id,
                          productData.category_id
                        );

                        var {
                          finalNormalPrice,
                          finalSpecialPrice,
                          shouldShowSpecialPrice,
                          finalDiscount,
                        } = calculateProductPrice({
                          price: productData.price_inc_vat,
                          vatrate: productData.vatrate_percent,
                          isVAT: false,
                          specialPrice: productData.special_price,
                          customerGroupDiscount: discount ?? 0,
                        });
                      }
                    } else {
                      var discount: any = getCustomerGroupDiscount(
                        customerGroups,
                        productData.product_id,
                        productData.category_id
                      );

                      var {
                        finalNormalPrice,
                        finalSpecialPrice,
                        shouldShowSpecialPrice,
                        finalDiscount,
                      } = calculateProductPrice({
                        price: productData.price_inc_vat,
                        vatrate: productData.vatrate_percent,
                        isVAT: false,
                        specialPrice: productData.special_price,
                        customerGroupDiscount: discount ?? 0,
                      });
                    }
                    // New

                    const isOutOfStock =
                      !item.product.available_stock ||
                      (item.product.available_stock &&
                        item.quantity > item.product.available_stock);

                    return (
                      <div key={i} className={`flex flex-wrap -m-2 mb-2 ${isOutOfStock && 'disabledProduct'}`}>
                        <div className="w-full md:w-3/4 p-2">
                          <div className="flex flex-wrap -m-2">
                            <div className="w-auto p-2 product-img">
                              <img
                                className="w-24 h-24 object-contain aspect-square rounded-lg"
                                src={
                                  item.product?.product_image
                                    ? item.product?.product_image
                                    : "/assets/placeholder/gray-400-square.png"
                                }
                                alt={item.product?.product_name}
                              />
                            </div>
                            <div className="flex-1 p-2">
                              <p className="mb-1.5 product-name">
                                {item.product?.product_name}
                              </p>
                              {/* <p className="mb-1.5">200ML</p> */}
                              <p className="product-quantity"> x {item.quantity}</p>
                              {isOutOfStock && (
                                <div key={i} className="flex flex-wrap -m-2 mt-1 ">
                                  <div className="w-full md:w-3/4 p-2">
                                    <div className="flex flex-wrap -m-2">
                                      <div className="w-auto p-2">
                                        <span className="text-red-500">
                                          {" "}
                                          {item.product.available_stock === 0 ? 'ikke på lager' : `Kun ${item.product.available_stock} på lager`}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              )}

                            </div>
                          </div>
                        </div>
                        <div className="w-full md:w-1/4 p-2 flex justify-between flex-col">
                          {productData.pricelist.length > 0 &&
                            productData.has_pricelist ? (
                            customer_group_name === "" ? (
                              <p className="flex justify-end font-semibold">
                                kr{" "}
                                {formatNumber(
                                  item.quantity *
                                  (shouldShowSpecialPrice
                                    ? finalSpecialPrice
                                    : finalNormalPrice)
                                )}
                                ,-
                              </p>
                            ) : (
                              <p className="text-lg font-semibold text-center">
                                kr{" "}
                                {formatNumber(item.quantity * discountedPrice)}
                                ,-
                              </p>
                            )
                          ) : (
                            <p className="flex justify-end font-semibold ">
                              kr{" "}
                              {formatNumber(
                                item.quantity *
                                (shouldShowSpecialPrice
                                  ? finalSpecialPrice
                                  : finalNormalPrice)
                              )}
                              ,-
                            </p>
                          )}
                          {isOutOfStock && (
                            <div className="w-full md:w-4/4 p-2 text-end">
                              <button type="button" className="text-red-500" onClick={() => item.product.available_stock === 0 ? handleDelete(item._id) : handleDecreaseQuantity(
                                item._id,
                                item.product.available_stock
                              )}>{item.product.available_stock === 0 ? <BiTrash size={24} /> : <BiRefresh size={24} />}</button>
                            </div>
                          )}
                        </div>


                      </div>
                    );
                  })}
                </div>
                <div className="hidden pt-6 pb-2 border-b border-dashed border-gray-300">
                  <h6 className="mb-2 text-lg font-semibold">Rabattkode</h6>
                  <div className="flex flex-wrap items-center -m-2 mb-0.5">
                    <div className="w-full lg:flex-1 p-2">
                      <input
                        type="text"
                        name="rabattkode"
                        className="py-3 px-4 w-full text-sm placeholder-gray-400 bg-gray-50 outline-none focus:ring focus:ring-gray-100 border border-gray-100 rounded-lg transition duration-200"
                        placeholder="Skriv inn rabattkode"
                      />
                    </div>
                    <div className="w-full lg:w-auto p-2">
                      <button className="py-3 px-7 w-full text-sm font-semibold bg-gray-50 hover:bg-gray-100 focus:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg transition duration-300">
                        Legg til
                      </button>
                    </div>
                  </div>
                </div>
                <div className="py-2 border-b border-dashed border-gray-300">
                  <div className="flex flex-wrap justify-between -m-2">
                    <div className="w-auto p-2">
                      <span className="text-gray-500">Delsum</span>
                    </div>
                    <div className="w-auto p-2">
                      <span className="font-semibold">
                        kr {formatNumber(subTotalAmount)}
                      </span>
                    </div>
                  </div>
                  {totalFinalDicount > 0 && (
                    <div className="flex flex-wrap justify-between -m-2">
                      <div className="w-auto p-2">
                        <span className="text-gray-500">Rabatt</span>
                      </div>
                      <div className="w-auto p-2">
                        <span className="font-semibold">
                          - kr {formatNumber(totalFinalDicount)}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap justify-between -m-2">
                    <div className="w-auto p-2">
                      <span className="text-gray-500">MVA</span>
                    </div>
                    <div className="w-auto p-2">
                      <span className="font-semibold text-gray-500">
                        kr {formatNumber(totalMVA)},-
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between -m-2">
                    <div className="w-auto p-2">
                      <span className="text-gray-500">Frakt</span>
                    </div>
                    <div className="w-auto p-2">
                      <span className="font-semibold text-gray-500">
                        kr {formatNumber(totalShippingCost)},-
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-2.5 mb-9">
                  <div className="flex flex-wrap items-center justify-between -m-2">
                    <div className="w-auto p-2">
                      <p className="font-semibold">Total sum</p>
                    </div>
                    <div className="w-auto p-2">
                      <p className="text-2xl font-semibold">
                        kr {formatNumber(totalAmount)}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="py-3 px-7 w-full text-sm text-white font-semibold bg-primary hover:bg-primary/75 focus:bg-primary/75 focus:ring-4 focus:ring-gray-200 rounded-4xl transition duration-300"
                >
                  Bestill
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
      {loading && (
        <div className="loaderContainer">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Bestilling;
