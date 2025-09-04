import Link from 'next/link';
import { LuShoppingCart } from 'react-icons/lu';

// import { fetchCartTotalItems } from '../cart.action';

export default async function CartIndicator() {
  // const [totalItems] = await fetchCartTotalItems();

  return (
    <Link
      href="/handlekurv"
      className="flex items-center hover:text-gray-600 hover:cursor-pointer"
    >
      <LuShoppingCart size={26} />
      <span className="inline-block w-6 h-6 text-center bg-transparent rounded-full font-semibold font-heading">
        {2}
      </span>
    </Link>
  );
}
