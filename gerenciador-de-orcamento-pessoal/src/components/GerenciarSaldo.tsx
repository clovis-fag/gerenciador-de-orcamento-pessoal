import React, { useEffect, useState } from 'react';
import { db } from '../service/firebase.ts';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth } from '../service/firebase.ts';
import './GerenciarSaldo.css';

interface Receita {
  id: string;
  descricao: string;
  valor: number;
}

interface Despesa {
  id: string;
  descricao: string;
  valor: number;
}

const GerenciarSaldo = () => {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [saldo, setSaldo] = useState<number>(0);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const receitasQuery = query(
        collection(db, 'receitas'),
        where('userId', '==', currentUser.uid)
      );
      const unsubscribeReceitas = onSnapshot(receitasQuery, (snapshot) => {
        const listaReceitas = snapshot.docs.map(doc => ({
          id: doc.id,
          descricao: doc.data().descricao,
          valor: doc.data().valor
        })) as Receita[];
        setReceitas(listaReceitas);
      });

      const despesasQuery = query(
        collection(db, 'despesas'),
        where('userId', '==', currentUser.uid)
      );
      const unsubscribeDespesas = onSnapshot(despesasQuery, (snapshot) => {
        const listaDespesas = snapshot.docs.map(doc => ({
          id: doc.id,
          descricao: doc.data().descricao,
          valor: doc.data().valor
        })) as Despesa[];
        setDespesas(listaDespesas);
      });

      const calcularSaldo = () => {
        const totalReceitas = receitas.reduce((total, receita) => total + receita.valor, 0);
        const totalDespesas = despesas.reduce((total, despesa) => total - despesa.valor, 0);
        setSaldo(totalReceitas + totalDespesas);
      };

      calcularSaldo();

      return () => {
        unsubscribeReceitas();
        unsubscribeDespesas();
      };
    }
  }, [receitas, despesas]);

  return (
    <div className="gerenciar-saldo-container">
      <h2>Gerenciar Saldo</h2>
      <div className="saldo-calculo">
        <div className="receitas-list">
          <h3>Receitas</h3>
          <ul>
            {receitas.map((receita) => (
              <li key={receita.id}>{receita.descricao}: R$ {receita.valor}</li>
            ))}
          </ul>
        </div>
        <div className="despesas-list">
          <h3>Despesas</h3>
          <ul>
            {despesas.map((despesa) => (
              <li key={despesa.id}>{despesa.descricao}: R$ {despesa.valor}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="saldo-total">
        <h3>Saldo Total: R$ {saldo}</h3>
      </div>
    </div>
  );
};

export default GerenciarSaldo;
