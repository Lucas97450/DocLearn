import React, { useState, useEffect } from 'react';
import styles from './Slideshow.module.css'; // Import des styles CSS

const Slideshow = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change d'image toutes les 5 secondes
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={styles.slideshow}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === currentIndex ? styles.active : ''
          }`}
        >
          <img src={slide.image} alt={`Slide ${index + 1}`} className={styles.image} />
          <div className={styles.text}>
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
