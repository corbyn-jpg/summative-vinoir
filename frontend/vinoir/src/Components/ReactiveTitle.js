import React, { useState, useEffect } from 'react';
import { Typography, styled } from '@mui/material';

const TitleContainer = styled('div')(({ theme, scrolled }) => ({
  position: 'fixed',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 1100, // Below navbar (1200)
  pointerEvents: 'none',
  transition: 'all 0.4s cubic-bezier(0.28, 0.84, 0.42, 1)',
  // Initial state (large)
  top: scrolled ? '10px' : '80px',
  [theme.breakpoints.down('sm')]: {
    top: scrolled ? '10px' : '70px'
  }
}));

const TitleText = styled(Typography)(({ theme, scrolled }) => ({
  color: 'white',
  fontWeight: 500,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  fontSize: scrolled ? '1.5rem' : '3.5rem',
  transition: 'all 0.4s cubic-bezier(0.28, 0.84, 0.42, 1)',
  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
  [theme.breakpoints.down('md')]: {
    fontSize: scrolled ? '1.3rem' : '2.5rem'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: scrolled ? '1.1rem' : '2rem',
    letterSpacing: scrolled ? '0.1em' : '0.15em'
  }
}));

export default function ReactiveTitle() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <TitleContainer scrolled={scrolled}>
      <TitleText 
        variant="h1" 
        component="div" // Avoid semantic h1 in header
        scrolled={scrolled}
      >
        VINOIRmmmm
      </TitleText>
    </TitleContainer>
  );
}