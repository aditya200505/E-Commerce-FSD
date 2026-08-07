import { Link } from "react-router-dom"; // Remove Outlet import
import ProductCard from "../components/ProductCard";
import products from "../data/products"; // Import the products data

function Home(){

return(

    <div className="home-page">
        <h1>Welcome to ShopEasy</h1>
        <p className="tagline">Your one-stop shop for all your needs!</p>

        <section className="featured-products-section">
            <h2>Featured Products</h2>
            <div className="products"> {/* Reusing the .products grid style */}
                {products.slice(0, 3).map((item) => ( // Display first 3 products
                    <ProductCard
                        key={item.id}
                        product={item}
                    />
                ))}
            </div>
            <div className="view-all-products">
                <Link to="/products" className="continue-shopping-button">View All Products</Link>
            </div>
        </section>

    </div>
);

}

export default Home;