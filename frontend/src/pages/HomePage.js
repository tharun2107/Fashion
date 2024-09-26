// import React from 'react';
// import { Link } from 'react-router-dom';
// import Slider from 'react-slick';
// import '../style/HomePage.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import img2 from '../images/menhomepage.jpg'; // Corrected the import
// import img3 from '../images/men6.jpg';
// import img4 from '../images/men5.jpg';
// function HomePage() {
//     const sliderSettings = {
//         dots: true,
//         infinite: true,
//         speed: 0,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//     };

//     return (
//         <div className="homepage">
//             <div className="slider-container">
//                 <Slider {...sliderSettings}>
//                     <div>
//                         <img src={img3} alt="Slide 1" />
//                     </div>
//                     <div>
//                         <img src={img2} alt="Slide 2" />
//                     </div>
//                     <div>
//                         <img src={img4} alt="Slide 3" />
//                     </div>
//                 </Slider>
//             </div>

//             <div className="hot-categories">
//                 <h2>Hot Categories</h2>
//                 <div className="categories">
//                     <div className="category">
//                         <Link to="/mensfashion">
//                             {/* <img src="../images/" alt="Women" /> */}
//                             <div className="category-title">Women</div>
//                         </Link>
//                     </div>
//                     <div className="category">
//                         <Link to="/mensfashion">
//                             {/* <img src="../images/men.jpg" alt="Men" /> */}
//                             <div className="category-title">Men</div>
//                         </Link>
//                     </div>
//                     <div className="category img3">
//                         <Link to="/mensfashion">
//                             {/* <img src="../images/shoes.jpg" alt="Shoes" /> */}
//                             <div className="category-title">Shoes</div>
//                         </Link>
//                     </div>
                  
//                 </div>
//             </div>

//             <div className="new-arrivals">
//                 <h2>New Arrivals</h2>
//                 <p>Step Up Your Style with Our Latest Collection</p>
//             </div>

//             <div className="services">
//                 <h2>Services</h2>
//                 <div className="services-list">
//                     <div className="service">
//                         <h3>Free Shipping</h3>
//                         <p>On orders over $50</p>
//                     </div>
//                     <div className="service">
//                         <h3>24/7 Support</h3>
//                         <p>We're here to help</p>
//                     </div>
//                     <div className="service">
//                         <h3>Money Back Guarantee</h3>
//                         <p>30-day money back</p>
//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// }

// function Footer() {
//     return (
//         <footer className="footer">
//             <div className="footer-content">
//                 <p>&copy; 2024 StyleSphere. All rights reserved.</p>
//                 <p>Contact: info@stylesphere.com</p>
//             </div>
//         </footer>
//     );
// }

// export default HomePage;
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img2 from '../images/menhomepage.jpg';
import img3 from '../images/men6.jpg';
import img4 from '../images/image6.jpg';

function HomePage() {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="container mx-auto p-6">
            <div className="slider-container mb-8">
                <Slider {...sliderSettings}>
                    <div>
                        <img src={img3} alt="Slide 1" className="w-full h-96 object-cover rounded-lg shadow-md" />
                    </div>
                    <div>
                        <img src={img2} alt="Slide 2" className="w-full h-96 object-cover rounded-lg shadow-md" />
                    </div>
                    <div>
                        <img src={img4} alt="Slide 3" className="w-full h-96 object-cover rounded-lg shadow-md" />
                    </div>
                </Slider>
            </div>

            <div className="hot-categories mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Hot Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <CategoryCard title="Mens Accessories" link="/mensfashion" />
                    <CategoryCard title="Men" link="/mensfashion" />
                    <CategoryCard title="Shoes" link="/mensfashion" />
                </div>
            </div>

            <div className="new-arrivals mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">New Arrivals</h2>
                <p className="text-gray-600">Step Up Your Style with Our Latest Collection</p>
            </div>

            <div className="services mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ServiceCard title="Free Shipping" description="On orders over $50" />
                    <ServiceCard title="24/7 Support" description="We're here to help" />
                    <ServiceCard title="Money Back Guarantee" description="30-day money back" />
                </div>
            </div>

            <Footer />
        </div>
    );
}

const CategoryCard = ({ title, link }) => (
    <div className="category-card bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
        <Link to={link} className="block p-6 text-center">
            <div className="text-xl font-semibold text-gray-800">{title}</div>
        </Link>
    </div>
);

const ServiceCard = ({ title, description }) => (
    <div className="service-card bg-white rounded-lg shadow-md p-4 text-center transition-transform transform hover:scale-105">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const Footer = () => (
    <footer className="footer bg-gray-800 text-white p-4 mt-12 rounded-lg">
        <div className="footer-content text-center">
            <p>&copy; 2024 StyleSphere. All rights reserved.</p>
            <p>Contact: <a href="mailto:info@stylesphere.com" className="underline">info@stylesphere.com</a></p>
        </div>
    </footer>
);

export default HomePage;
