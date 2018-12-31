import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import '~/config/ReactotronConfig'
//apesar de exportar um Routes, aqui sera importado como createNavigator
import createNavigator from '~/routes'

export default class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
  }

  async componentDidMount(){
    const username = await AsyncStorage.getItem('@Githuber:username')

    //sintaxe !!username: usar !! transforma a var num boleano, q retorna false se a var estiver vazia ou true se a var possuir algum conteudo
    this.setState({
      userChecked: true,
      userLogged: !!username
    })
  }

  render(){
    const { userChecked, userLogged } = this.state

    //se nao tiver sido checado ainda se user esta logado, nao retornar nada
    if(!userChecked) return null

    //acessa a funcao createNavigator lá do Routes para saber qual view renderizar de acordo com usuario logado ou nao
    const Routes = createNavigator(userLogged)

    return <Routes/>
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

  