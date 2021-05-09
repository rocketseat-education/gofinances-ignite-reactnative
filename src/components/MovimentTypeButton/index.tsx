import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
    Container,
    Icon,
    Title
} from './styles';


const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
}


interface Props {
    title: string;
    type: 'up' | 'down';
    isActive: boolean;
    onPress: () => void;
}

export function MovimentTypeButton({
    title,
    type,
    isActive,
    onPress,
} : Props) {
    return (
        <Container isActive={isActive} type={type} onPress={onPress}>
            <Icon name={icons[type]} type={type}/>
            <Title>{ title }</Title>
        </Container>
    )
}