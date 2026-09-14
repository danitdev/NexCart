"use client";

import { useRouter } from "next/navigation";

type AddToCartButtonProps = {
    productId: number;
};

export default function AddToCartButton({
    productId
}: AddToCartButtonProps) {

    const router = useRouter();

    const handleAddToCart = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        // We will call your POST /cart/items API here later.
        console.log("Add product:", productId);
    };

    return (
        <button onClick={handleAddToCart}>
            Add to Cart
        </button>
    );
}