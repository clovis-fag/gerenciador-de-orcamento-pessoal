import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../service/firebase.ts';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('Usuário logado:', userCredential.user);
          navigate('/dashboard');
        })
        .catch((error) => {
          setError('Erro ao fazer login: ' + error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('Conta criada com sucesso:', userCredential.user);
          navigate('/dashboard');
        })
        .catch((error) => {
          setError('Erro ao criar conta: ' + error.message);
        });
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log('Usuário logado com Google:', result.user);
        navigate('/dashboard');
      })
      .catch((error) => {
        setError('Erro ao fazer login com Google: ' + error.message);
      });
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? 'Login' : 'Criar Conta'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn login-btn">
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>
      <button
        type="button"
        className="btn google-btn"
        onClick={handleGoogleLogin}
      >
        Login com Google
      </button>
      <p>
        {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
        <button
          type="button"
          className="toggle-button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Cadastre-se' : 'Faça login'}
        </button>
      </p>
      <Link to="/" className="back-link">Voltar para Home</Link>
    </div>
  );
};

export default Login;
