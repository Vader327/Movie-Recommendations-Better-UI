import React, { Component } from "react";
import { View, StyleSheet, FlatList, Image, Text } from "react-native";
import { Icon } from 'react-native-elements';
import axios from "axios";

export default class PopularMoviesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  timeConvert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return `${hours}h ${minutes}m`;
  }

  getData = () => {
    var url = "https://vader27-flask.glitch.me/popular-movies";
    axios.get(url)
    .then(async response=>{this.setState({data: response.data.data})})
    .catch(error=>{console.log(error.message);});
  };

  keyExtractor=(item, index)=>index.toString();

  renderItems=({ item, index })=>{
    return (
      <View style={styles.cardContainer}>
        <View style={{height: 300, overflow: 'hidden', borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
          <Image source={{uri: item.poster_link}} resizeMode="cover" style={{width: '100%', height: '100%'}} />
        </View>        

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{`${item.release_date.split("-")[0]} | ${this.timeConvert(item.duration)}`}</Text>

        <View style={{flexDirection: 'row', marginBottom: 20, marginHorizontal: 15}}>
          <Icon name="star" type="ionicons" size={20} color="#ff416c" />
          <Text style={{color: '#aaaaaa', fontSize: 18, marginLeft: 5}}>{item.rating}/10</Text>
        </View>
      </View>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList data={data} keyExtractor={this.keyExtractor} renderItem={this.renderItems} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10
  },
  subtitle: {
    color: '#aaaaaa',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10
  },
  cardContainer: {
    borderRadius: 20,
    margin: 20,
    backgroundColor: '#fff',
    shadowColor: 'gray',
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 0},
    elevation: 10,
  }
});
