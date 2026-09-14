export default async function Home() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`
    );
    const data = await response.json();
    const products = data.products;
    // console.log(products);
    return (
        <main>
            <header className="navbar">
                <div className="logo">NexCart</div>

                <nav>
                    <a href="#">Products</a>
                    <a href="#">Categories</a>
                    <a href="#">Orders</a>
                </nav>

                <div className="nav-actions">
                    <a href="#">Login</a>
                    <button>Cart</button>
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

                    <button className="hero-button">
                        Browse Products
                    </button>
                </div>
            </section>

            <section className="categories">
                <div className="section-header">
                    <h2>Categories</h2>
                    <a href="#">View all →</a>
                </div>

                <div className="category-grid">
                    <div className="category-card">
                        <h3>Electronics</h3>
                        <p>Phones, laptops and more</p>
                    </div>

                    <div className="category-card">
                        <h3>Gaming</h3>
                        <p>Games and gaming gear</p>
                    </div>

                    <div className="category-card">
                        <h3>Clothing</h3>
                        <p>Find your style</p>
                    </div>

                    <div className="category-card">
                        <h3>Accessories</h3>
                        <p>Complete your setup</p>
                    </div>
                </div>
            </section>

            <section className="products">
                <div className="section-header">
                    <h2>Featured Products</h2>
                    <a href="#">View all →</a>
                </div>

                <div className="product-grid">
                    {products.map((product: any) => (
                        <article className="product-card" key={product.id}>
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

                                <button>Add to Cart</button>
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

