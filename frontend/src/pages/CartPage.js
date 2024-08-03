// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useUserContext } from '../context/UserContext';
// import '../style/CartPage.css'; // Importing the CSS file

// function CartPage() {
//     const [cart, setCart] = useState(null);
//     const [editing, setEditing] = useState(null); // Track which product is being edited
//     const [tempQuantity, setTempQuantity] = useState(0); // Temporary quantity for editing
//     const { user } = useUserContext();

//     useEffect(() => {
//         const fetchCart = async () => {
//             try {
//                 const { data } = await axios.get('http://localhost:5000/api/cart', {
//                     headers: {
//                         Authorization: `Bearer ${user.token}`,
//                     },
//                 });
//                 setCart(data);
//             } catch (error) {
//                 console.error('Failed to fetch cart', error);
//             }
//         };
//         fetchCart();
//     }, [user]);

//     const removeFromCart = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/cart/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${user.token}`,
//                 },
//             });
//             setCart(cart => ({
//                 ...cart,
//                 products: cart.products.filter(product => product.productId && product.productId._id !== id),
//             }));
//         } catch (error) {
//             console.error('Failed to remove product from cart', error);
//         }
//     };

//     const saveQuantity = async (productId, quantity) => {
//         try {
//             await axios.put('http://localhost:5000/api/cart', { productId, quantity }, {
//                 headers: {
//                     Authorization: `Bearer ${user.token}`,
//                 },
//             });
//             setCart(cart => ({
//                 ...cart,
//                 products: cart.products.map(product =>
//                     product.productId && product.productId._id === productId ? { ...product, quantity } : product
//                 ),
//             }));
//             setEditing(null); // Exit editing mode
//         } catch (error) {
//             console.error('Failed to update product quantity', error);
//         }
//     };

//     const cancelEdit = () => {
//         setEditing(null); // Exit editing mode without saving
//     };

//     const startEditing = (productId, currentQuantity) => {
//         setEditing(productId); // Set editing mode for the product
//         setTempQuantity(currentQuantity); // Set the temporary quantity to the current quantity
//     };

//     return (
//         <div className="cart-page">
//             {cart && cart.products.length > 0 ? (
//                 cart.products.map(product => (
//                     product.productId ? ( // Check if product.productId is not null
//                         <div key={product.productId._id} className="cart-product">
//                             <img src={product.productId.image || ''} alt={product.productId.name || 'No name'} />
//                             <h3>{product.productId.name || 'No name'}</h3>
//                             {editing === product.productId._id ? (
//                                 <div className="edit-quantity">
//                                     <input
//                                         type="number"
//                                         value={tempQuantity}
//                                         onChange={(e) => setTempQuantity(Number(e.target.value))}
//                                         min="1"
//                                         max={product.productId.countInStock || 1} // Assuming `countInStock` is part of the product data
//                                     />
//                                     <button onClick={() => saveQuantity(product.productId._id, tempQuantity)}>Save</button>
//                                     <button onClick={cancelEdit}>Cancel</button>
//                                 </div>
//                             ) : (
//                                 <div>
//                                     <p>Quantity: {product.quantity}</p>
//                                     <button onClick={() => startEditing(product.productId._id, product.quantity)}>Edit</button>
//                                 </div>
//                             )}
//                             <p>Total Price: ₹{(product.productId.price * product.quantity).toFixed(2) || 'N/A'}</p>
//                             <button onClick={() => removeFromCart(product.productId._id)}>Remove</button>
//                         </div>
//                     ) : (
//                         <div key={product._id} className="cart-product">
//                             <p>Invalid product data</p>
//                         </div>
//                     )
//                 ))
//             ) : (
//                 <p>Your cart is empty</p>
//             )}
//         </div>
//     );
// }

// export default CartPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';
import '../style/CartPage.css'; // Importing the CSS file

function CartPage() {
    const [cart, setCart] = useState(null);
    const [editing, setEditing] = useState(null); // Track which product is being edited
    const [tempQuantity, setTempQuantity] = useState(0); // Temporary quantity for editing
    const { user } = useUserContext();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/cart', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setCart(data);
            } catch (error) {
                console.error('Failed to fetch cart', error);
            }
        };
        fetchCart();
    }, [user]);

    const removeFromCart = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/cart/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setCart(cart => ({
                ...cart,
                products: cart.products.filter(product => product.productId && product.productId._id !== id),
            }));
        } catch (error) {
            console.error('Failed to remove product from cart', error);
        }
    };

    const saveQuantity = async (productId, quantity) => {
        try {
            await axios.put('http://localhost:5000/api/cart', { productId, quantity }, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setCart(cart => ({
                ...cart,
                products: cart.products.map(product =>
                    product.productId && product.productId._id === productId ? { ...product, quantity } : product
                ),
            }));
            setEditing(null); // Exit editing mode
        } catch (error) {
            console.error('Failed to update product quantity', error);
        }
    };

    const cancelEdit = () => {
        setEditing(null); // Exit editing mode without saving
    };

    const startEditing = (productId, currentQuantity) => {
        setEditing(productId); // Set editing mode for the product
        setTempQuantity(currentQuantity); // Set the temporary quantity to the current quantity
    };

   

    // const checkout = async () => {
    //     try {
    //         const totalPrice = cart.products.reduce((total, product) => total + product.productId.price * product.quantity, 0);
    
    //         const { data: order } = await axios.post('http://localhost:5000/api/payment/orders', {
    //             amount: totalPrice,
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${user.token}`,
    //             },
    //         });
    
    //         const options = {
    //             key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    //             amount: order.amount,
    //             currency: order.currency,
    //             name: 'FashionShop',
    //             description: 'Thank you for your purchase!',
    //             order_id: order.id,
    //             handler: async function (response) {
    //                 try {
    //                     await axios.post('http://localhost:5000/api/payment/verify', {
    //                         orderId: order.id,
    //                         paymentId: response.razorpay_payment_id,
    //                         signature: response.razorpay_signature,
    //                     }, {
    //                         headers: {
    //                             Authorization: `Bearer ${user.token}`,
    //                         },
    //                     });
    
    //                     const orderResponse = await axios.post('http://localhost:5000/api/orders', {
    //                         products: cart.products.map(product => ({
    //                             productId: product.productId._id,
    //                             name: product.productId.name,
    //                             quantity: product.quantity,
    //                             price: product.productId.price,
    //                         })),
    //                         totalPrice,
    //                     }, {
    //                         headers: {
    //                             Authorization: `Bearer ${user.token}`,
    //                         },
    //                     });
    
    //                     console.log('Order creation response:', orderResponse.data);
    
    //                     await axios.delete('http://localhost:5000/api/cart', {
    //                         headers: {
    //                             Authorization: `Bearer ${user.token}`,
    //                         },
    //                     });
    
    //                     setCart({ products: [] });
    //                     alert('Payment successful and order created');
    //                 } catch (error) {
    //                     console.error('Failed to process payment or create order', error);
    //                     alert('Payment verification or order creation failed');
    //                 }
    //             },
    //             prefill: {
    //                 name: user.username,
    //                 email: user.email,
    //             },
    //             theme: {
    //                 color: '#3399cc',
    //             },
    //         };
    
    //         const rzp1 = new window.Razorpay(options);
    //         rzp1.open();
    //     } catch (error) {
    //         console.error('Failed to initiate checkout', error);
    //     }
    // };
    
    const checkout = async () => {
        try {
            const totalPrice = cart.products.reduce((total, product) => total + product.productId.price * product.quantity, 0);
    
            const { data: order } = await axios.post('http://localhost:5000/api/payment/orders', {
                amount: totalPrice,
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
    
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'FashionShop',
                description: 'Thank you for your purchase!',
                order_id: order.id,
                handler: async function (response) {
                    try {
                        await axios.post('http://localhost:5000/api/payment/verify', {
                            orderId: order.id,
                            paymentId: response.razorpay_payment_id,
                            signature: response.razorpay_signature,
                        }, {
                            headers: {
                                Authorization: `Bearer ${user.token}`,
                            },
                        });
    
                        const orderResponse = await axios.post('http://localhost:5000/api/orders', {
                            products: cart.products.map(product => ({
                                productId: product.productId._id,
                                name: product.productId.name,
                                quantity: product.quantity,
                                price: product.productId.price,
                            })),
                            totalPrice,
                        }, {
                            headers: {
                                Authorization: `Bearer ${user.token}`,
                            },
                        });
    
                        console.log('Order creation response:', orderResponse.data);
    
                        await axios.delete('http://localhost:5000/api/cart', {
                            headers: {
                                Authorization: `Bearer ${user.token}`,
                            },
                        });
    
                        setCart({ products: [] });
                        alert('Payment successful and order created');
                    } catch (error) {
                        console.error('Failed to process payment or create order', error);
                        alert('Payment verification or order creation failed');
                    }
                },
                prefill: {
                    name: user.username,
                    email: user.email,
                },
                theme: {
                    color: '#3399cc',
                },
            };
    
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error('Failed to initiate checkout', error);
        }
    };
    
    return (
        <div className="cart-page">
            {cart && cart.products.length > 0 ? (
                <>
                    {cart.products.map(product => (
                        product.productId ? ( // Check if product.productId is not null
                            <div key={product.productId._id} className="cart-product">
                                <img src={product.productId.image || ''} alt={product.productId.name || 'No name'} />
                                <h3>{product.productId.name || 'No name'}</h3>
                                {editing === product.productId._id ? (
                                    <div className="edit-quantity">
                                        <input
                                            type="number"
                                            value={tempQuantity}
                                            onChange={(e) => setTempQuantity(Number(e.target.value))}
                                            min="1"
                                            max={product.productId.countInStock || 1} // Assuming `countInStock` is part of the product data
                                        />
                                        <button onClick={() => saveQuantity(product.productId._id, tempQuantity)}>Save</button>
                                        <button onClick={cancelEdit}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        <p>Quantity: {product.quantity}</p>
                                        <button onClick={() => startEditing(product.productId._id, product.quantity)}>Edit</button>
                                    </div>
                                )}
                                <p>Total Price: ₹{(product.productId.price * product.quantity).toFixed(2) || 'N/A'}</p>
                                <button onClick={() => removeFromCart(product.productId._id)}>Remove</button>
                            </div>
                        ) : (
                            <div key={product._id} className="cart-product">
                                <p>Invalid product data</p>
                            </div>
                        )
                    ))}
                    <button onClick={checkout} className="checkout">Checkout</button>
                </>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
}

export default CartPage;
