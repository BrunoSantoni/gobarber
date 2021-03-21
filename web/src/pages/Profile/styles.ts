import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 2.4rem;
        height: 2.4rem;
      }
    }
  }
`;

export const Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -17.6rem auto 0;

  form {
    width: 34rem;

    display: flex;
    flex-direction: column;

    margin: 8rem 0;

    text-align: center;

    h1 {
      margin-bottom: 2.4rem;
      font-size: 2rem;
      text-align: left;
    }

    a {
      display: block;

      margin-top: 2.4rem;

      color: #f4ede8;
      text-decoration: none;

      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  margin-bottom: 3.2rem;
  align-self: center;

  img {
    width: 18.6rem;
    height: 18.6rem;
    border-radius: 50%;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    width: 4.8rem;
    height: 4.8rem;
    background: #ff9000;
    border-radius: 50%;
    right: 0;
    bottom: 0;

    cursor: pointer;

    transition: background-color 0.2s;

    input {
      display: none;
    }

    svg {
      width: 2rem;
      height: 2rem;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
