export type Product = {
    id: number;
    name: string;
    description: string | null;
    price: string;
    stock: number;
    imageUrl: string | null;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    category?: {
        id: number;
        name: string;
    };
};