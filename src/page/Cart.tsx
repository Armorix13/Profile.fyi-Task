import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import './cart.css';

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

const Cart: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items as CartItem[]);

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">
                    Your cart is empty. <Link to="/" className="cart-link">Go back to shopping.</Link>
                </p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3 className="text-lg">{item.name}</h3>
                                <p>Price: ₹{item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                    <Link to="/order" className="proceed-button">Proceed to Order</Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
