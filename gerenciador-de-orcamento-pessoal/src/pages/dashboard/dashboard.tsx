import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../service/firebase.ts';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <h1>Bem-vindo ao Dashboard!</h1>
      <p>Escolha uma opção:</p>
      <Link to="/receitas">Gerenciar Receitas</Link>
      <br />
      <Link to="/despesas">Gerenciar Despesas</Link>
    </div>
  );
};

export default Dashboard;
