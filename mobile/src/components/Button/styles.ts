import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  background: #ff9000;

  border-radius: 10px;
  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  flex: 1;

  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  text-align: center;
  color: #312e38;
`;
