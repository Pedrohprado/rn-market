import { View, Image, TouchableOpacity, Text } from 'react-native';
import { styles } from './style';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Filter from '@/components/Filter';
import { Status } from '@/types/status';

const FILTER_STATUS: Status[] = [Status.DONE, Status.PEDING];

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder='what?' />
        <Button title='lançar' />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status, index) => (
            <Filter key={index} status={status} isActive />
          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
