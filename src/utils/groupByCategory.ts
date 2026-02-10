import type { GroupedCategory, ProductCardProps } from "@/type";
export function groupByCategory(products: ProductCardProps[]): GroupedCategory[] {
    const groupedMap = new Map<string, ProductCardProps[]>();

    products.forEach(product => {
        const category = product.category;

        if (!groupedMap.has(category)) {
            groupedMap.set(category, []);
        }

        groupedMap.get(category)!.push(product);
    });

    return Array.from(groupedMap.entries()).map(([category, products]) => ({
        category,
        products,
    }));
}