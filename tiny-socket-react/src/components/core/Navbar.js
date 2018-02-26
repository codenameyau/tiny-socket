import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavbarContainer = styled.nav`
  text-align: center;
  background: linear-gradient(28deg, #472086, #4a228a);
  padding: 1em;
`;

const NavItem = styled(NavLink)`
  color: #888;
  transition: color .2s;
  margin: 0 1em;
  text-decoration: none;
  font-family: monospace;
  font-weight: lighter;
  font-size: 1em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &:hover {
    color: #fff;
  }

  &.active {
    color: #fff;
  }
`;

export const Navbar = (props) => {
  return (
    <NavbarContainer>
      <NavItem to="/tweets">Tweets</NavItem>
      <NavItem to="/tickers">Tickers</NavItem>
      <NavItem to="/colors">Colors</NavItem>
    </NavbarContainer>
  );
}

export default Navbar;
