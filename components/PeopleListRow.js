import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const s = StyleSheet.create({
  root: {
    padding: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderBottomColor: '#000',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const PeopleListRow = (data) => {
  return (
    <TouchableOpacity>
      <View style={s.root}>
        <Text children={`${data.name}`} />
      </View>
    </TouchableOpacity>
  );
};

export default PeopleListRow;