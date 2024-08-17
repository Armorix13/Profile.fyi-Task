import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductList.module.css';

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
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const truncateDescription = (description: string, maxLength: number) => {
        return description.length > maxLength ? description.slice(0, maxLength) + '...' : description;
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingText}>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.errorText}>Error: {error}</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {products.map((product) => (
                <div key={product._id} className={styles.productCard}>
                    <Link to={`/product/${product._id}`} className={styles.link}>
                        <img src={product.image} alt={product.name} className={styles.image} />
                        <div className={styles.textContainer}>
                            <h2 className={styles.productName}>{product.name}</h2>
                            <div className={styles.flexitem}>
                                <p className={styles.productDescription}>{truncateDescription(product.description, 50)}
                                </p>
                                <Link to={`/product/${product._id}`} className={styles.showMoreLink}>
                                    Show More
                                </Link>
                            </div>
                            <p className={styles.productPrice}>₹{product.price}</p>
                        </div>
                    </Link>

                </div>
            ))}
        </div>
    );
};

export default ProductList;
