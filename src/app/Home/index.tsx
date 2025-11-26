import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import { styles } from './style';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Filter from '@/components/Filter';
import { Status } from '@/types/status';
import Item from '@/components/Item';
import { useEffect, useState } from 'react';
import {
  add,
  clear,
  get,
  getByStatus,
  ItemStorage,
  remove,
  toggleStatus,
} from '../../../storage/itemsStorage';

const FILTER_STATUS: Status[] = [Status.DONE, Status.PEDING];

export function Home() {
  const [filter, setFilter] = useState<Status>(Status.PEDING);
  const [description, setDescription] = useState<string>('');
  const [items, setItems] = useState<ItemStorage[]>([]);

  async function handleFilterItems(status: Status) {
    const items = await getByStatus(status);
    setItems(items);
    setFilter(status);
  }

  async function itemsByStatus() {
    try {
      const response = await getByStatus(filter);
      setItems(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveItem(idItem: string) {
    try {
      await remove(idItem);
      await itemsByStatus();
    } catch (error) {
      console.log(error);
    }
  }
  async function handleAdd() {
    if (!description.trim()) {
      Alert.alert('Descrição', 'Informe a descrição!');
      return;
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: Status.PEDING,
    };

    await add(newItem);
    await itemsByStatus();
    setDescription('');
  }

  function handlerClear() {
    Alert.alert('remover', 'Deseja remover todos os items da lista?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => onClear(),
      },
    ]);
  }

  async function onClear() {
    try {
      await clear();
      setItems([]);
    } catch (error) {
      console.log(error);
    }
  }

  async function onToggleStatus(itemId: string) {
    await toggleStatus(itemId);
    await itemsByStatus();
  }

  useEffect(() => {
    get().then((response) => setItems(response));
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} />

      <View style={styles.form}>
        <Input
          placeholder='what?'
          value={description}
          onChangeText={setDescription}
        />
        <Button title='lançar' onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status, index) => (
            <Filter
              key={index}
              status={status}
              isActive={status === filter}
              onPress={() => handleFilterItems(status)}
            />
          ))}

          <TouchableOpacity style={styles.clearButton} onPress={handlerClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={items} //array dos items que precisam ser renderizados
          keyExtractor={(item) => item.id} //de onde vem as keys para identificação unica
          renderItem={(
            { item } //componente que vai renderizar os items e o valor das props
          ) => (
            <Item
              data={{
                status: item.status,
                description: item.description,
              }}
              onRemove={() => {
                handleRemoveItem(item.id);
              }}
              onStatus={() => onToggleStatus(item.id)}
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
