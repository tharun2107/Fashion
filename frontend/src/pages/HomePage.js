import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import '../style/HomePage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img2 from '../images/menhomepage.jpg'; // Corrected the import
import img3 from '../images/men6.jpg';
import img4 from '../images/men5.jpg';
function HomePage() {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 0,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="homepage">
            <div className="slider-container">
                <Slider {...sliderSettings}>
                    <div>
                        <img src={img3} alt="Slide 1" />
                    </div>
                    <div>
                        <img src={img2} alt="Slide 2" />
                    </div>
                    <div>
                        <img src={img4} alt="Slide 3" />
                    </div>
                </Slider>
            </div>

            <div className="hot-categories">
                <h2>Hot Categories</h2>
                <div className="categories">
                    <div className="category">
                        <Link to="/mensfashion">
                            {/* <img src="../images/" alt="Women" /> */}
                            <div className="category-title">Women</div>
                        </Link>
                    </div>
                    <div className="category">
                        <Link to="/mensfashion">
                            {/* <img src="../images/men.jpg" alt="Men" /> */}
                            <div className="category-title">Men</div>
                        </Link>
                    </div>
                    <div className="category img3">
                        <Link to="/mensfashion">
                            {/* <img src="../images/shoes.jpg" alt="Shoes" /> */}
                            <div className="category-title">Shoes</div>
                        </Link>
                    </div>
                  
                </div>
            </div>

            <div className="new-arrivals">
                <h2>New Arrivals</h2>
                <p>Step Up Your Style with Our Latest Collection</p>
            </div>

            <div className="services">
                <h2>Services</h2>
                <div className="services-list">
                    <div className="service">
                        <h3>Free Shipping</h3>
                        <p>On orders over $50</p>
                    </div>
                    <div className="service">
                        <h3>24/7 Support</h3>
                        <p>We're here to help</p>
                    </div>
                    <div className="service">
                        <h3>Money Back Guarantee</h3>
                        <p>30-day money back</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 StyleSphere. All rights reserved.</p>
                <p>Contact: info@stylesphere.com</p>
            </div>
        </footer>
    );
}

export default HomePage;
