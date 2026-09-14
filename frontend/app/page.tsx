import Link from "next/link";
import type {Product} from "../../src/types/product";
import type {Category} from "../../src/types/category";
import AddToCartButton from "./components/AddToCartButton";

export default async function Home() {
    const productResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`
    );
    const categoryResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`
    );

    const productData:{products:Product[]} = await productResponse.json();
    const categoryData:{categories:Category[]} = await categoryResponse.json();

    const products = productData.products;
    const categories = categoryData.categories;

    return (
        <main>
            <header className="navbar">
                <div className="logo">
                    <Link href="/">NexCart</Link>
                </div>

                <nav>
                    <Link href="/products">Products</Link>
                    <Link href="/categories">Categories</Link>
                    <Link href="/orders">Orders</Link>
                </nav>

                <div className="nav-actions">
                    <Link href="/login">Login</Link>

                    <Link href="/register" className="register-button">
                        Register
                    </Link>

                    <Link href="/cart" className="cart-button">
                        Cart
                    </Link>
                </div>
            </header>

            <section className="hero">
                <div>
                    <p className="hero-label">WELCOME TO NEXCART</p>

                    <h1>
                        Everything you need,
                        <br />
                        in one place.
                    </h1>

                    <p className="hero-description">
                        Discover products, add them to your cart,
                        and get everything you need in one place.
                    </p>

                    <Link
                        href="/products"
                        className="hero-button"
                    >
                        Browse Products
                    </Link>
                </div>
            </section>

            <section className="categories">
                <div className="section-header">
                    <h2>Categories</h2>

                    <Link href="/categories">
                        View all →
                    </Link>
                </div>

                <div className="category-grid">
                    {categories.map((category) => (
                        <Link
                            href={`/categories/${category.id}`}
                            className="category-card"
                            key={category.id}
                        >
                            <h3>{category.name}</h3>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="products">
                <div className="section-header">
                    <h2>Featured Products</h2>

                    <Link href="/products">
                        View all →
                    </Link>
                </div>

                <div className="product-grid">
                    {products.map((product: Product) => (
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

                                <AddToCartButton productId={product.id} />
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <footer>
                <p>© 2026 NexCart. All rights reserved.</p>
            </footer>
        </main>
    );
}