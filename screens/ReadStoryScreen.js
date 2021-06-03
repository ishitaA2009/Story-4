import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import db from '../config';
import {ScrollView} from 'react-native-gesture-handler';

export default class ReadStoryScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      allStories: [],
      dataSource: [],
      search: '',
    };
  }

  componentDidMount() {
    this.retriveStories();
  }
  retriveStories = async () => {
    try {
      var allStories = [];
      var stories = db.collection('addStory').get()
        .then(() => {
          allStories.push(doc.data());
          this.setState({ allStories });
        });
    } catch (error) {
      alert(error);
    }
  }

  searchFilter(text){
    var text=this.state.search.toUpperCase()
    var enteredText=text.split("")
    const newData=this.state.allStories.filter((item)=>{
      const itemData=item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData= text.toUpperCase();
      return itemData(textData) > -1;
    })
    this.setState({
      dataSource:newData,
      search:text
    })
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  render(){
    return (
        <ScrollView>

          <SearchBar
            placeholder="Search Here....."
            onChangeText={(text)=> this.searchFilter(text)}
            onClear={(text)=> this.searchFilter('')}
            value={this.state.search}
          />

          {
            this.state.allStories.map((item,index)=>{

              data={this.state.search==="" ? this.state.allStories:this.state.dataSource}
              return(
                <View style={{borderBottomWidth: 2 ,borderRadius:3,backgroundColor:'pink',marginTop:4,}}>
                  <Text> Title: {item.title}</Text>
                  <Text> Author: {item.author}</Text>
                  <Text> Story: {item.story}</Text>
                </View>
              )
            })
          }

        </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
