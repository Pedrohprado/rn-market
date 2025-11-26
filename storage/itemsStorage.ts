import AsyncStorage from '@react-native-async-storage/async-storage';
import { Status } from '@/types/status';

const ITEMS_STORAGE_KEY = '@comprar:items';

export interface ItemStorage {
  id: string;
  status: Status;
  description: string;
}

export async function get(): Promise<ItemStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);

    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw new Error('ITEMS_GET: ' + error);
  }
}

export async function getByStatus(status: Status): Promise<ItemStorage[]> {
  const items = await get();

  return items.filter((item) => item.status === status);
}

export async function add(newItem: ItemStorage): Promise<ItemStorage[]> {
  const items = await get();

  const updatedItems = [...items, newItem];

  await save(updatedItems);
  return updatedItems;
}

export async function save(items: ItemStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error('ITEMS_SAVE: ' + error);
  }
}

export async function remove(id: string): Promise<void> {
  const items = await get();

  const updatedItems = items.filter((item) => item.id !== id);

  await save(updatedItems);
}

export async function clear() {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY);
  } catch (error) {
    throw new Error('ITEMS_CLEAR: ' + error);
  }
}
