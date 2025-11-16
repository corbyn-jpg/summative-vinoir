import React from "react";
import { 
  Box, 
  Typography, 
  Container,
  Grid,
  Card,
  CardContent,
  Avatar
} from "@mui/material";
import { 
  Star, 
  EmojiEvents,
  Schedule,
  LocalFlorist
} from "@mui/icons-material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import HeroSection from "../../Components/HeroSection";
import Founder from "../../Components/Founder/Founder";
import "./About.css";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// ✅ Static image imports
import marioImg from "../../assets/founders/mario.jpg";
import corbynImg from "../../assets/founders/corbyn.jpg";
import tristianImg from "../../assets/founders/tristian.jpg";
import heroImage from "../../assets/spritz.jpeg";
import heroVideo from "../../assets/Scents.mp4";

const AboutPage = () => {
  // Luxury Brand Statistics
  const brandStats = [
    { icon: <EmojiEvents />, number: "50+", label: "Signature Scents" },
    { icon: <Star />, number: "10K+", label: "Satisfied Clients" },
    { icon: <LocalFlorist />, number: "25", label: "Countries Served" },
    { icon: <Schedule />, number: "5", label: "Years of Excellence" }
  ];

  // Customer Testimonials
  const testimonials = [
    {
      name: "Sophia Laurent",
      role: "Fashion Editor",
      avatar: "/images/dior1.jpg",
      rating: 5,
      text: "Vinoir has become my signature scent. The quality and longevity are unmatched in luxury fragrances."
    },
    {
      name: "James Richardson",
      role: "Business Executive", 
      avatar: "/images/dior2.jpg",
      rating: 5,
      text: "The custom blend service exceeded all expectations. Truly a personalized luxury experience."
    },
    {
      name: "Elena Rossi",
      role: "Interior Designer",
      avatar: "/images/dior3.jpeg", 
      rating: 5,
      text: "Each fragrance tells a story. Vinoir captures emotions in the most beautiful way."
    }
  ];

  const founders = [
    {
      name: "Mario Surprise Ojo",
      role: "Creative Director",
      bio: "With a background in luxury branding and a passion for natural aromas, Mario leads our scent development and creative vision.",
      image: marioImg,
    },
    {
      name: "Corbyn Robinson",
      role: "Master Perfumer",
      bio: "Corbyn's expertise in extracting and blending natural essences brings our wilderness-inspired fragrances to life.",
      image: corbynImg,
    },
    {
      name: "Tristian Leech",
      role: "Operations Director",
      bio: "Tristian ensures our sustainable sourcing and maintains relationships with our exclusive clientele worldwide.",
      image: tristianImg,
    },
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="hero-wrapper">
        <HeroSection
          title={"ABOUT VINOIR"}
          backgroundImage={heroImage}
          buttonText={"CONTACT"}
          buttonLink={"/contact"}
          videoSrc={heroVideo}
        />
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At Vinoir, we craft exclusive fragrances inspired by the untamed
            wilderness of Africa. Each scent is a journey into nature's most
            intimate secrets, designed for those who seek authenticity in luxury.
          </p>
        </div>
      </div>

      {/* ===== BRAND STATISTICS ===== */}
      <Box sx={{ py: 8, background: 'rgba(45, 90, 61, 0.02)' }}>
        <Container maxWidth="xl">
          <Typography 
            variant="h2" 
            sx={{
              textAlign: 'center',
              fontFamily: '"Playfair Display", serif',
              color: '#90d4a7',
              mb: 6,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            Our Achievements
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {brandStats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,245,242,0.9) 100%)',
                    borderRadius: '20px',
                    border: '1px solid rgba(45, 90, 61, 0.1)',
                    boxShadow: '0 10px 30px rgba(45, 90, 61, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 40px rgba(45, 90, 61, 0.15)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #90d4a7 0%, #a683e3 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        color: 'white'
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography 
                      variant="h3" 
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 'bold',
                        color: '#2d5a3d',
                        mb: 1
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Founders Section */}
      <div className="founders-section">
        <h2 className="section-title">The Visionaries Behind Vinoir</h2>
        <div className="founders-grid">
          {founders.map((founder, index) => (
            <Founder
              key={index}
              name={founder.name}
              role={founder.role}
              bio={founder.bio}
              image={founder.image}
            />
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="process-section">
        <h2 className="section-title">Our Artisanal Process</h2>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Wild Harvesting</h3>
            <p>
              Our team ventures into protected wilderness areas to hand-select
              botanicals at peak potency.
            </p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Slow Extraction</h3>
            <p>
              Using traditional methods, we patiently extract essences to
              preserve their full complexity.
            </p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Master Blending</h3>
            <p>
              Each fragrance is carefully composed by our perfumers and aged
              like fine wine.
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="philosophy-section">
        <div className="philosophy-content">
          <h2>The Vinoir Philosophy</h2>
          <p>
            We believe true luxury lies in connection — to nature, to
            craftsmanship, and to the self. Our fragrances are sensory
            narratives that evoke the wild spirit of Africa.
          </p>
          <p>
            By maintaining strict exclusivity (limited to 500 bottles per
            fragrance annually), we ensure each creation remains as rare as the
            landscapes that inspire it.
          </p>
        </div>
      </div>

      {/* ===== CUSTOMER TESTIMONIALS ===== */}
      <Box sx={{ py: 8, background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)' }}>
        <Container maxWidth="xl">
          <Typography 
            variant="h2" 
            sx={{
              textAlign: 'center',
              fontFamily: '"Playfair Display", serif',
              color: 'white',
              mb: 6
            }}
          >
            What Our Clients Say
          </Typography>

          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 300,
              modifier: 2,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="testimonials-swiper"
            style={{ paddingBottom: '50px' }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} style={{ width: '400px' }}>
                <Card
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,245,242,0.9) 100%)',
                    borderRadius: '24px',
                    border: '1px solid rgba(45, 90, 61, 0.1)',
                    boxShadow: '0 20px 40px rgba(45, 90, 61, 0.1)',
                    height: 320
                  }}
                >
                  <Avatar
                    src={testimonial.avatar}
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      border: '3px solid #6a4c93'
                    }}
                  />
                  <Typography 
                    variant="h6" 
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      color: '#2d5a3d',
                      mb: 1
                    }}
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {testimonial.role}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} sx={{ color: '#ffd700', fontSize: 20 }} />
                    ))}
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      color: '#555'
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Box>
    </div>
  );
};

export default AboutPage;
