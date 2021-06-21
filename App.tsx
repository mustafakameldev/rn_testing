import React from 'react';
import { Text, ScrollView } from 'react-native';
import LoginScreen from './src/screens/Login';
function App() {
  const [data, setData] = React.useState({});

  return (
    <ScrollView>
      <LoginScreen />
    </ScrollView>
  );
}
export default App;
