import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { categories } from '../../utils/categories';

import { 
    Container, 
    Header,
    HeaderTitle,
    Item,
    Label,
    Separator,
    Icon,
    Button,
    ButtonText
} from './styles';

export interface CategoryProps {
    label: string;
    value: string;
    icon: string;
}

interface CategorySelectProps {
    category: CategoryProps;
    setCategory: (item: CategoryProps) => void;
    setCategoryModalOpen: (value: boolean) => void;
}

export function CategorySelect({ 
    category, 
    setCategory, 
    setCategoryModalOpen 
} : CategorySelectProps){     
    return (
        <Container>
            <Header>
                <HeaderTitle>Categoria</HeaderTitle>
            </Header>

            <FlatList 
                data={categories}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.value}
                renderItem={({item}) => (
                    <Item 
                        onPress={() => setCategory(item)}
                        active={category.value === item.value}
                    >
                        <Icon name={item.icon}/>
                        <Label>{item.label}</Label>
                    </Item>
                )}
                ItemSeparatorComponent={() => (
                    <Separator />
                )}
            />

            <Button onPress={() => setCategoryModalOpen(false)}>
                <ButtonText>Selecionar</ButtonText>
            </Button>
        </Container>
    )
}