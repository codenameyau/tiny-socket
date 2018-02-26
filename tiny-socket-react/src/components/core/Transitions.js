import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const CSSTransitionFactory = (Transition, transitionName) => {
  return ({children, ...props}) => {
    return (
      <Transition classNames={transitionName} {...props} timeout={props.timeout || 0}>
        {children}
      </Transition>
    )
  }
};

const FadeCSSTransition = styled(CSSTransition)`
  transition: opacity ${({ duration }) => duration || 1000}ms;

  &.fade-enter {
    opacity: 0.01;
  }

  &.fade-enter-active {
    opacity: 1;
  }
`;

export const Fade = CSSTransitionFactory(FadeCSSTransition, 'fade');
