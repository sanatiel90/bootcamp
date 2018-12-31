import React, { Component } from 'react';
//withNavigation: usado para dar acesso ao recurso do navigation em componentes q nao estao no routes (pois nao sao diretamente paginas)
import { withNavigation } from 'react-navigation'
import { View, Text, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types'
//lib para usar icons no react-native
import Icon from 'react-native-vector-icons/FontAwesome'

class Header extends Component {   
    static propTypes = {
        title: PropTypes.string.isRequired,
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        }).isRequired,
    }
    
    //logout
    singOut = async () => {
        const { navigation } = this.props
        await AsyncStorage.clear()
        navigation.navigate('Welcome')
    }

    render(){
        const { title } = this.props

        return(
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.left} ></View>
                <Text style={styles.title} >{ title }</Text>
                <TouchableOpacity onPress={this.singOut}> 
                    <Icon name="exchange" size={22} style={styles.icon} /> 
                </TouchableOpacity> 
            </View> 
        )
    }
}



//withNavigation: usado para dar acesso ao recurso do navigation em componentes q nao estao no routes (pois nao sao diretamente paginas)
export default withNavigation(Header)