"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useServerAction } from "zsa-react";
import { addToCart } from "@/features/cart/cart.action";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useProductDetailStore from "@/app/produkt/[...slug]/store";
import { PiMinus, PiPlus } from "react-icons/pi";
import Link from "next/link";

export default function AddToCartButton({ cart, product }: any) {


  const session = useSession();
  const router = useRouter();
  const { isPending, execute, data } = useServerAction(addToCart);
  const [quantity, setQuantity] = useState(1);



  const selectedVariant = useProductDetailStore(
    (state) => state.selectedVariant
  );
  const productData = product;selectedVariant
  product = selectedVariant ? selectedVariant : product;

  const stock = product.available_stock || 0;
  //console.log(product.product_name, cart?.quantity);

  const isOutOfStock = !!(
    stock === 0 ||
    (stock && stock <= (cart?.quantity ?? 0))
  );

  const handleAddToCart = async () => {
    if (session.status === "authenticated") {
      if (cart?.quantity + quantity > stock) {
        toast.error("Product out of stock!");
        return;
      }
      // if (!product.available_stock || product.available_stock === 0) {
      //     return;
      // } else {

      const [data, err] = await execute({
        productId: product.product_id,
        quantity,
      });
      toast.dismiss();
      if (data?.status === "200") {
        toast.success("Produktet er lagt til i handlekurven!");
      } else {
        toast.error(data?.msg);
      }
      // }
    } else {
      // Redirect to login page if the user is not authenticated
      router.push("/logg-inn");
    }
  };

  // const handleIncrease = () => setQuantity((prev) => prev + 1);


    const handleIncrease = () => {
 
    if (product?.available_stock <= quantity) {
      toast.dismiss()
      toast.error(`Produktlager kun ${quantity} tilgjengelige`);
      return;
    }
    else {
      setQuantity((pre) => pre + 1)
    }
  }


  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleInputChange = (e: any) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity(1);
    }
  };

  // Handle Stock Reminder
  const handleStockReminder = async () => {
    if (!session?.data?.user?.id) {
      toast.dismiss();
      toast.error("Please login.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}cart/stock-reminder/${product.product_id}/${session?.data?.user?.id}`,
        {
          method: "get",
        }
      );

      if (response.ok) {
        toast.success("Produktpåminnelse opprettet!");
      } else {
        toast.error("Noe gikk galt");
      }
    } catch (error: any) {
      toast.error(error.response.message);
      console.error(error);
    }
  };

// when variannt change 
    useEffect(()=>{
    if(selectedVariant)
      {
        setQuantity(1)
      }
  },[selectedVariant])
  



  return (
    <>
      {session.status === "authenticated" ? (
        <>
          {isOutOfStock ? (
            <>
              <div className="flex flex-row justify-between gap-6 items-start bg-tertiary p-4 rounded-2xl">
                <div className="flex flex-col">
                  <p className="text-black text-lg font-base mb-0">
                    Varen er dessverre ikke på lager.
                  </p>
                  <p className="text-black text-sm font-base mb-0">
                    Registrere deg for å få beskjed når det er tilgjengelig
                    igjen.
                  </p>
                </div>
                <button
                  onClick={handleStockReminder}
                  className="bg-primary whitespace-nowrap rounded-full hover:bg-secondary focus:ring-4 focus:ring-gray-200 text-white font-semibold h-14 w-full max-w-48 px-7 py-4 flex items-center justify-center gap-2 transition duration-200"
                >
                  <span>Gi meg beskjed</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col xs:flex-row gap-6 items-start xs:items-center">
              <div className="flex flex-row justify-center select-none items-center my-4 gap-2">
                <div
                  onClick={handleDecrease}
                  className={`rounded-full p-3 bg-background text-black border-gray-200 ${
                    quantity === 1
                      ? "cursor-not-allowed"
                      : "cursor-pointer hover:bg-primary hover:text-white"
                  }`}
                >
                  <PiMinus size={18} />
                </div>
                <p className="inline-flex text-black items-center px-2 text-3xl font-light">
                  {quantity}
                </p>
                <div
                  onClick={handleIncrease}
                  className="rounded-full p-3 bg-background hover:bg-primary hover:text-white text-black border-gray-200 cursor-pointer"
                >
                  <PiPlus size={18} />
                </div>
              </div>

              <div
                onClick={handleAddToCart}
                className="bg-primary whitespace-nowrap text-sm sm:text-base max-w-xl rounded-full hover:bg-secondary focus:ring-4 focus:ring-gray-200 text-white font-semibold h-14 w-full px-7 py-4 flex items-center justify-center gap-2 transition duration-200 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={24}
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M21.6479 16H7.64795C7.38273 16 7.12838 15.8946 6.94084 15.7071C6.75331 15.5196 6.64795 15.2652 6.64795 15C6.64795 14.7348 6.75331 14.4804 6.94084 14.2929C7.12838 14.1054 7.38273 14 7.64795 14H18.0879C18.7566 14 19.4061 13.7767 19.9333 13.3654C20.4605 12.9542 20.8352 12.3786 20.9979 11.73L22.6479 5.24C22.6854 5.09241 22.6887 4.93821 22.6575 4.78917C22.6263 4.64013 22.5614 4.50018 22.4679 4.38C22.3707 4.25673 22.2458 4.1581 22.1033 4.09208C21.9609 4.02606 21.8049 3.99452 21.6479 4H7.40795C7.20164 3.41645 6.81988 2.911 6.31501 2.55294C5.81015 2.19488 5.20689 2.00174 4.58795 2H3.64795C3.38273 2 3.12838 2.10536 2.94084 2.29289C2.75331 2.48043 2.64795 2.73478 2.64795 3C2.64795 3.26522 2.75331 3.51957 2.94084 3.70711C3.12838 3.89464 3.38273 4 3.64795 4H4.58795C4.81638 3.99334 5.04021 4.06513 5.22215 4.20341C5.4041 4.34169 5.5332 4.53812 5.58795 4.76L5.64795 5.24L7.37795 12C6.5823 12.0358 5.83346 12.3862 5.29617 12.9741C4.75888 13.5621 4.47714 14.3394 4.51295 15.135C4.54875 15.9306 4.89916 16.6795 5.48709 17.2168C6.07501 17.7541 6.8523 18.0358 7.64795 18H7.82795C7.66348 18.4531 7.61064 18.9392 7.67388 19.4171C7.73712 19.895 7.9146 20.3506 8.19127 20.7454C8.46794 21.1401 8.83566 21.4624 9.2633 21.6849C9.69094 21.9074 10.1659 22.0235 10.6479 22.0235C11.13 22.0235 11.605 21.9074 12.0326 21.6849C12.4602 21.4624 12.828 21.1401 13.1046 20.7454C13.3813 20.3506 13.5588 19.895 13.622 19.4171C13.6853 18.9392 13.6324 18.4531 13.4679 18H15.8279C15.6635 18.4531 15.6106 18.9392 15.6739 19.4171C15.7371 19.895 15.9146 20.3506 16.1913 20.7454C16.4679 21.1401 16.8357 21.4624 17.2633 21.6849C17.6909 21.9074 18.1659 22.0235 18.6479 22.0235C19.13 22.0235 19.605 21.9074 20.0326 21.6849C20.4602 21.4624 20.828 21.1401 21.1046 20.7454C21.3813 20.3506 21.5588 19.895 21.622 19.4171C21.6853 18.9392 21.6324 18.4531 21.4679 18H21.6479C21.9132 18 22.1675 17.8946 22.3551 17.7071C22.5426 17.5196 22.6479 17.2652 22.6479 17C22.6479 16.7348 22.5426 16.4804 22.3551 16.2929C22.1675 16.1054 21.9132 16 21.6479 16ZM20.3679 6L19.0579 11.24C19.0032 11.4619 18.8741 11.6583 18.6922 11.7966C18.5102 11.9349 18.2864 12.0067 18.0579 12H9.42795L7.92795 6H20.3679ZM10.6479 20C10.4502 20 10.2568 19.9414 10.0924 19.8315C9.92793 19.7216 9.79976 19.5654 9.72407 19.3827C9.64838 19.2 9.62858 18.9989 9.66716 18.8049C9.70575 18.6109 9.80099 18.4327 9.94084 18.2929C10.0807 18.153 10.2589 18.0578 10.4529 18.0192C10.6468 17.9806 10.8479 18.0004 11.0306 18.0761C11.2134 18.1518 11.3695 18.28 11.4794 18.4444C11.5893 18.6089 11.6479 18.8022 11.6479 19C11.6479 19.2652 11.5426 19.5196 11.3551 19.7071C11.1675 19.8946 10.9132 20 10.6479 20ZM18.6479 20C18.4502 20 18.2568 19.9414 18.0924 19.8315C17.9279 19.7216 17.7998 19.5654 17.7241 19.3827C17.6484 19.2 17.6286 18.9989 17.6672 18.8049C17.7057 18.6109 17.801 18.4327 17.9408 18.2929C18.0807 18.153 18.2589 18.0578 18.4529 18.0192C18.6468 17.9806 18.8479 18.0004 19.0306 18.0761C19.2134 18.1518 19.3695 18.28 19.4794 18.4444C19.5893 18.6089 19.6479 18.8022 19.6479 19C19.6479 19.2652 19.5426 19.5196 19.3551 19.7071C19.1675 19.8946 18.9132 20 18.6479 20Z"
                    fill="#F0FDF4"
                  />
                </svg>
                <span>Legg til i handlekurv</span>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="mt-10 bg-white border border-tertiary/25 shadow-lg shadow-black/10 rounded-2xl p-4">
          <p className="mb-4">
            Du må logge inn for å kunne kjøpe produktene våre.
          </p>
          <div className="flex flex-col xs:flex-row gap-2 w-full">
            <Link
              href="/logg-inn"
              className="bg-primary whitespace-nowrap text-sm sm:text-base max-w-xs rounded-full hover:bg-primary/80 focus:ring-4 focus:ring-gray-200 text-white font-semibold w-full px-7 py-4 flex items-center justify-center gap-2 transition duration-200"
            >
              <span>Logg inn</span>
            </Link>

            <Link
              href="/bli-forhandler"
              className="bg-tertiary whitespace-nowrap hover:bg-gray-50 text-primary rounded-full max-w-xs border border-secondary hover:border-primary focus:ring-4 focus:ring-gray-200 text-sm font-semibold w-full px-8 py-4 inline-flex justify-center items-center transition duration-200"
            >
              Bli forhandler
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
