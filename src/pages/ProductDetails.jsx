import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook to get URL parameters
import { fetchProductById } from '../productApi';

/**
 * Product Details page component.
 * Fetches and displays detailed information for a single product based on its ID from the URL.
 * @param {Object} props - The component props.
 * @param {function} props.addToCart - Function to add a product to the cart.
 */
function ProductDetails({ addToCart }){
    // Get the product ID from the URL parameters
    const { id } = useParams();
    // State to store the fetched product details
    const [product, setProduct] = useState(null);
    // State to manage loading status
    const [loading, setLoading] = useState(true);
    // State to manage error messages
    const [error, setError] = useState(null);

    // useEffect hook to fetch product details when the component mounts or ID changes
    useEffect(() => {
        const getProductDetails = async () => {
            setLoading(true); // Set loading to true before fetching
            setError(null); // Clear any previous errors
            try {
                const data = await fetchProductById(id); // Fetch product by ID
                setProduct(data); // Store fetched product in state
            } catch (err) {
                setError('Failed to load product details.'); // Set error message if fetch fails
                console.error(`Error fetching product details for ID ${id}:`, err);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        getProductDetails(); // Call the fetch function
    }, [id]); // Re-fetch if the product ID in the URL changes

    if (loading) {
        return <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Loading product details...</h1>;
    }

    if (error) {
        return <h1 style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>{error}</h1>;
    }

    if (!product) { 
        return <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Product not found.</h1>;
    }

    return (
        <div className="product-details-page" style={{ maxWidth: '900px', margin: '2rem auto', padding: '1.5rem', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <img src={product.thumbnail} alt={product.title} style={{ maxWidth: '100%', flex: '1 1 300px', borderRadius: '8px' }} />
            <div style={{ flex: '2 1 400px' }}>
                <h1>{product.title}</h1>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
                <p><strong>Rating:</strong> {product.rating} / 5</p>
                <p><strong>Stock:</strong> {product.stock} items left</p>
                <p><strong>Description:</strong> {product.description}</p>
                <button className="card-button" onClick={() => addToCart({ id: product.id, title: product.title, image: product.thumbnail, price: product.price, stock: product.stock })} style={{ marginTop: '1rem', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }}>Add to Cart</button>
            </div>
        </div>
    );
}

export default ProductDetails;