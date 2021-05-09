import React from 'react';
import { date } from 'yup';

import { CategoryProps } from '../../screens/CategorySelect';

import { 
    Container,
    Title,
    Amount,
    Footer,
    Type,
    TypeText,
    Date,
    Icon
} from './styles';

interface Props {
    data: {
        type: string;
        name: string;
        amount: string;
        category: CategoryProps;
        date: Date;
    }
}


export function Moviment({ data } : Props) {
    return (
        <Container>
            <Title>{ data.name }</Title>
            <Amount type={data.type}>
                { data.type === 'negative' && '-' }
                { data.amount }
            </Amount>

            <Footer>
                <Type>
                    <Icon name={data.category.icon}/>
                    <TypeText>{ data.category.label }</TypeText>
                </Type>
                <Date>{ data.date }</Date>
            </Footer>
        </Container>
    )
}