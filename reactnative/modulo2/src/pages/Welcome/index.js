import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, AsyncStorage, ActivityIndicator } from 'react-native'
import styles from './styles'
import api from '~/services/api'
import PropTypes from 'prop-types'

export default class Welcome extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        }).isRequired,
    }
    
    state = {
        username: '',
        loading: false,
        error: false
    }
    
    checkUserExists = async (username) => {
        const user = await api.get(`/users/${username}`)

        return user
    }

    //metodo para salvar no storage do cel
    saveUser = async(username) => {
        //AsyncStorage.setItem do react-native, 1 param: key, 2 param value 
        await AsyncStorage.setItem('@Githuber:username', username)
    }


    //met faz o login 
    singIn = async () => {
        //toda rota colocada dentro de um navigator, como createSwitchNavigator, createTabNavigator e outras
        //automaticamente recebe um prop chamada 'navigation' q fornece dados e metodos a serem usados, como por exemplo met para 
        //navegar para outra tela
        const { navigation } = this.props
        const { username } = this.state
        this.setState({ loading: true })
        try {
            await this.checkUserExists(username) //consulta api do github
            await this.saveUser(username) //salva no storage

            //navigate: redireciona para outra tela (componente), recebe como param o nome do componente('tela') pra onde vai
            navigation.navigate('Repositories') //rediciona pra outra tela
            
        } catch (err) {
            this.setState({ loading: false, error: true })
            
        }
    }

    render(){
        const { username, loading, error } = this.state
        return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Text style={styles.title} >Bem vindo</Text>
            <Text style={styles.text} >Para continuar precisamos que você informe seu usuário no Github</Text>

            { error && <Text style={styles.error} >Usuário inexistente</Text> }

            <View style={styles.form}>
                <TextInput 
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Digite seu usuário"
                    underlineColorAndroid="transparent" 
                    value={username}
                    onChangeText={text => { this.setState({ username: text }) }}
                    />
                <TouchableOpacity  style={styles.button} onPress={ this.singIn } >
                    { loading === true ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.textButton}>Prosseguir</Text> }  
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}          
    

//TouchableOpacity: tipo de botao

//algumas props de TextInput:
//autoCapitalize=none: evita q automaticamente sejam colocadas letras maiusculas em inicio de frase
//autoCorrect=false: remove autocorrecao
//underlineColorAndroid="transparent" : deixa transparente a linha inferior padrao dos textinput    

//<StatusBar barStyle="light-content" />: componente q pode estilizar a status bar com um tema(barStyle) e uma cor de fundo (backgroundColor)

//<ActivityIndicator size="small" color="#FFF" />: mostra um simbolo de carregando