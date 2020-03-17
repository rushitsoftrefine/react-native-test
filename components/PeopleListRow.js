import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

const s = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderBottomColor: '#000',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  userImage: {
    width: 40,
    height: 40,
    marginLeft: 8,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
  },
});

const PeopleListRow = data => {
  return (
    <TouchableOpacity activeOpacity={1}>
      <View style={s.root}>
        <Image source={{uri: data.picture.medium}} style={s.userImage} />{/* Extend PeopleListRow to display user images. */}
        <Text children={`${data.name.first + ' ' + data.name.last}`} />{/* Fix PeopleListRow to display names correctly. */}
      </View>
    </TouchableOpacity>
  );
};

export default PeopleListRow;