import React, { useState, useEffect } from 'react';
import { db } from '../service/firebase.ts';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { auth } from '../service/firebase.ts';
import './Despesas.css';

interface Despesa {
  id: string;
  descricao: string;
  valor: number;
}

const Despesas = () => {
  const [valor, setValor] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [despesas, setDespesas] = useState<Despesa[]>([]);

  useEffect(() => {
    if (auth.currentUser) {
      const q = query(
        collection(db, 'despesas'),
        where('userId', '==', auth.currentUser.uid)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const listaDespesas = snapshot.docs.map(doc => ({
          id: doc.id,
          descricao: doc.data().descricao,
          valor: doc.data().valor
        })) as Despesa[];
        setDespesas(listaDespesas);
      });
      return () => unsubscribe();
    }
  }, []);

  const handleAddDespesa = async () => {
    try {
      if (auth.currentUser) {
        const newDespesa = {
          userId: auth.currentUser.uid,
          valor: parseFloat(valor),
          descricao,
          data: new Date()
        };
        console.log('Adicionando despesa:', newDespesa);
        await addDoc(collection(db, 'despesas'), newDespesa);
        console.log('Despesa adicionada com sucesso!');
        setValor('');
        setDescricao('');
      } else {
        console.error('Usuário não autenticado!');
      }
    } catch (error) {
      console.error('Erro ao adicionar despesa:', error);
    }
  };

  return (
    <div className="despesas-container">
      <h2>Adicionar Despesa</h2>
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
      <button onClick={handleAddDespesa}>Adicionar Despesa</button>

      <h3>Despesas</h3>
      <ul>
        {despesas.map((despesa) => (
          <li key={despesa.id}>
            {despesa.descricao}: R$ {despesa.valor}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Despesas;
