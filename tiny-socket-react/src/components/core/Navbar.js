import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavbarContainer = styled.nav`
  text-align: center;
	background-color: #6338aa;
	background-image: -webkit-gradient(linear, left top, right top, from(#6936ce), to(#5779d7));
	background-image: -webkit-linear-gradient(left, #6936ce, #5779d7);
	background-image: -o-linear-gradient(left, #6936ce, #5779d7);
	background-image: linear-gradient(90deg, #6936ce, #5779d7);
  padding: 1.25em;
`;

const NavItem = styled(NavLink)`
  color: #ccc;
  transition: color .2s;
  margin: 0 1em;
  text-decoration: none;
  font-family: monospace;
  font-weight: lighter;
  font-size: 1.25em;

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
