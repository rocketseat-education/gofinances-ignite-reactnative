import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useFocusEffect } from '@react-navigation/native';


import { useAuth } from '../../hooks/auth';
import { Card } from '../../components/Card';
 
import { 
    Container, 
    Header,
    HeaderTop,
    User,
    Photo,
    UserGretting,
    UserName,
    Logout,
    Icon,
    UserInfo,
    Cards,
    Content,
    Title,
} from './styles';

import { Moviment } from '../../components/Moviment';
import { CategoryProps } from '../CategorySelect';
import { getBottomSpace } from 'react-native-iphone-x-helper';

interface MovimentProps {
    id: string;
    name: string;
    amount: string;
    type: string;
    category: CategoryProps;
    date: Date;
}

export function Dashboard(){
    const [data, setData] = useState<MovimentProps[]>([]);
    const [entries, setEntries] = useState('R$ 0, 00');
    const [exits, setExits] = useState('R$ 0, 00');
    const [total, setTotal] = useState('R$ 0, 00');

    const { user, signOut } = useAuth();

    const loadData = useCallback(async () => {
        const response = await AsyncStorage.getItem(`@gofinances_@user:${user.id}:moviments`);
        const responseJson = response ? JSON.parse(response) : [];            

        let entriesSum = 0;
        let exitsSum = 0;            

        const dataFormatted = responseJson.map((item: MovimentProps) => {
            const amount = item.amount
            .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

            const date = new Date(item.date);
            const dateFormatted = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

            if(item.type === 'positive')
                entriesSum += Number(item.amount);
            else
                exitsSum += Number(item.amount);
            
            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date: dateFormatted
            }
        });

        let totalSum = entriesSum - exitsSum;

        setEntries(
            entriesSum.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        );

        setExits(
            exitsSum.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        );

        setTotal(
            totalSum.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        );

        setData(dataFormatted);
    },[]);

    // useEffect(() => {
    //     loadData();
    // },[loadData])

    useFocusEffect(() => {
        loadData();
    });


    return (
        <Container>
            <Header>
                <HeaderTop>
                    <UserInfo>
                        <Photo source={{ uri: user.photo }} />
                        <User>
                            <UserGretting>Olá, </UserGretting>
                            <UserName>{user.name.split(' ')[0]}</UserName>
                        </User>
                    </UserInfo>
            
                    <Logout>
                        <Icon name="power" onPress={signOut}/>
                    </Logout>
                </HeaderTop>

                <Cards>
                    <Card 
                        title="Entradas"
                        amount={entries}
                        lastMoviment="Última entrada dia 13 de abril"
                        type="up"
                    />

                    <Card 
                        title="Saídas"
                        amount={exits}
                        lastMoviment="Última entrada dia 13 de abril"
                        type="down"
                    />

                    <Card 
                        title="Total"
                        amount={total}
                        lastMoviment="Última entrada dia 13 de abril"
                        type="dollar"
                    />
                </Cards>
            </Header>

            
            <Content>
                <Title>Listagem</Title>

                <FlatList 
                    data={data}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: getBottomSpace() + useBottomTabBarHeight(),                        
                    }}
                    renderItem={({item}) => <Moviment data={item} />}
                />

                 
            </Content>
        </Container>
    )
}