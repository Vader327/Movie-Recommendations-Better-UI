import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Animated, ImageBackground, Image, TouchableHighlight } from "react-native";
import { Header, AirbnbRating, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      movieDetails: {},
      scrollY: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.getMovie();
  }

  timeConvert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return `${hours}h ${minutes}m`;
  }

  getMovie=()=>{
    var url = "https://vader27-flask.glitch.me/get-movie";
    axios.get(url).then(response=>{
      let details = response.data.data;
      details["duration"] = this.timeConvert(details.duration);
      this.setState({movieDetails: details});
    })
    .catch(error => {
      console.log(error);
    });
  };

  likedMovie=()=>{
    var url = "https://vader27-flask.glitch.me/liked-movie";
    axios.post(url).then(response=>{
      this.getMovie();
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  unlikedMovie=()=>{
    var url = "https://vader27-flask.glitch.me/unliked-movie";
    axios.post(url).then(response=>{
      this.getMovie();
    })
    .catch(error => {
      console.log(error.message);
    });
  };

  notWatched=()=>{
    var url = "https://vader27-flask.glitch.me/did-not-watch";
    axios.post(url).then(response=>{
      this.getMovie();
    })
    .catch(error => {
      console.log(error.message);
    });
  };

  render() {
    var { movieDetails } = this.state;
    if (movieDetails.poster_link) {
      var { poster_link, title, release_date, duration, overview, rating } = movieDetails;

      var imageOpacity = this.state.scrollY.interpolate({
        inputRange: [0, 140],
        outputRange: [0, 0.7],
        extrapolate: 'clamp',
      });

      return (
        <View style={{flex: 1, backgroundColor: '#ff416c'}}>
          <Header centerComponent={{text: "Movies", style: {color: '#fff', fontWeight: 'bold', fontSize: 20}}}
          backgroundColor="#ff416c" containerStyle={{borderBottomWidth: 0}} rightComponent={
            <TouchableOpacity style={{backgroundColor: '#ff416c'}} onPress={()=>this.props.navigation.navigate("RecommendedMovies")}>
              <Icon name="movie-open" type="material-community" color="#fff" />
            </TouchableOpacity>
          } />

          <ScrollView scrollEventThrottle={16}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}], {useNativeDriver: false})}>
            <ImageBackground source={{uri: poster_link}} blurRadius={10} style={{height: 300, backgroundColor: 'black'}}>
              <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}}
              source={{uri: poster_link}} />

              <Animated.View style={{backgroundColor: 'black', width: '100%', height: '100%', position: 'absolute', opacity: imageOpacity}} />
            </ImageBackground>

            <View style={{backgroundColor: '#fff', borderRadius: 20, transform: [{translateY: -20}], paddingBottom: 50, paddingHorizontal: 20, height: '100%'}}>

              <View style={{marginTop: 20}}>
                <Text style={styles.title}>{title}</Text>
                <Text>{`${release_date.split("-")[0]} | ${duration}`}</Text>
              </View>

              <AirbnbRating count={10} defaultRating={rating} isDisabled={true} size={20} starContainerStyle={{marginTop: -5, marginBottom: 20}} />

              <Text style={styles.overview}>{overview}</Text>

              <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 20, marginBottom: 10, width: '100%', alignSelf: 'center'}}>
                <TouchableHighlight onPress={this.likedMovie} style={[styles.rateButton, {backgroundColor: '#2ecc71'}]} underlayColor="#26ad60">
                  <Icon name="ios-checkmark" type="ionicon" size={25} color="white" iconStyle={{fontSize: 50}} />
                </TouchableHighlight>

                <TouchableHighlight onPress={this.unlikedMovie} style={[styles.rateButton, {backgroundColor: '#e74c3c'}]} underlayColor="#c73e30">
                  <Icon name="ios-close" type="ionicon" size={25} color="white" iconStyle={{fontSize: 50}} />
                </TouchableHighlight>
              </View>

              <TouchableHighlight style={[styles.rateButton, {width: '100%', backgroundColor: "#1c77ff"}]} onPress={this.notWatched} underlayColor="#1b6ae0">
                <Text style={styles.buttonText}>Did not watch</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>
      );
    }
    else{
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5
  },
  overview: {
    fontSize: RFValue(17),
    fontWeight: "300",
    color: "gray",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: 'white',
  },
  rateButton:{
    backgroundColor: '#fff',
    width: '45%',
    height: 50,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
});