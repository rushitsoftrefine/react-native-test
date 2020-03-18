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
  }
});

export default function App() {
  const [search, setSearch] = useState('');
  const [people, setPeople] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      console.log(data);
      //const { results } = await fetch('./jsonfile/users.json').then((res) => res.json());
      getUserData(data)
         
    };
    fetchUsers();
  }, [setPeople]);

  function getUserData(data){
    data.sort(function(a, b) {
      return a.name.last.localeCompare(b.name.last);
    });

    let users = [];
    for (let item of data) {
      if (!checkTitle(users, item.name.last.charAt(0))) {
        let obj = {
          title: item.name.last.charAt(0),
          data: [item],
        };
        users.push(obj);
      } else {
        let obj = {
          title: '',
          data: [item],
        };
        users.push(obj);
      }
    }
    setPeople(users); 
  }

  function checkTitle(arr, data) {
    for (let item of arr) {
      if (item.title == data) {
        return true;
      }
    }
  }
  
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

            getUserData(newData)

            setSearch(e.target.value);
          }}
          value={search}
        />
        <SectionList
          sections={people}
          stickySectionHeadersEnabled={true}
          renderItem={({item}) => <PeopleListRow {...item} />}
          /* Fix SectionList's headers. People dictionary needs to be wrapped by the first character of their last name. */
          renderSectionHeader={({section}) => {
            if (section.title !== '') {
              return (
                <View>
                  <Text style={s.SectionHeader}> {section.title}</Text>
                </View>
              );
            } else {
              return null;
            }
          }}
          keyExtractor={(item, index) => item.login.uuid}
        />
      </View>
    </SafeAreaView>
  );
}
