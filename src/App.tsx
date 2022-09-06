
import { Dashboard } from "./components/Dashboard";
import Modal from 'react-modal';
import { Header } from "./components/Header/index";
import { GlobalStyle } from "./styles/global";
import { useState } from "react";
import { ModalTransaction } from "./components/ModalTransactions";
import {TransactionsProvider} from "./TransactionsContext"

Modal.setAppElement('#root');

export function App() {
  const [abrirModalTransaction, setAbrirModalTransaction] = useState(false);

  function handleAbrirModalTransaction() {
      setAbrirModalTransaction(true);
  }

  function handleFecharModalTransaction() {
      setAbrirModalTransaction(false);
  }

  return (
    <TransactionsProvider>
      <Header AbrirModalTransaction={handleAbrirModalTransaction}/>

      <Dashboard />

      <ModalTransaction
      isOpen={abrirModalTransaction}
      onRequestClose={handleFecharModalTransaction}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}


