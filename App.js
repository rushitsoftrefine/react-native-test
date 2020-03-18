import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, SectionList, SafeAreaView} from 'react-native';
import PeopleListRow from './components/PeopleListRow';
import data from './jsonfile/users.json';
import './assets/style.css';

const s = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  pageTitle: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '900',
    padding: 10,
  },
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  rootListItem: {
    padding: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderBottomColor: '#000',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  SectionHeader: {
    backgroundColor: '#64B5F6',
    fontSize: 20,
    padding: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  rootItem: {
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

export default function App() {
  const [search, setSearch] = useState('');
  const [people, setPeople] = useState([]);
  const [selectItem, setSelectItem] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      console.log(data);
      //const { results } = await fetch('./jsonfile/users.json').then((res) => res.json());
      data.sort(function(a, b) {
        return a.name.last.localeCompare(b.name.last);
      });
      setPeople(
        data.map(user => ({
          title: user.name.last.charAt(0),
          data: [user],
        }))
      );
    };
    fetchUsers();
  }, [setPeople]);

  return (
    <SafeAreaView style={s.root}>
      <View style={s.container}>
        <Text children="PEOPLE DIRECTORY" style={s.pageTitle} />
        {/* Implement live search functionality. (it should search without case sensitivity in the following properties: person's full name, email, phone & cell numbers) */}
        <TextInput
          style={s.input}
          onChange={e => {
            const newData = data.filter(item => {
              const searchData = `${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()} ${item.email.toUpperCase()} ${item.phone.toUpperCase()} ${item.cell.toUpperCase()}`;
              const textData = e.target.value.toUpperCase();

              return searchData.indexOf(textData) > -1;
            });

            setPeople(
              newData.map(user => ({
                title: user.name.last.charAt(0),
                data: [user],
              }))
            );
            setSearch(e.target.value);
          }}
          value={search}
        />
        <SectionList
          sections={people}
          stickySectionHeadersEnabled={true}
          renderItem={({item}) => <PeopleListRow {...item} />}
          /* Fix SectionList's headers. People dictionary needs to be wrapped by the first character of their last name. */
          renderSectionHeader={({section}) => (
            <Text style={s.SectionHeader}> {section.title} </Text>
          )}
          keyExtractor={(item, index) => item.login.uuid}
        />
      </View>
    </SafeAreaView>
  );
}
