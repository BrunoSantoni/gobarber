import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  width: 100%;
  height: 5.6rem;
  background: #ff9000;

  margin-top: 1.6rem;
  padding: 0 1.6rem;
  border: 0;
  border-radius: 1rem;

  font-weight: 500;
  color: #312e38;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
