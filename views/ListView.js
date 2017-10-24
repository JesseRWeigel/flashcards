import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableNativeFeedback,
  AsyncStorage
} from 'react-native'
import { purple, white } from '../utils/colors'
import { connect } from 'react-redux'
import { fetchDecks } from '../actions'

class ListView extends React.Component {
  componentWillMount() {
    AsyncStorage.clear()
    this.props.fetchData()
  }
  renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback
        key={item.title}
        onPress={() => this.props.navigation.navigate('Deck', { deck: item })}
      >
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.number}>{`${item.questions &&
            item.questions.length} Cards`}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
  render () {
    return (
      <View style={styles.container}>
        {this.props.decks &&
          <Text style={styles.title}>Please create a new deck!</Text>
        }
        <FlatList
          data={this.props.decks !== undefined && Object.values(this.props.decks)}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.title}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'row'
  },
  item: {
    backgroundColor: white,
    borderBottomColor: purple,
    borderBottomWidth: 2,
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 20
  },
  number: {
    color: 'rgba(0,0,0,0.54)'
  }
})

const mapStateToProps = state => ({
  decks: state
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  fetchData: () => dispatch(fetchDecks())
})

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
