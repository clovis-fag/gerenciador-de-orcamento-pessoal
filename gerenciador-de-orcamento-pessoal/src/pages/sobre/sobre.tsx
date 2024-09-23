import React from 'react';
import { Link } from 'react-router-dom';
import Clovis from '../../assets/profile-clovis.png'

const Sobre = () => {
  return (
    <div className="home">
      <h1>Sobre</h1>
      <p>Este projeto foi criado por Clovis Schweinberger, durante aula de Projeto Web, ministrada pelo professor Jeferson Guido.</p>
      <img src={Clovis} alt="Clovis" />
      <div className="back-link">
        <Link to="/">Voltar para Home</Link>
      </div>
    </div>
  );
};

export default Sobre;
