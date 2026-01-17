import type {StackNavigationProp} from '@react-navigation/stack';
import type {RouteProp} from '@react-navigation/native';


export type RootStackParamList = {
  MainTabs: undefined;
  Detail: {
    productId: number;
  };
};


export type BottomTabParamList = {
  Home: undefined;
  Favorites: undefined;
};