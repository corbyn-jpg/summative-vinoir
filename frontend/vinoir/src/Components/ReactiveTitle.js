import React, { useState, useEffect } from 'react';
import { Typography, styled } from '@mui/material';

const TitleContainer = styled('div')({
  position: 'fixed',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 1100, // Below navbar
  pointerEvents: 'none',
  top: 0, // Fixed at top
  padding: '20px 0',
  backgroundColor: 'transparent' // Or your preferred background
});

const TitleText = styled(Typography)(({ theme, scrolled }) => ({
  color: 'white',
  fontWeight: 500,
  letterSpacing: scrolled ? '0.1em' : '0.15em',
  textTransform: 'uppercase',
  fontSize: scrolled ? '1.5rem' : '3.5rem',
  transition: 'all 0.4s cubic-bezier(0.28, 0.84, 0.42, 1)',
  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
  [theme.breakpoints.down('md')]: {
    fontSize: scrolled ? '1.3rem' : '2.5rem'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: scrolled ? '1.1rem' : '2rem'
  }
}));

export default function ReactiveTitle() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <TitleContainer>
      <TitleText component="div" scrolled={scrolled}>
        VINOIR
      </TitleText>
    </TitleContainer>
  );
}