import BrandsItem from './BrandItem';

export default async function BrandSection({ brandsRes }: any) {
  return (
    <>
      {brandsRes?.map((brand: any, index: number) => (
        <BrandsItem
          key={brand.brand_id}
          id={brand.brand_id}
          {...brand}
          index={index}
        />
      ))}
    </>
  );
}
