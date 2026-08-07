import ProductCard from "../components/ProductCard";
import products from "../data/products"; // Import the products data

function Products(){

  return (
    <div>
      <h1>Products</h1>
      <div className="products">
        {products.map((item) => {
          return (
            <ProductCard
              key={item.id}
              product={item} // Pass the entire item object as a prop
            />
          );
        })}
      </div>
    </div>
  );
}

export default Products;