import Link from "next/link";
import type { Product } from "../../../../src/types/product";

type CategoryPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function CategoryPage({
    params
}: CategoryPageProps) {

    const { id } = await params;

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}/products`
    );

    const data: { products: Product[] } = await response.json();

    const products = data.products;

    return (
        <main>
            <header className="navbar">
                <div className="logo">NexCart</div>

                <nav>
                    <Link href="/products">Products</Link>
                    <Link href="/categories">Categories</Link>
                    <Link href="/orders">Orders</Link>
                </nav>

                <div className="nav-actions">
                    <Link href="/login">Login</Link>
                    <button>Cart</button>
                </div>
            </header>

            <section className="category-hero">
                <div>
                    <Link
                        href="/"
                        className="category-back"
                    >
                        ← Back to home
                    </Link>

                    <p className="hero-label">
                        NEXCART CATEGORY
                    </p>

                    <h1>
                        Category Products
                    </h1>

                    <p className="hero-description">
                        Browse products available in this category.
                    </p>
                </div>
            </section>

            <section className="products">
                <div className="section-header">
                    <h2>Products</h2>

                    <Link href="/categories">
                        View all categories →
                    </Link>
                </div>

                {products.length > 0 ? (
                    <div className="product-grid">
                        {products.map((product) => (
                            <article
                                className="product-card"
                                key={product.id}
                            >
                                <div className="product-image">
                                    {product.imageUrl ? (
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
                                            alt={product.name}
                                        />
                                    ) : (
                                        "No image"
                                    )}
                                </div>

                                <div className="product-info">
                                    <p className="product-category">
                                        {product.category?.name}
                                    </p>

                                    <h3>{product.name}</h3>

                                    <p className="product-price">
                                        ${product.price}
                                    </p>

                                    <button>
                                        Add to Cart
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="empty-category">
                        <h3>No products found</h3>

                        <p>
                            There are currently no products in this category.
                        </p>

                        <Link href="/categories">
                            Browse other categories
                        </Link>
                    </div>
                )}
            </section>

            <footer>
                <p>© 2026 NexCart. All rights reserved.</p>
            </footer>
        </main>
    );
}