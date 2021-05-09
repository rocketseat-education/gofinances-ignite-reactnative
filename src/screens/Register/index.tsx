import React, { useCallback, useState } from 'react';
import { useForm } from "react-hook-form";
import { Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//https://www.npmjs.com/package/react-native-uuid
import uuid from 'react-native-uuid';

import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';

//https://www.npmjs.com/package/react-native-toast-message
import Toast from 'react-native-toast-message';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from "yup";

import { 
    Container, 
    Header,
    HeaderTitle,
    Form,
    MovimentTypes,
    Button,
    ButtonText,
    SelectCategory,
    Category,
    CategoryIcon
} from './styles';


import { InputForm } from '../../components/InputForm';
import { MovimentTypeButton } from '../../components/MovimentTypeButton';
import { CategorySelect, CategoryProps } from '../CategorySelect';


interface FormData {
    name: string;
    amount: number;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório!'),
    amount: Yup.number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório')
});


export function Register(){  
    const [moviment, setMoviment] = useState('');
    const [category, setCategory] = useState<CategoryProps>({
        label: 'Categoria',
        value: 'category',
        icon: 'any'
    });
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const { user } = useAuth();
    const navigation = useNavigation();
    
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const handleRegister = useCallback(async (data: FormData) => {        
        if(!moviment)
            return Alert.alert('Selecione o tipo do movimento!');
        
        if(category.label === 'Categoria')
            return Alert.alert('Selecione a Categoria!');

        const newMoviment = {
            id: String(uuid.v4()),
            name: data.name,
            amount: data.amount,
            type: moviment,
            category,
            date: new Date()
        }        
        try {
            const dataKey = `@gofinances_@user:${user.id}:moviments`;
            const data = await AsyncStorage.getItem(dataKey);
            const oldData = data ? JSON.parse(data) : []; 

            await AsyncStorage.setItem(dataKey, 
            JSON.stringify([
                newMoviment,
                ...oldData
             ]));

             // reset form
             reset();
             setMoviment('');

             navigation.navigate('Listagem');
             
        } catch {
            Alert.alert('Não foi possível cadastrar!')
        }

    },[category, moviment]);

    const handleMovimentSelect = useCallback((value: string) => {
        console.log(value)
        setMoviment(value);
    },[setCategory])


    const handleSelectCategory = useCallback(() => {  
        setCategoryModalOpen(true);

    },[setCategoryModalOpen])


    return (
        <Container>
            <Header>
                <HeaderTitle>Cadastro</HeaderTitle>
            </Header>

            <Toast ref={(ref) => Toast.setRef(ref)} />

            <Form>                  
                <InputForm                 
                    control={control} 
                    name="name"  
                    placeholder="Nome" 
                    autoCapitalize="sentences"
                    autoCorrect={false}                  
                    error={errors.name && errors.name.message}              
                />
                
                <InputForm 
                    keyboardType="numeric" 
                    control={control} 
                    name="amount"  
                    placeholder="Preço" 
                    autoCapitalize="sentences"
                    autoCorrect={false}                                  
                    error={errors.amount && errors.amount.message}              
                />

                <MovimentTypes>
                    <MovimentTypeButton 
                        type="up" 
                        title="Entrada" 
                        onPress={() => handleMovimentSelect('positive')} 
                        isActive={moviment === 'positive'}
                    />
                    
                    <MovimentTypeButton 
                        type="down" 
                        title="Saída" 
                        onPress={() => handleMovimentSelect('negative')} 
                        isActive={moviment === 'negative'}/>
                </MovimentTypes>                

                <SelectCategory onPress={handleSelectCategory}>
                    <Category>{category.label}</Category>
                    <CategoryIcon name="chevron-down" />
                </SelectCategory>                    
            </Form>

            <Button onPress={handleSubmit(handleRegister)}>
                <ButtonText>Enviar</ButtonText>
            </Button>

            <Modal visible={categoryModalOpen}>
                <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    setCategoryModalOpen={setCategoryModalOpen}
                />
            </Modal>
        </Container>
    )
}