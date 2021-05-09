import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;   
    background-color: ${({ theme }) => theme.colors.background};
    align-items: center; 
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    width: 100%;
    height: 17%; 

    padding-top: ${getStatusBarHeight() + RFPercentage(3)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: ${RFPercentage(3)}px;
`;

export const HeaderTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.text_400};
    font-size: ${RFPercentage(2.7)}px;
    color: ${({ theme }) => theme.colors.background};
`;

export const Form = styled.View`
    flex: 1;
    width: 100%;

    padding: ${RFPercentage(3)}px;
`;

export const MovimentTypes = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: ${RFPercentage(1)}px;
`;


export const Button = styled.TouchableOpacity`
    width: 90%;
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: ${RFPercentage(2.7)}px;
    margin: ${RFPercentage(3)}px;
    border-radius: ${RFPercentage(1)}px;

    align-items: center;
`;

export const ButtonText = styled.Text`
    color: ${({ theme }) => theme.colors.background};
    font-size: ${RFPercentage(2)}px;
    font-family: ${({ theme }) => theme.fonts.text_400};
`;

export const SelectCategory = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    background-color: ${({ theme }) => theme.colors.shape};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border-radius: ${RFPercentage(1)}px;
    margin-top: ${RFPercentage(2)}px;    
`;


export const Category = styled.Text`
  font-size: ${RFPercentage(2)}px;
  color: ${({ theme }) => theme.colors.text};
  padding:  ${RFPercentage(2.5)}px;    
`;

export const CategoryIcon = styled(Feather)`
    color: ${({ theme }) => theme.colors.text};
    font-size: ${RFPercentage(2.5)}px;
    margin-right: ${RFPercentage(1.5)}px;

`;
