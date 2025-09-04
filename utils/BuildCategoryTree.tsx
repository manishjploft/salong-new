export interface Category {
  name: string;
  children?: Category[];
}

export function buildCategoryTree(categories: string[]): Category[] {
  const tree: Record<string, Category> = {};

  categories.forEach((categoryPath) => {
    const parts = categoryPath.split(" > ").map((part) => part.trim());
    let currentLevel = tree;

    parts.forEach((part, index) => {
      if (!currentLevel[part]) {
        currentLevel[part] = {
          name: part,
          children: index === parts.length - 1 ? [] : undefined,
        };
      }

      if (currentLevel[part].children) {
        currentLevel = Object.fromEntries(
          currentLevel[part].children.map((child) => [child.name, child])
        );
      }
    });
  });

  return Object.values(tree);
}
