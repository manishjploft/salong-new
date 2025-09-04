import CategoryItem from './CategoryItem';

export default async function CategorySection({ categoriesRes }: any) {
  const categories = [
    { category_name: "Nye produkter", category_id: 99 },
    ...(categoriesRes ?? []),
  ];
  return (
    <>
      {categories?.map((category: any, index: number) => (
        <CategoryItem
          id={category.category_id}
          key={category.category_id}
          {...category}
          index={index}
        />
      ))}
    </>
  );
}
