// Tipagem do native => @types/styled-components-react-native -D 
import styled from 'styled-components/native';
import { RFPercentage } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Feather } from '@expo/vector-icons';
 

export const Container = styled.View`
    flex: 1;   
    background-color: ${({ theme }) => theme.colors.background};
`;


export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    width: 100%;
    height: 36%; 

    padding-top: ${getStatusBarHeight() + RFPercentage(3)}px;
`;

export const HeaderTop = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    padding: 0 ${RFPercentage(4)}px;    
    margin-bottom: ${RFPercentage(3)}px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
`;

export const User = styled.View`
    margin-left: ${RFPercentage(2)}px;
`;

export const Photo = styled.Image`
    width: ${RFPercentage(7)}px;
    height: ${RFPercentage(7)}px;
    border-radius: ${RFPercentage(1)}px;
`;

export const UserGretting = styled.Text`
    font-size: ${RFPercentage(2.5)}px;
    font-family: ${({ theme }) => theme.fonts.text_400};
    color: ${({ theme }) => theme.colors.background};
`;

export const UserName = styled.Text`
    color: ${({ theme }) => theme.colors.background};
    font-size: ${RFPercentage(2.5)}px;
    font-family: ${({ theme }) => theme.fonts.text_700};
`;


export const Logout = styled.TouchableOpacity.attrs({
    activeOpacity: 0.8
})``;

export const Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${RFPercentage(3.5)}px;

    margin-left:  ${RFPercentage(3)}px;
`;

export const Cards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: RFPercentage(3)}
})`
    position: absolute;
    width: 100%;
    margin-top: ${RFPercentage(16)}px;
`;

export const Content = styled.View`
    flex: 1;    
    padding: 0 ${RFPercentage(4)}px;   
`;

export const Title = styled.Text`
    margin-top: ${RFPercentage(12)}px;
    margin-bottom: ${RFPercentage(1.5)}px;
    font-size: ${RFPercentage(2.5)}px;
    font-family: ${({ theme }) => theme.fonts.text_400};
`;