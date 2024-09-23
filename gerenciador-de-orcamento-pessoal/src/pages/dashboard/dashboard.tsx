import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../service/firebase.ts';
import { User as FirebaseUser } from 'firebase/auth';
import Receitas from '../../components/Receitas.tsx';
import Despesas from '../../components/Despesas.tsx'; 
import './dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [view, setView] = useState<'home' | 'receitas' | 'despesas'>('home'); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Bem-vindo ao Dashboard, {user.displayName || user.email}!</h1>
      <div className="dashboard-actions">
        <button onClick={() => setView('receitas')}>Gerenciar Receitas</button>
        <button onClick={() => setView('despesas')}>Gerenciar Despesas</button>
        <button onClick={() => setView('home')}>Voltar para Início</button>
      </div>
      
      {view === 'home' && <p>Escolha uma opção para gerenciar suas finanças.</p>}
      {view === 'receitas' && <Receitas />}
      {view === 'despesas' && <Despesas />}
    </div>
  );
};

export default Dashboard;
