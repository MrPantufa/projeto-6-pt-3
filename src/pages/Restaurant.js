// src/pages/Restaurant.js
import React, { useState, useEffect } from 'react';
import { useParams, Link }           from 'react-router-dom';
import styled                        from 'styled-components';
import axios                         from 'axios';
import { useDispatch }               from 'react-redux';
import { addToCart }                 from '../store/cartSlice';
import { Logo }                      from '../components/Header';
import { Button }                    from '../components/Button';
import pattern                       from '../assets/pattern.svg';
import peixeImg                      from '../assets/peixe.jpg';
import pizzaImg                      from '../assets/pizza.jpg';

const Nav = styled.nav`
  background: ${p => p.theme.colors.background} url(${pattern}) repeat;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
`;
const NavLink = styled(Link)`
  color: ${p => p.theme.colors.primary};
  font-weight: bold;
  text-decoration: none;
`;
const CartButton = styled.button`
  background: none;
  border: none;
  color: ${p => p.theme.colors.primary};
  font-weight: bold;
  cursor: pointer;
`;

const Hero = styled.section`
  position: relative;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  color: white;
  background: url(${props => props.bg}) center/cover no-repeat;
`;
const CategoryTag = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0,0,0,0.6);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
`;
const TitleHero = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
`;

const Main = styled.main`
  padding: 2rem;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
`;
const Card = styled.div`
  border: 1px solid ${p => p.theme.colors.primary};
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
`;
const CardImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;
const CardContent = styled.div`
  padding: 1rem;
`;
const CardTitle = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
`;
const CardDesc = styled.p`
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: ${p => p.theme.colors.textLight};
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 950;
`;
const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  max-width: 600px;
  width: 90%;
  position: relative;
`;
const Close = styled.button`
  position: absolute;
  top: 0.5rem; right: 0.5rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;
const ModalImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
`;
const ModalBody = styled.div`
  padding: 1.5rem;
`;
const ModalTitle = styled.h2`
  margin: 0 0 1rem;
`;
const ModalDesc = styled.p`
  margin: 0 0 1rem;
`;
const ModalPorcao = styled.p`
  font-weight: bold;
  margin-bottom: 1rem;
`;
const ModalButton = styled(Button)`
  width: 100%;
`;

export default function Restaurant({ onCartOpen }) {
  const dispatch = useDispatch();
  const { id }   = useParams();
  const [resto, setResto]       = useState(null);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get(`https://ebac-fake-api.vercel.app/api/efood/restaurantes/${id}`)
      .then(res => setResto(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando restaurante…</p>;
  if (!resto) return <p>Restaurante não encontrado.</p>;

  return (
    <>
      <Nav>
        <NavLink to="/">Restaurantes</NavLink>
        <NavLink to="/">
          <Logo src={pizzaImg} alt="Logo" height="40" />
        </NavLink>
        <CartButton onClick={onCartOpen}>Carrinho</CartButton>
      </Nav>

      <Hero bg={resto.capa}>
        <CategoryTag>{resto.tipo}</CategoryTag>
        <TitleHero>{resto.titulo}</TitleHero>
      </Hero>

      <Main>
        <Grid>
          {resto.cardapio.map(item => (
            <Card key={item.id}>
              <CardImage src={item.foto} alt={item.nome} />
              <CardContent>
                <CardTitle>{item.nome}</CardTitle>
                <CardDesc>{item.descricao}</CardDesc>
                <ModalButton onClick={() => setSelected(item)}>
                  Mais detalhes
                </ModalButton>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Main>

      {selected && (
        <ModalOverlay onClick={() => setSelected(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <Close onClick={() => setSelected(null)}>×</Close>
            <ModalImage src={selected.foto} alt={selected.nome} />
            <ModalBody>
              <ModalTitle>{selected.nome}</ModalTitle>
              <ModalDesc>{selected.descricao}</ModalDesc>
              <ModalPorcao>Serve: {selected.porcao}</ModalPorcao>
              <ModalButton onClick={() => {
                dispatch(addToCart(selected));
                setSelected(null);
                onCartOpen();
              }}>
                Adicionar ao carrinho – R$ {selected.preco.toFixed(2)}
              </ModalButton>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
