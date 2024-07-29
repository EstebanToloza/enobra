import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="home-page flex flex-col justify-start items-center">
      <h1>enObra.app</h1>
      <Link to="/calculator">
        <button>INICIAR PROYECTO</button>
      </Link>
      <div className="quick-calculations">
        {/* Aquí puedes añadir los botones para cálculos rápidos */}
      </div>
    </div>
  );
};

export default HomePage;