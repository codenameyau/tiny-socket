import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`

`;

const NavItem = styled.li`
  list-style: none;
`;

export const Navbar = (props) => {
  return (
    <NavbarContainer>
      <NavItem>Tweets</NavItem>
    </NavbarContainer>
  );
}

export default Navbar;
