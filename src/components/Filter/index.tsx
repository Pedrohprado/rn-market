import { Status } from '@/types/status';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { styles } from './style';

interface FilterProps extends TouchableOpacityProps {
  status: Status;
  isActive: boolean;
}

export default function Filter({ status, isActive, ...rest }: FilterProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          opacity: isActive ? 1 : 0.5,
        },
      ]}
      {...rest}
    >
      <Text style={styles.title}>
        {status === Status.DONE ? 'Comprados' : 'Pendentes'}
      </Text>
    </TouchableOpacity>
  );
}
