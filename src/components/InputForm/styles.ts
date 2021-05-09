import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

type InputProps = {
    [key: string]: any;
    isError: boolean;
  };


export const Container = styled.View`
  width: 100%;
  margin: ${RFPercentage(1)}px 0;
`;
  
export const Input = styled.TextInput<InputProps>`
    width: 100%;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.shape};
    
    border-width: 1px;
    border-color: ${({isError}) => isError ? 'red' : 'white'};

    border-radius: ${RFPercentage(0.7)}px;
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  margin: ${RFPercentage(0.5)}px;
`;