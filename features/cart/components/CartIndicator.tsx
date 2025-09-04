import { fetchCartTotalItems } from '../cart.action';

export default async function CartIndicator() {
  const [totalItems] = await fetchCartTotalItems();
  

  return (
    totalItems === 0 ? '' :
    <div className="top-0 right-0 p-0.5 flex justify-center items-center bg-primary rounded-full mb-2">
      <p className="text-white whitespace-nowrap px-0.5 font-base text-xs">
        {totalItems}
      </p>
    </div>
  );
}
