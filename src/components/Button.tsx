import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
function Button({ styles, children }) {
  return (
    <TouchableOpacity style={[styles.button]}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
export default Button;
