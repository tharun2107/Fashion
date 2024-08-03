import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';
import '../style/OrdersPage.css'; // Importing the CSS file

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const { user } = useUserContext();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/orders', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders', error);
            }
        };
        fetchOrders();
    }, [user]);

    return (
        <div className="orders-page">
            <h2>Your Orders</h2>
            {orders.length > 0 ? (
                orders.map(order => (
                    <div key={order._id} className="order">
                        <h3>Order ID: {order._id}</h3>
                        {order.products.map(product => (
                            <div key={product._id} className="order-product">
                                <img src={product.productId.image} alt={product.name} />
                                <h4>{product.name}</h4>
                                <p>Quantity: {product.quantity}</p>
                                <p>Price: ₹{product.price}</p>
                            </div>
                        ))}
                        <p className="total-price">Total Price: ₹{order.totalPrice}</p>
                    </div>
                ))
            ) : (
                <p>You have no orders</p>
            )}
        </div>
    );
}

export default OrdersPage;
