import styled from 'styled-components/native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';


interface IconProps {
    type: string;
};


export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: ${RFPercentage(1)}px;

    padding: ${RFPercentage(3)}px;
    margin: ${RFPercentage(1)}px 0;
`;


export const Title = styled.Text`
    font-size: ${RFPercentage(2.3)}px;
`;


export const Amount = styled.Text<IconProps>`
    color: ${({ type, theme }) => (
        type === 'positive' 
        ? theme.colors.success : theme.colors.attention 
    )};

    font-size: ${RFPercentage(2.5)}px;
    margin-top: ${RFPercentage(1)}px;
`;


export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: ${RFPercentage(3)}px;
`;


export const Type = styled.View`
    flex-direction: row;
    align-items: center;
`;


export const TypeText = styled.Text`
    font-size: ${RFPercentage(2.2)}px;
    margin-left: ${RFPercentage(0.5)}px;
    color: ${({ theme }) => theme.colors.text};
`;


export const Icon = styled(Feather)`
    font-size: ${RFPercentage(2.7)}px;
    color: ${({ theme }) => theme.colors.text};
`;


export const Date = styled.Text`
    color: ${({ theme }) => theme.colors.text};
`;