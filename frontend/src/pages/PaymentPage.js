// PaymentPage.js (Frontend setup)
import React, { useState ,useEffect} from 'react';
import axios from 'axios';

const PaymentPage = () => {
    const [amount, setAmount] = useState('');

    const loadRazorpay = async () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            console.log('Razorpay SDK loaded successfully');
        };
        script.onerror = () => {
            console.error('Razorpay SDK failed to load');
        };
        document.body.appendChild(script);
    };

    const handlePayment = async () => {
        const orderUrl = 'http://localhost:5000/api/payment/orders';
        const { data } = await axios.post(orderUrl, { amount: amount, currency: 'INR' });

        const options = {
            key: 'YOUR_RAZORPAY_KEY_ID',
            amount: data.amount,
            currency: data.currency,
            name: 'FashionShop',
            description: 'Test Transaction',
            order_id: data.id,
            handler: async (response) => {
                const paymentId = response.razorpay_payment_id;
                const orderId = response.razorpay_order_id;
                const signature = response.razorpay_signature;

                const verifyUrl = 'http://localhost:5000/api/payment/verify';
                const { data } = await axios.post(verifyUrl, {
                    orderId,
                    paymentId,
                    signature,
                });

                alert('Payment successful');
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
                contact: '9999999999',
            },
            notes: {
                address: 'Customer Address',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    useEffect(() => {
        loadRazorpay();
    }, []);

    return (
        <div>
            <h2>Pay with Razorpay</h2>
            <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default PaymentPage;
