import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 16rem;

    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: calc(100% + 1.2rem);

    background: #ff9000;

    padding: 0.8rem;
    border-radius: 0.4rem;

    font-size: 1.4rem;
    font-weight: 500;
    color: #312e38;

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s;

    &::before {
      position: absolute;
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 0.6rem 0.6rem 0 0.6rem;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
