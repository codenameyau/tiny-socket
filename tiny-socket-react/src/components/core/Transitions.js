import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const CSSTransitionFade = styled(CSSTransition)`
  transition: opacity 3000ms;

  &.fade-enter {
    opacity: 0.05;
  }

  &.fade-enter-active {
  }
    opacity: 1;
`;

export const Fade = ({ children, ...props}) => {
  return (
    <CSSTransitionFade
      {...props}
      timeout={props.timeout || 0}
      classNames="fade"
    >
      {children}
    </CSSTransitionFade>
  );
}
