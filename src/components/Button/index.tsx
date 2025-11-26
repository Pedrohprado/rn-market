import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';

import { styles } from './style';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  description?: string;
}

export default function Button({ title, description, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={
        !description || description.length < 1
          ? styles.disabled
          : styles.container
      }
      activeOpacity={0.8}
      disabled={!description || description.length < 1 ? true : false}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
