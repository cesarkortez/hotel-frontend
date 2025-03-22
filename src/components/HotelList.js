import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelForm from './HotelForm';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Efecto para cargar la lista de hoteles al montar el componente
  useEffect(() => {
    axios.get('http://localhost:8000/api/hotels')
      .then((response) => {
        setHotels(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al obtener los hoteles');
      });
  }, []);

  // Función para alternar la visualización del formulario
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <h2>Listado de Hoteles</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id}>
            <strong>{hotel.name}</strong> - {hotel.city} - {hotel.address}
          </li>
        ))}
      </ul>

      {/* Botón para mostrar u ocultar el formulario */}
      <button onClick={toggleForm}>
        {showForm ? 'Ocultar Formulario' : 'Crear Hotel'}
      </button>

      {/* Renderiza el formulario si showForm es true */}
      {showForm && <HotelForm />}
    </div>
  );
};

export default HotelList;



