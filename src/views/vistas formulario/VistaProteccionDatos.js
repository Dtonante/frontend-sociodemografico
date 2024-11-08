import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VistaProteccionDatos = () => {
  const [aceptaDatos, setAceptaDatos] = useState(null);
  const navigate = useNavigate();

  const manejarCambioCheckbox = (e) => {
    setAceptaDatos(e.target.value === "si");
  };

  const manejarClickSiguiente = () => {
    if (aceptaDatos) {
      localStorage.setItem('aceptaDatos', JSON.stringify(aceptaDatos));
      navigate('/datosUsuario');
    } else {
      alert("Debes aceptar la manipulación de tus datos para continuar.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Ley de Protección y Manipulación de Datos</h1>
      <p>
        En cumplimiento con la normativa vigente sobre protección y manipulación de datos, queremos informarle sobre la política de manejo de sus datos personales. Al aceptar, usted consiente el uso de sus datos bajo las condiciones expuestas.
      </p>
      <div style={{ display: 'block', margin: '20px 0' }}>
        <label>
          <input
            type="radio"
            name="aceptaDatos"
            value="si"
            checked={aceptaDatos === true}
            onChange={manejarCambioCheckbox}
          />
          Sí, acepto la manipulación de mis datos
        </label>
        <label style={{ marginLeft: '15px' }}>
          <input
            type="radio"
            name="aceptaDatos"
            value="no"
            checked={aceptaDatos === false}
            onChange={manejarCambioCheckbox}
          />
          No acepto la manipulación de mis datos
        </label>
      </div>
      <button
        onClick={manejarClickSiguiente}
        disabled={!aceptaDatos}
        style={{ padding: '10px 20px', cursor: aceptaDatos ? 'pointer' : 'not-allowed' }}
      >
        Siguiente
      </button>
    </div>
  );
};

export default VistaProteccionDatos;
