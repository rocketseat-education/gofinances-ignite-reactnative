import styled from 'styled-components/native';
import { RFPercentage } from "react-native-responsive-fontsize";


export const Container = styled.View`
    flex: 1;   
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: 70%;
    background-color: ${({ theme }) => theme.colors.primary};

    justify-content: center;
    align-items: center;    
`;

export const TitleWrapper = styled.View`
    align-items: center;
`;


export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.text_500};
    font-size: ${RFPercentage(4)}px;
    color: ${({ theme }) => theme.colors.shape};
    text-align: center;
    margin-top: ${RFPercentage(5)}px;
`;

export const Footer = styled.View`
    background-color: ${({ theme }) => theme.colors.secondary};
    width: 100%;
    height: 30%;
`;

export const FooterWrapper = styled.View`
    margin-top: -${RFPercentage(5)}px;
    padding: 0 ${RFPercentage(5)}px;

    justify-content: space-between;
`;

export const SignInTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.text_400};
    font-size: ${RFPercentage(2.2)}px;
    color: ${({ theme }) => theme.colors.shape};
    text-align: center;    
    margin-top: ${RFPercentage(12)}px;
`;

export const Load = styled.ActivityIndicator.attrs({
    color: '#FFF'
})`
    margin-top: ${RFPercentage(2)}px;    
`;
