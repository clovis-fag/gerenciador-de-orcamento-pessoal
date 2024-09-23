import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Bem-vindo ao Gerenciador de Orçamento Pessoal</h1>
      <p>
        O <strong>Gerenciador de Orçamento Pessoal</strong> é uma aplicação projetada para facilitar a gestão das suas finanças pessoais. No projeto, os usuários podem adicionar, editar e 
        excluir entradas de renda e despesas, com a aplicação exibindo um resumo do total de renda, total de despesas e saldo restante.
      </p>
      <div className="navigation-links">
        <Link to="/sobre">Sobre</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Home;
