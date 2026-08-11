/**
 * Product API functions using DummyJSON API.
 * Provides functions to fetch products, categories, and individual product details.
 */

const BASE_URL = 'https://dummyjson.com';

/**
 * Fetches all products from the DummyJSON API.
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 */
export async function fetchAllProducts() {
    const response = await fetch(`${BASE_URL}/products?limit=100`);
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
    }
    const data = await response.json();
    return data.products;
}

/**
 * Fetches all product categories from the DummyJSON API.
 * @returns {Promise<Array<string>>} A promise that resolves to an array of category strings.
 */
export async function fetchAllCategories() {
    const response = await fetch(`${BASE_URL}/products/category-list`);
    if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

/**
 * Fetches a single product by its ID from the DummyJSON API.
 * @param {number|string} id - The product ID.
 * @returns {Promise<Object>} A promise that resolves to a product object.
 */
export async function fetchProductById(id) {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch product with ID ${id}: ${response.status}`);
    }
    const data = await response.json();
    return data;
}