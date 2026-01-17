import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {loadFavorites} from './store/slices/favoritesSlice';
import AppNavigator from './navigation/AppNavigator';

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

function AppContent() {
  useEffect(() => {
    store.dispatch(loadFavorites());
  }, []);

  return <AppNavigator />;
}

export default App;