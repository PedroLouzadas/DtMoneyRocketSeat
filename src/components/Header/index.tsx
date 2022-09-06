import { useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';
import Modal from 'react-modal';

interface HeaderProps{
    AbrirModalTransaction: () => void;
}

export function Header({AbrirModalTransaction} : HeaderProps){

    return(
        <Container>
            <Content>
            <img src={logoImg} alt="dt money" />
            <button type="button" onClick={AbrirModalTransaction}>
                Nova transação
            </button>

            </Content>
        </Container>
    )
}