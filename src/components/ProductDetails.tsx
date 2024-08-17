import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import axios from 'axios';
import './ProductDetail.css';

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
};

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://44.196.8.152:5000/api/product/${id}`);
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                setProduct(response.data.data.products);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart(product));
            navigate('/cart');
        }
    };

    const handleBuyNow = () => {
        if (product) {
            dispatch(addToCart(product));
            navigate('/order');
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!product) {
        return <div className="not-found">Product not found</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail-grid">
                <div className="image-container">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                    />
                    <div className="image-overlay">
                        <p className="image-overlay-text">Hover to Enlarge</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="product-title">{product.name}</h1>
                        <p className="product-price">₹{product.price}</p>
                        <p className="product-description">{product.description}</p>
                    </div>
                    <div className="button-container">
                        <button
                            onClick={handleAddToCart}
                            className="button add-to-cart"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="button buy-now"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
