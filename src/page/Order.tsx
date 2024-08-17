// src/components/Order.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Update this import to match your store file path
import './Order.css'; // Import the external CSS file

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

const Order: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items as CartItem[]);

    return (
        <div className="order-container">
            <h2 className="order-title">Order Summary</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">No items in the order.</p>
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
                    <button className="place-order-button">Place Order</button>
                </div>
            )}
        </div>
    );
};

export default Order;
