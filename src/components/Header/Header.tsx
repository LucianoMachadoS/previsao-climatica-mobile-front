import React from 'react';
import { View, Text, Image } from 'react-native';

import { styles } from './HeaderStyles';

export function Header() {
  return (
    <View style={styles.header}>
            <Text style={styles.headerText}>Etec Wheather</Text>
            <Image style={styles.logo} source={require('../../../assets/logo.png')}/>
        </View>
  );
}