import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import './Transitions.css';

const CSSTransitionFade = styled(CSSTransition)`
  opacity: 1;
  transition: opacity 3s;
`;

export const Fade = ({ children, ...props}) => {
  return (
    <CSSTransitionFade
      {...props}
      timeout={10000}
      classNames="fade"
    >
      {children}
    </CSSTransitionFade>
  );
}
