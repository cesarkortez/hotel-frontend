import React from 'react';
import './HotelHome.css';

const HotelHome = () => {
  return (
    <div className="hotel-home">
      {/* Sección Hero */}
      <div className="hero">
        <img
          src="/images/hero.jpg"  // Ruta relativa a la carpeta public
          alt="Hotel Decameron"
          className="hero-image"
        />
        <div className="hero-overlay">
          <h1 className="hero-title">Hotel Decameron</h1>
          <p className="hero-subtitle">
            Vive una experiencia única en un ambiente moderno y de lujo.
          </p>
          <button className="hero-button">Descubre Más</button>
        </div>
      </div>

      {/* Sección de características */}
      <section className="features">
        <div className="feature">
          <img
            src="/images/pool.jpg"
            alt="Piscina"
            className="feature-image"
          />
          <h3 className="feature-title">Piscinas de Ensueño</h3>
          <p className="feature-description">
            Relájate en nuestras exclusivas áreas de piscina con diseño vanguardista.
          </p>
        </div>
        <div className="feature">
          <img
            src="/images/restaurant.jpg"
            alt="Restaurante"
            className="feature-image"
          />
          <h3 className="feature-title">Gastronomía Exquisita</h3>
          <p className="feature-description">
            Disfruta de platos elaborados por chefs de talla internacional.
          </p>
        </div>
        <div className="feature">
          <img
            src="/images/spa.jpg"
            alt="Spa"
            className="feature-image"
          />
          <h3 className="feature-title">Spa y Bienestar</h3>
          <p className="feature-description">
            Experimenta momentos de relax y bienestar en nuestro exclusivo spa.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HotelHome;

