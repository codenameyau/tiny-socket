import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const FadeCSSTransition = styled(CSSTransition)`
  transition: opacity ${({ duration }) => duration || 1000}ms;

  &.fade-enter {
    opacity: 0.01;
  }

  &.fade-enter-active {
  }
    opacity: 1;
`;

export const Fade = ({ children, ...props}) => {
  return (
    <FadeCSSTransition classNames="fade" {...props}>
      {children}
    </FadeCSSTransition>
  );
}
