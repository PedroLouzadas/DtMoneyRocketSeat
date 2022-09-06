import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { api } from "./services/api";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createAt: string;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

// interface TransactionInput {
//     title: string;
//     amount: number;
//     type: string;
//     category: string;
// }

type TransactionInput = Omit<Transaction, 'id' | 'createAt'>;

interface TransactionsContextData {
    transactions: Transaction[];
    criarTransaction: (transaction: TransactionInput) => Promise<void>;
}

//type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions));
    }, []);

    async function criarTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
           ...transactionInput,
           createAt: new Date(),
        })
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction,
        ]);
    
    }

    return (
        <TransactionsContext.Provider value={{ transactions, criarTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

