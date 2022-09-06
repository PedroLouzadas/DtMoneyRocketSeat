import React, {useContext} from 'react';
import Modal from 'react-modal';
import { Container, TransactionType, RadioBox } from './styles';
import closeImg from '../../assets/vector.svg';
import entradas from '../../assets/entradas.svg'
import saidas from '../../assets/saidas.svg'
import { FormEvent, useState } from 'react';
import { api } from '../../services/api';
import { TransactionsContext } from '../../TransactionsContext';

interface ModalTransactionProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function ModalTransaction({ isOpen, onRequestClose }: ModalTransactionProps) {
    const[type, setType] = useState('deposit');
    const [title, setTitulo] = useState('');
    const [amount, setValor] = useState(0);
    const [category, setCategoria] = useState('');
    const {criarTransaction} = useContext(TransactionsContext);

    async function handleCriarTransaction(event: FormEvent){
        event.preventDefault();
    
        await criarTransaction({
            title,
            amount,
            category,
            type,
        })

        setTitulo('');
        setValor(0);
        setCategoria('');
        setType('deposit');

        onRequestClose();
    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type='button'
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img
                    src={closeImg}
                    alt='Fechar Modal' />
            </button>
            <Container onSubmit={handleCriarTransaction}>
                <h2>
                    Cadastrar transação
                </h2>

                <input
                    placeholder='Titulo'
                    value={title}
                    onChange={event => setTitulo(event.target.value)}
                />

                <input
                    type="number"
                    placeholder='Valor'
                    value={amount}
                    onChange={event => setValor(Number(event.target.value))}
                />


                <TransactionType>
                    <RadioBox
                        type='button'
                        className={type === 'deposit' ? 'active' : ''}
                        onClick={() => {setType('deposit');}}
                        isActive={type=== 'deposit'}
                        activeColor="green"
                        >
                        <img src={entradas} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type='button'
                        onClick={() => {setType('withdraw');}}
                        isActive={type=== 'withdraw'}
                        activeColor="red"
                        >
                        <img src={saidas} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>

                </TransactionType>

                <input
                    placeholder='Categoria'
                    value={category}
                    onChange={event => setCategoria(event.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}