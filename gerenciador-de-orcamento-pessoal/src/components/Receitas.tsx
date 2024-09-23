import React, { useState, useEffect } from 'react';
import { db } from '../service/firebase.ts';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { auth } from '../service/firebase.ts';
import './Receitas.css';

interface Receita {
  id: string;
  descricao: string;
  valor: number;
}

const Receitas = () => {
  const [valor, setValor] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [receitas, setReceitas] = useState<Receita[]>([]);

  useEffect(() => {
    if (auth.currentUser) {
      const q = query(
        collection(db, 'receitas'),
        where('userId', '==', auth.currentUser.uid)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const listaReceitas = snapshot.docs.map(doc => ({
          id: doc.id,
          descricao: doc.data().descricao,
          valor: doc.data().valor
        })) as Receita[];
        setReceitas(listaReceitas);
      });
      return () => unsubscribe();
    }
  }, []);

  const handleAddReceita = async () => {
    try {
      if (auth.currentUser) {
        const newReceita = {
          userId: auth.currentUser.uid,
          valor: parseFloat(valor),
          descricao,
          data: new Date()
        };
        console.log('Adicionando receita:', newReceita);
        await addDoc(collection(db, 'receitas'), newReceita);
        console.log('Receita adicionada com sucesso!');
        setValor('');
        setDescricao('');
      } else {
        console.error('Usuário não autenticado!');
      }
    } catch (error) {
      console.error('Erro ao adicionar receita:', error);
    }
  };

  return (
    <div className="receitas-container">
      <h2>Adicionar Receita</h2>
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <button onClick={handleAddReceita}>Adicionar Receita</button>

      <h3>Receitas</h3>
      <ul>
        {receitas.map((receita) => (
          <li key={receita.id}>
            {receita.descricao}: R$ {receita.valor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Receitas;
