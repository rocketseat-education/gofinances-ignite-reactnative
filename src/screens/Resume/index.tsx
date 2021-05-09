import React, { useEffect, useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { months } from '../../utils/months';

import { useAuth } from '../../hooks/auth';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import { 
    Container,
    Header,
    HeaderTitle,
    ChartContent,
    MonthSelect,
    Previous,
    Month,
    Next,
    SelectIcon
} from './styles';

import { CategoryProps } from '../CategorySelect';
import { VictoryPie } from 'victory-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

interface MovimentData {
    type: string;
    name: string;
    amount: number;
    category: CategoryProps;
    date: Date;
}

interface TotalByCategory {
    title: string;
    amount: number;
    amountFormatted: string;
    color: string;
    percent: number;
    percentFormatted: string;
}

export function Resume() {
    const [totalsByCategory, setTotalsByCategory] = useState<TotalByCategory[]>([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const { user } = useAuth();

    const handleChangeMonth = useCallback((action: 'prev' | 'next') => {     
        if(action === 'next'){
            if(selectedMonth === 11){
                setYear(oldYear => oldYear + 1);
                setSelectedMonth(0);
            }else{
                setSelectedMonth(oldState => oldState + 1);
            }
        }
        
        if(action === 'prev'){
            if(selectedMonth === 0){
                setYear(oldYear => oldYear - 1);
                setSelectedMonth(11);
            }else{
                setSelectedMonth(oldState => oldState - 1);
            }
        }
    }, [setSelectedMonth, selectedMonth, setYear]);

    const loadData = useCallback(async () => {
        const response = await AsyncStorage.getItem(`@gofinances_@user:${user.id}:moviments`);
        const responseJson: MovimentData[] = response ? JSON.parse(response) : [];

        // primeiro, filtro somente as despesas do mes.
        const expenses = responseJson.filter(expense => 
            expense.type === 'negative' 
            && new Date(expense.date).getMonth() === selectedMonth
            && new Date(expense.date).getFullYear() === year
            );

        // agora, já calculo o total.
        const total = expenses.reduce((acumulator, item) => acumulator + item.amount, 0);

        const totalByCategory:TotalByCategory[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            expenses.forEach(expense => {
                if(expense.category.label === category.label)
                    categorySum += expense.amount;
            });

            if(categorySum > 0){
                const amountFormatted = categorySum.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
                const percent = (categorySum / total * 100).toFixed(0);

                totalByCategory.push({
                    title: category.label,
                    amount: categorySum,
                    amountFormatted,
                    color: category.color,
                    percent: Number(percent),
                    percentFormatted: `${percent}%`
                });
            }
        });

        setTotalsByCategory(totalByCategory);
    },[year, selectedMonth]);


    useEffect(() => {
        loadData();
    },[selectedMonth, selectedMonth]);

    useFocusEffect(() => {
        loadData();
    });


    return (
        <Container>
            <Header>
                <HeaderTitle>Resumo por categoria</HeaderTitle>
            </Header>

            <MonthSelect>     
                <Previous onPress={() => handleChangeMonth('prev')}>
                    <SelectIcon name="chevron-left" />
                </Previous>
                <Month>
                    { `${months[selectedMonth]}, ${year}` }
                </Month>
                <Next onPress={() => handleChangeMonth('next')}>
                    <SelectIcon name="chevron-right" />
                </Next>
            </MonthSelect>

            <ChartContent>
                <VictoryPie
                    data={totalsByCategory}     
                    colorScale={totalsByCategory.map(item => item.color)} 
                    style={{
                        labels: { fill: '#FFF', fontSize: 18, fontWeight: 'bold' }
                    }} 
                    labelRadius={50}
                    x="percentFormatted"
                    y="percent"  
                />
            </ChartContent>

            <ScrollView 
                style={{ width: '100%', padding: 20 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: useBottomTabBarHeight(),                        
                }}
            >
            {
                totalsByCategory.map(item => (
                    <HistoryCard 
                        key={item.title}
                        title={item.title}
                        amount={item.amountFormatted}
                        color={item.color}
                    />
                ))
            }
            </ScrollView>
        </Container>
    );    
}