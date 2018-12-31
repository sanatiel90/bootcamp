import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Welcome from '~/pages/Welcome'
import Repositories from '~/pages/Repositories'

//criando as rotas; toda rota colocada dentro de um navigator, como createSwitchNavigator, createTabNavigator e outras
//automaticamente recebe um prop chamada 'navigation' q fornece dados e metodos a serem usados, como por exemplo met para navegar para outra tela
//nesse caso Routes foi transformado em uma funcao, para q receba um parametro userLogged, q indica se user ta logado ou nao;
//com base nessa informacao vai ser definida qual a tela inicial do app, atraves da prop initialRouteName
//createSwitchNavigator- 1 param: obj com os componentes q serao as telas; 2 param: obj com options, como initialRouteName, q indica qual a rota inicial 
const Routes = (userLogged = false) => createAppContainer(createSwitchNavigator(
    {
        Welcome,
        Repositories,
    },
    {
        initialRouteName: userLogged ? 'Repositories' : 'Welcome'
    }
))

export default Routes