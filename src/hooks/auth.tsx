import {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: IUser | undefined;
  loading: boolean;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    async function loadStorageDate(): Promise<void> {
      const data = await AsyncStorage.getItem('@gofinances:user');                

      if (data) {           
        const userLogged = JSON.parse(data) as IUser
        setUser(userLogged);
      }

      setLoading(false);
    }

    loadStorageDate();
  }, [setUser, setLoading]);

  const signInWithGoogle = useCallback(async () => {   
    try {        
      const result = await Google.logInAsync({
        iosClientId: '905716709695-vu1dktqd71vngqtemd5o9djaijg2c2cr.apps.googleusercontent.com',
        androidClientId: '905716709695-3spt8g4468dm3mfhan2s2igp30e3p4u6.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {

        const userLogged = {
          id: String(result.user.id),                
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!
        };


        setUser(userLogged);          
        await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged)); 
      }
    } catch (error) {
      throw new Error(error);
    }
  }, [setUser]);


  const signInWithApple = useCallback(async () => {      
    try {      
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });                
  
      if (credential) {
        const userLogged = {
          id: String(credential.user),                
          email: credential.email!,
          name: credential.fullName?.givenName!,
          photo: undefined
        };

        setUser(userLogged);          
        await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));            
      }
    } catch (error) {
      throw new Error(error);
    }
  }, [setUser]);

  const signOut = useCallback(async () => {
    setUser(undefined);
    await AsyncStorage.removeItem('@gofinances:user');            
  },[setUser]);

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        signInWithGoogle, 
        signInWithApple, 
        signOut,
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };