import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import { styles } from './style';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Filter from '@/components/Filter';
import { Status } from '@/types/status';
import Item from '@/components/Item';

const FILTER_STATUS: Status[] = [Status.DONE, Status.PEDING];
const ITEMS = [
  {
    id: '1',
    status: Status.DONE,
    description: 'teste',
  },
  {
    id: '2',
    status: Status.PEDING,
    description: 'teste teste',
  },
  {
    id: '3',
    status: Status.DONE,
    description: 'teste teste teste',
  },
  {
    id: '4',
    status: Status.DONE,
    description: 'teste teste teste',
  },
  {
    id: '5',
    status: Status.DONE,
    description: 'teste teste teste',
  },
  {
    id: '6',
    status: Status.DONE,
    description: 'teste teste teste',
  },
  {
    id: '7',
    status: Status.DONE,
    description: 'teste teste teste',
  },
  {
    id: '8',
    status: Status.DONE,
    description: 'teste teste teste',
  },
  {
    id: '9',
    status: Status.DONE,
    description: 'teste teste teste',
  },
  {
    id: '10',
    status: Status.DONE,
    description: 'teste teste teste',
  },
  {
    id: '11',
    status: Status.DONE,
    description: 'teste teste teste',
  },
  {
    id: '12',
    status: Status.DONE,
    description: 'teste teste teste',
  },
];
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
        <FlatList
          data={ITEMS} //array dos items que precisam ser renderizados
          keyExtractor={(item) => item.id} //de onde vem as keys para identificação unica
          renderItem={(
            { item } //componente que vai renderizar os items e o valor das props
          ) => (
            <Item
              data={{
                status: item.status,
                description: item.description,
              }}
              onRemove={() => console.log('remover')}
              onStatus={() => console.log('status')}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item encontrado.</Text>
          )} // para quando temos uma lista vazia
          ItemSeparatorComponent={() => <View style={styles.separator} />} // podemos criar um componente para separar os items
          contentContainerStyle={styles.listContent} // aqui é style para a FlatList(component que está segurando os items)
          showsVerticalScrollIndicator={false} //remove o barra de rolagem
        />
      </View>
    </View>
  );
}
