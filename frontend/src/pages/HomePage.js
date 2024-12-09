import React,{useState,useEffect} from 'react';
import '../style/HomePage.css'; // Add the corresponding CSS file for styling
import axios from 'axios';
import { Link } from 'react-router-dom';
const HomePage = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for contacting us!');
        // handle the form submission logic (e.g., send data to an API)
      };
      const [products, setProducts] = useState([]);

      useEffect(() => {
        // Fetch products from the API
        const fetchProducts = async () => {
          try {
            const { data } = await axios.get('http://localhost:5000/api/products');
            // Display only the first 4 products
            setProducts(data.slice(0, 4));
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
    
        fetchProducts();
      }, []);
    return (
      <div className="homepage">
        {/* Navbar */}
       
  
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-overlay">
            <h1>Style That Speaks</h1>
            <p>Explore the finest collection of men's fashion for every occasion.</p>
            <button className="shop-now-btn">Shop Now</button>
          </div>
        </section>
  
        <section className="shop-category-section">
      <h2 className="shop-category-title">Shop By Category</h2>
      <div className="shop-category-container">
        <div className="category-item" style={{ backgroundImage: 'url(https://static.wixstatic.com/media/c837a6_e4039f612bfc443eb0d8dc72af0e4e18~mv2.jpg/v1/fill/w_450,h_620,fp_0.59_0.22,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/templatesdrive_30_yo_queer_man_wearing_buttoned_down_and_tailor_2331728c-3e86-463f-8d68-f9.jpg)' }}>
          <button className="category-button">SHIRTS</button>
        </div>
        <div className="category-item" style={{ backgroundImage: 'url(https://static.wixstatic.com/media/c837a6_87e15407f0e246a690f9d907ffcd3cb2~mv2.jpg/v1/fill/w_450,h_620,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/mayagi_fashoin_shot_of_a_man_wearing_a_Coastal_Linen_pants__The_5ea32b6b-a0a6-4268-9bc2-76.jpg)' }}>
          <button className="category-button">PANTS</button>
        </div>
        <div className="category-item" style={{ backgroundImage: 'url(https://static.wixstatic.com/media/84770f_4f89d3118543426e8f96037dfbb94c9b~mv2.jpg/v1/fill/w_450,h_620,fp_0.56_0.24,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/02_mayagi_a_25_yo_queer_man_standing_in_a_sunlit_old_city_in_italy_65b19b1a-9d5f-4454-9462.jpg)' }}>
          <button className="category-button">JACKETS</button>
        </div>
        <div className="category-item" style={{ backgroundImage: 'url(https://static.wixstatic.com/media/84770f_b87c0ee0b94f49e78838c5d3745df44e~mv2.jpg/v1/fill/w_450,h_620,fp_0.49_0.22,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/mayagi_long_shot_of_a_german_man_wearing_a_jeans_jacket__he_als_1b7108bd-8e5c-4589-9165-eb.jpg)' }}>
          <button className="category-button">DENIM</button>
        </div>
      </div>
    </section>
    <section className="featured-products-section">
      <h2 className="featured-products-title">Featured Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id} className="product-card">
            <div
              className="product-image"
              style={{ backgroundImage: `url(${product.image})` }}
            >
              
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-prices">
              ₹{product.price}
             
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>


        {/* Contact Us */}
        <section className="contact-us-section">
      <div className="contact-form-container">
        <h2 className="contact-us-title">Contact Us</h2>
        <p className="contact-us-description">
          We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-input"
              placeholder="Write your message here"
            />
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </section>
      </div>
    );
  };
  
  export default HomePage;
