import { fetchSetting } from "@/features/setting/setting.action";
import React from "react";

const TopBanner = async() => {
  const setting = await fetchSetting();

  const formatNumber = (num: any) => {
    return new Intl.NumberFormat('nb-NO').format(num); // 'nb-NO' for Norwegian locale
  };

  return (
    <div className="w-full py-2 bg-secondary flex justify-center">
      <p className="text-white text-sm font-medium">
        Gratis frakt på bestillinger over kr {formatNumber(setting.free_shipping_above)},-
      </p>
    </div>
  );
};

export default TopBanner;
