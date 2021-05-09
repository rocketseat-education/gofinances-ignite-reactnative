import styled from 'styled-components/native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Feather } from '@expo/vector-icons';


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

export const ChartContent = styled.View``;

export const MonthSelect = styled.View`
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: ${RFPercentage(3)}px;
`;

export const Previous = styled.TouchableOpacity`
`;

export const Month = styled.Text`
    font-family: ${({ theme }) => theme.fonts.text_400};
    font-size: ${RFPercentage(2.7)}px;
`;

export const Next = styled.TouchableOpacity``;

export const SelectIcon = styled(Feather)`
    font-size: ${RFPercentage(3)}px;
`;