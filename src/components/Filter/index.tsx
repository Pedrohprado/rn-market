import { styles } from './style';
import { Status } from '@/types/status';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import StatusIcon from '../StatusIcon';
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
      activeOpacity={0.8}
      {...rest}
    >
      <StatusIcon status={status} />
      <Text style={styles.title}>
        {status === Status.DONE ? 'Comprados' : 'Pendentes'}
      </Text>
    </TouchableOpacity>
  );
}
