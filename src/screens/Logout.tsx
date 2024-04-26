import React, { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import DataContext from '../contexts/DataContext'; // Adjust the path as necessary

const LogoutScreen = () => {
  const { setUser } = useContext(DataContext);
  const navigation = useNavigation();

  useEffect(() => {
    
    setUser(null);

  }, []);


  return null;
};

export default LogoutScreen;