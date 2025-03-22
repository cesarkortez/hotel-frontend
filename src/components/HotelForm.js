import React, { useState } from 'react';
import api from '../services/api';
import Modal from 'react-modal';
import './HotelView.css';

Modal.setAppElement('#root'); // Indica el elemento principal de la app

const HotelForm = ({ refreshHotels }) => {
  const initialState = {
    name: '',
    address: '',
    city: '',
    nit: '',
    number_of_rooms: '',
    room_configurations: [
      { quantity: '', room_type: 'Estándar', accommodation: 'Sencilla' }
    ]
  };

  const [hotel, setHotel] = useState(initialState);
  const [message, setMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleHotelChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleConfigChange = (index, e) => {
    const newConfigs = hotel.room_configurations.map((config, idx) => {
      if (idx === index) {
        return { ...config, [e.target.name]: e.target.value };
      }
      return config;
    });
    setHotel({ ...hotel, room_configurations: newConfigs });
  };

  const addConfiguration = () => {
    setHotel({
      ...hotel,
      room_configurations: [
        ...hotel.room_configurations,
        { quantity: '', room_type: 'Estándar', accommodation: 'Sencilla' }
      ]
    });
  };

  const removeConfiguration = (index) => {
    const newConfigs = hotel.room_configurations.filter((_, idx) => idx !== index);
    setHotel({ ...hotel, room_configurations: newConfigs });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/hotels', hotel)
      .then(response => {
        setMessage('Hotel creado exitosamente');
        setModalIsOpen(true);
        if (refreshHotels) refreshHotels();
      })
      .catch(error => {
        if (error.response && error.response.data.error) {
          setMessage(error.response.data.error);
        } else {
          setMessage('Error al crear el hotel');
        }
        setModalIsOpen(true);
      });
  };

  // Función para cerrar el modal y limpiar el formulario si fue exitoso
  const closeModal = () => {
    setModalIsOpen(false);
    if (message === 'Hotel creado exitosamente') {
      setHotel(initialState);
      setMessage('');
    }
  };

  return (
    <div className="hotel-form-container">
      <h2 className="form-title">Crear Hotel</h2>
      <form onSubmit={handleSubmit} className="hotel-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" name="name" value={hotel.name} onChange={handleHotelChange} required />
        </div>
        <div className="form-group">
          <label>Dirección:</label>
          <input type="text" name="address" value={hotel.address} onChange={handleHotelChange} required />
        </div>
        <div className="form-group">
          <label>Ciudad:</label>
          <input type="text" name="city" value={hotel.city} onChange={handleHotelChange} required />
        </div>
        <div className="form-group">
          <label>NIT:</label>
          <input type="text" name="nit" value={hotel.nit} onChange={handleHotelChange} required />
        </div>
        <div className="form-group">
          <label>Número de Habitaciones:</label>
          <input type="number" name="number_of_rooms" value={hotel.number_of_rooms} onChange={handleHotelChange} required />
        </div>

        <h3 className="sub-title">Configuración de Habitaciones</h3>
        {hotel.room_configurations.map((config, index) => (
          <div key={index} className="config-group">
            <div className="form-group">
              <label>Cantidad:</label>
              <input type="number" name="quantity" value={config.quantity} onChange={(e) => handleConfigChange(index, e)} required />
            </div>
            <div className="form-group">
              <label>Tipo de Habitación:</label>
              <select name="room_type" value={config.room_type} onChange={(e) => handleConfigChange(index, e)}>
                <option value="Estándar">Estándar</option>
                <option value="Junior">Junior</option>
                <option value="Suite">Suite</option>
              </select>
            </div>
            <div className="form-group">
              <label>Acomodación:</label>
              <select name="accommodation" value={config.accommodation} onChange={(e) => handleConfigChange(index, e)}>
                <option value="Sencilla">Sencilla</option>
                <option value="Doble">Doble</option>
                <option value="Triple">Triple</option>
                <option value="Cuádruple">Cuádruple</option>
              </select>
            </div>
            {hotel.room_configurations.length > 1 && (
              <button type="button" onClick={() => removeConfiguration(index)} className="btn-remove">
                Eliminar Configuración
              </button>
            )}
          </div>
        ))}
        <div className="btn-group">
          <button type="button" onClick={addConfiguration} className="btn-add">Agregar Configuración</button>
          <button type="submit" className="btn-submit">Crear Hotel</button>
        </div>
      </form>

      {/* Modal para mostrar mensajes */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Mensaje de Hotel"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>{message}</h2>
        <button onClick={closeModal} className="btn-close">Cerrar</button>
      </Modal>
    </div>
  );
};

export default HotelForm;
