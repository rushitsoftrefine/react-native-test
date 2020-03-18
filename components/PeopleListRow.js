import React, {useState} from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from './userDetailModel';

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
  const [selectItem, setSelectItem] = useState([]);

  const [show, setShow] = useState(false);
  const openModal = () => setShow(false);
  const closeModal = () => setShow(false);

  return (
    <View>
      <TouchableOpacity activeOpacity={1} onPress={() => { setShow(true); setSelectItem(data); }} >
        <View style={s.root}>
          <Image source={{uri: data.picture.medium}} style={s.userImage} />
          <Text children={`${data.name.first + ' ' + data.name.last}`} />
        </View>
      </TouchableOpacity>
      {/* Open detail modal - when clicking on a person, a modal should be opened displaying the following informations: full name, email, phone, cell phone, picture. */}
      {show && (
        <Modal closeModal={closeModal} show={show} itemData={selectItem} />
      )}
    </View>
  );
};

export default PeopleListRow;