import React from 'react';
import ShopSection from '../../Components/ShopSection';
import HeroSection from '../../Components/HeroSection';

function AboutPage() {
  return (
    <div>
      {/* Add your search functionality here */}
      <div style={{ borderRadius: '25px', overflow: 'hidden', marginBottom: '50px', height: '77vh', marginTop: '70px' }}>
        <HeroSection title={"ABOUT VINOIR"} backgroundImage={require('../../assets/spritz.jpeg')} buttonText={"CONTACT"} videoSrc={require("../../assets/scents.mp4")}></HeroSection>
      </div>
      <div style={{ borderRadius: '25px', display: 'flex', flexDirection: 'column', backgroundImage: `url(${require('../../assets/rose.jpeg')})`, backgroundSize: '100%', backgroundPosition: 'center', padding: '180px', color: 'white', textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{marginTop:"40px", color:"#BAB9B9", textAlign:"left"}}>Our Goal</h1>
        <p style={{marginTop:"40px", color:"#BAB9B9"}}>Vinoir is a unique online store that specializes in selling wine and perfume. Our mission is to provide a curated selection of high-quality wines and exquisite perfumes, ensuring that our customers can enjoy the best of both worlds. Whether you're looking for a fine wine to complement your meal or a signature scent to express your personality, Vinoir has something special for you.</p>
        <p style={{marginTop:"40px", color:"#BAB9B9"}}>We believe in the art of pairing the perfect wine with the right fragrance, creating an experience that tantalizes the senses. Our team is dedicated to sourcing the finest products from around the world, ensuring that every item we offer meets our high standards of quality and excellence.</p>
      </div>
      
    </div>
  );
}

export default AboutPage;