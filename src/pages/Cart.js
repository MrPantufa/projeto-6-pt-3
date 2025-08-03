import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { FaTrash } from 'react-icons/fa';
import { Button } from '../components/Button';

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 900;
`;
const Drawer = styled.aside`
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: 360px;
  background: ${p => p.theme.colors.primary};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  z-index: 1000;
`;
const Title = styled.h2`
  color: white;
  margin: 0 0 1rem;
`;
const Items = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  background: ${p => p.theme.colors.background};
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.75rem;
  position: relative;
`;
const Img = styled.img`
  width: 64px; height: 64px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 0.75rem;
`;
const Info = styled.div`flex:1;`;
const Name = styled.p`
  margin:0 0 .25rem;
  font-weight:bold;
`;
const Price = styled.p`
  margin:0;
  color: ${p => p.theme.colors.textLight};
`;
const DeleteBtn = styled.button`
  background: none;
  border: none;
  color: ${p => p.theme.colors.textLight};
  cursor: pointer;
  position: absolute;
  top: .5rem; right: .5rem;
`;
const Footer = styled.div`
  border-top: 1px solid rgba(255,255,255,0.3);
  padding-top: 1rem;
`;
const Total = styled.p`
  color: white;
  font-weight: bold;
  text-align: right;
  margin-bottom: 1rem;
`;
const CheckoutBtn = styled(Button)`
  width: 100%;
  background: white;
  color: ${p => p.theme.colors.primary};
`;

export default function Cart({ open, onClose }) {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((sum, i) => sum + i.preco * i.quantity, 0);

  if (!open) return null;

  return (
    <>
      <Backdrop onClick={onClose} />
      <Drawer onClick={e => e.stopPropagation()}>
        <Title>Carrinho</Title>
        <Items>
          {items.map(i => (
            <Item key={i.id}>
              <Img src={i.foto} alt={i.nome} />
              <Info>
                <Name>{i.nome}</Name>
                <Price>R$ {i.preco.toFixed(2)}</Price>
              </Info>
              <DeleteBtn onClick={() => dispatch(removeFromCart(i.id))}>
                <FaTrash />
              </DeleteBtn>
            </Item>
          ))}
        </Items>
        <Footer>
          <Total>Valor total: R$ {total.toFixed(2)}</Total>
          <CheckoutBtn onClick={() => alert('Continuar com a entrega')}>
            Continuar com a entrega
          </CheckoutBtn>
        </Footer>
      </Drawer>
    </>
  );
}
