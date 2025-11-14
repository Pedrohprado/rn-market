import { View, Text, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import StatusIcon from '../StatusIcon';
import { Status } from '@/types/status';
import { styles } from './style';

interface ItemDataProps {
  status: Status;
  description: string;
}

interface ItemProps {
  data: ItemDataProps;
  onRemove: () => void;
  onStatus: () => void;
}

export default function Item({ data, onStatus, onRemove }: ItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>
      <Text style={styles.description}>{data.description}</Text>
      <TouchableOpacity onPress={onRemove}>
        <Trash2 size={18} color={'#828282'} />
      </TouchableOpacity>
    </View>
  );
}
