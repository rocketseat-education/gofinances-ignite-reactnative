import React from 'react';
import { TextInputProps } from 'react-native';
import { Controller, Control } from 'react-hook-form';

import { Container, Input, Error } from './styles';

// type Props = TextInputProps & UseControllerProps<any>;
interface Props extends TextInputProps {
    control: Control;
    name: string;
    error: string;   
}

export function InputForm({
    control,
    name, 
    error,
    ...rest
}: Props) {    

    return (
        <Container>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                <Input
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}   
                    {...rest}                 
                />
                )}
                name={name}                                        
            />
            {error && <Error>{error}</Error>}
        </Container>
    )
}