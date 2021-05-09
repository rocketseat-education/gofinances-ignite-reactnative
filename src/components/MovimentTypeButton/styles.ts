import styled, { css } from 'styled-components/native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';

interface IconProps {
    type: 'up' | 'down';
};

interface ButtonProps extends TouchableOpacityProps {
    isActive: boolean;
    type: 'up' | 'down';
}

export const Container = styled.TouchableOpacity<ButtonProps>`
    width: 48%;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: 1px solid ${({ theme }) => theme.colors.text};
    border-radius: ${RFPercentage(0.5)}px;

    padding: ${RFPercentage(2)}px;  

    ${({ isActive, type }) => isActive && type === 'up' && css`
        background-color: ${({ theme }) => theme.colors.success_light};
        border: none;
    `};

    ${({ isActive, type }) => isActive && type === 'down' && css`
        background-color: ${({ theme }) => theme.colors.attention_light};
        border: none;
    `};
`;

export const Title = styled.Text`
    font-size: ${RFPercentage(2)}px;
    margin-left: ${RFPercentage(1)}px;
`;


export const Icon = styled(SimpleLineIcons)<IconProps>`
    font-size: ${RFPercentage(3)}px;
    color: ${({ theme, type }) => type === 'up' 
    ? theme.colors.success : theme.colors.attention };
`;