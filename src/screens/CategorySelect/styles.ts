import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface ItemProps {
    active: boolean;
}


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

export const Item = styled.TouchableOpacity<ItemProps>`
    width: 100%;
    padding: ${RFPercentage(3)}px;
    
    flex-direction: row;
    align-items: center;

    background-color: ${({ theme, active }) => active ? 
    theme.colors.secondary_light : theme.colors.background};
`;

export const Label = styled.Text`
    width: 100%;
    font-family: ${({ theme }) => theme.fonts.text_400};
    font-size: ${RFPercentage(2)}px;
`;

export const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.text };
`;

export const Icon = styled(Feather)`
    font-size: ${RFPercentage(3)}px;
    color: ${({ theme }) => theme.colors.title };
    margin-right: ${RFPercentage(1)}px;
`;

export const Button = styled.TouchableOpacity`
    width: 90%;
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: ${RFPercentage(2.7)}px;

    border-radius: ${RFPercentage(1)}px;

    align-items: center;
    margin-bottom: ${getBottomSpace()}px;
`;

export const ButtonText = styled.Text`
    color: ${({ theme }) => theme.colors.background};
    font-size: ${RFPercentage(2)}px;
    font-family: ${({ theme }) => theme.fonts.text_400};
`;