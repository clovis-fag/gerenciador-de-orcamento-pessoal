import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  return (
    <div className="login">
      <h2>Login</h2>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Senha" />
        <div className="login-buttons">
          <button type="submit">Login</button>
          <button type="button">Criar Conta</button>
          <button type="button">Login com Google</button>
        </div>
      </form>
      <div className="back-link">
        <Link to="/">Voltar para Home</Link>
      </div>
    </div>
  );
};

export default Login;
