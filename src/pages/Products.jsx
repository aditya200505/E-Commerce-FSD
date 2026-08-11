import React, { useState, useEffect, useContext } from 'react';
import ProductCard from "../components/ProductCard";
import { fetchAllProducts, fetchAllCategories } from '../productApi';
import { CartContext } from '../App';

function ProductsPage(){ 
  const { addToCart } = useContext(CartContext);
  const [allProducts, setAllProducts] = useState([]); 
  const [displayedProducts, setDisplayedProducts] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState('all'); 
  const [sortOrder, setSortOrder] = useState('default');
  useEffect(() => { 
    const getInitialData = async () => { 
      setLoading(true); 
      setError(null); 
      try { 
        const [productsData, categoriesData] = await Promise.all([
          fetchAllProducts(),
          fetchAllCategories()
        ]);
        setAllProducts(productsData); // Store all original products
        setDisplayedProducts(productsData); // Initially display all products
        setCategories(['all', ...categoriesData]); // Add 'all' option to categories
      } catch (err) {
        setError('Failed to load products.');
        console.error('Error fetching initial data for Products page:', err);
      } finally {
        setLoading(false);
      }
    };
    getInitialData();
  }, []); 

  useEffect(() => {
    let currentProducts = [...allProducts];

    if (searchTerm) {
      currentProducts = currentProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      currentProducts = currentProducts.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (sortOrder === 'price-asc') {
      currentProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      currentProducts.sort((a, b) => b.price - a.price);
    }

    setDisplayedProducts(currentProducts);
  }, [allProducts, searchTerm, selectedCategory, sortOrder]);

  if (loading) {
    return <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Loading products...</h1>;
  }

  if (error) {
    return <h1 style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>{error}</h1>;
  }

  return ( 
    <div className="products-page" style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 20px' }}> 
      <h1>Our Products</h1> 
      <div className="controls" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>  
        <input type="text" placeholder="Search products by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: '2', minWidth: '200px', padding: '0.8rem', border: '1px solid #ced4da', borderRadius: '5px' }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ flex: '1', minWidth: '150px', padding: '0.8rem', border: '1px solid #ced4da', borderRadius: '5px' }}
        >
          {categories.map((category, index) => {
            const catStr = typeof category === 'object' ? (category.name || category.slug || String(category)) : String(category);
            return (
              <option key={catStr + index} value={catStr}>
                {catStr.charAt(0).toUpperCase() + catStr.slice(1).replace(/-/g, ' ')}
              </option>
            );
          })}
        </select>

        {/* Price Sorting */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ flex: '1', minWidth: '150px', padding: '0.8rem', border: '1px solid #ced4da', borderRadius: '5px' }}
        >
          <option value="default">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      
      <div className="products"> 
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
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
              onAddToCart={addToCart} // Pass addToCart function as prop
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%', color: '#6c757d' }}>No products found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;