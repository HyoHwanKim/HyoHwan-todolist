import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: #ffffff;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const NavItem = styled.div`
  margin-left: 20px;
  font-size: 16px;
  color: #333333;
  cursor: pointer;
`;

function Header() {


  const navigate = useNavigate()

  return (
    <HeaderContainer>
      <Logo onClick={() => {
        navigate('/')
      }}>Logo</Logo>
      <Nav>
        <NavItem onClick={() => {
          navigate('/mypage')
        }}>My Page</NavItem>
      </Nav>
    </HeaderContainer>
  );
}

export default Header
