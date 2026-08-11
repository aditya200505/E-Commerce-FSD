import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { fetchAllProducts } from '../productApi';
import { CartContext } from '../App';

function Home(){
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true); // Set loading to true before fetching
            setError(null); // Clear any previous errors
            try {
                const data = await fetchAllProducts(); // Fetch all products from API
                setProducts(data); // Store fetched products in state
            } catch (err) {
                setError('Failed to load products.'); // Set error message if fetch fails
                console.error('Error fetching products for Home page:', err);
            } finally {
                setLoading(false); // Set loading to false after fetching (success or failure)
            }
        }; 
        getProducts(); // Call the fetch function
    }, []); // Empty dependency array ensures this runs only once on mount

    if (loading) {
        return <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Loading products...</h1>;
    }

    if (error) {
        return <h1 style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>{error}</h1>;
    }

    const featuredProducts = products.slice(0, 3);

    return (
        <div className="home-page">
            <h1>Welcome to ShopEasy</h1> 

            <section className="featured-products-section">
                <h2>Featured Products</h2>
                <div className="products"> {/* Reusing the .products grid style */}
                    {featuredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            image={product.thumbnail} // DummyJSON uses 'thumbnail' for main image
                            category={product.category}
                            price={product.price}
                            rating={product.rating}
                            stock={product.stock}
                            description={product.description}
                            onAddToCart={addToCart}
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