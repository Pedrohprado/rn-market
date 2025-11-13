import { StatusBar } from 'expo-status-bar';
import { View, Image } from 'react-native';
import { styles } from './style';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Filter from '@/components/Filter';
import { Status } from '@/types/status';

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder='O que você precisa comprar?' />
        <Button title='lançar' />
      </View>

      <View style={styles.content}>
        <Filter status={Status.DONE} isActive />
      </View>
    </View>
  );
}
