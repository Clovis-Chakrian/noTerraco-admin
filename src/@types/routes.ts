import { StackScreenProps } from '@react-navigation/stack'

type StackParamList = {
  Login: undefined,
  Home: undefined,
  CreateProduct: undefined,
  AccountConfig: undefined,
  EditProduct: { productId: number }
};

export type PropsLogin = StackScreenProps<StackParamList, 'Login'>
export type PropsHome = StackScreenProps<StackParamList, 'Home'>
export type PropsCreateProduct = StackScreenProps<StackParamList, 'CreateProduct'>
export type PropsAccountConfig = StackScreenProps<StackParamList, 'AccountConfig'>
export type PropsEditProduct = StackScreenProps<StackParamList, 'EditProduct'>