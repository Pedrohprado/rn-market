import { View, Text } from 'react-native';
import React from 'react';
import { Status } from '@/types/status';
import { CircleCheck, CircleDashed } from 'lucide-react-native';

interface StatusIconProps {
  status: Status;
}

export default function StatusIcon({ status }: StatusIconProps) {
  return (
    <View>
      {status === Status.DONE ? (
        <CircleCheck size={18} color={'#2C46B1'} />
      ) : (
        <CircleDashed size={18} color={'#000'} />
      )}
    </View>
  );
}
