import 'styled-components';

declare module 'styled-components' {
        export interface DefaultTheme {
            colors: {
                primary: string;

                secondary: string;
                secondary_light: string;
                
                success: string;
                success_light: strirng;

                attention: string;
                attention_light: string;

                shape: string;
                title: string;
                text: string;
                background: string;  

                shadow: string;                    
            },

            fonts: {
                text_400: string;
                text_500: string;
                text_700: string;
            }
        }
}