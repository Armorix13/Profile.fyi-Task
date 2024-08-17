import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
};

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/product');
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                setProducts(response.data.data.products);
            } catch (error: any) {
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    image={product.image}
                    title={product.name}
                    description={product.description}
                    link={`/product/${product._id}`}
                />
            ))}
        </div>
    );
};

export default ProductList;
