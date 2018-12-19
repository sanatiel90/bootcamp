import React, { Component, Fragment } from 'react'
//render geral q é usado 1 unica vez no arquivo principal da app para renderizar o conteudo
import { render } from 'react-dom'
//lib para definir tipagem e obrigatoriedade de props dos comp
import PropTypes from 'prop-types'
//importando componente
import Link from './Link'
//importando arquivo css no js; possivel devido a config no webpack
import './style.scss'
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';

//comppnente precisa ter obrigatoriamente o met render q retorna um JSX
//quando um componente é uma classe q estende de Component, é um comp Stateful, pois pode manipular estado(state) dentro dele
//já um comp declarado como funcao é um comp stateless, q pode usar as props mas não o estado, e nao precisa de render
class Button extends Component {
    //essas props ficaram acessiveis staticamente via plugin babel
    static defaultProps = {
        titulo: 'Enviar Padrao'
    }

    static propTypes = {
        onClick: PropTypes.func.isRequired, //tem q ser funcao e é obrigatorio
        children: PropTypes.string,  //tem q ser string
    }

    render(){
        //quando retorno possui apenas uma linha, nao precisa parenteses nem wrapper
        //usando props para acessar valores enviados a esse componente pelo comp App
        return <button onClick={this.props.onClick}>{ this.props.titulo }</button>
    }
}


/**
 * FORMA PADRAO DE DEFINIR defaultProps E propTypes PARA UM COMPONENTE; NO LUGAR DESSA ESTA SENDO USADA FORMA
 * STATIC DENTRO DA PROPRIA CLASSE ATRAVES DE PLUGIN DO BABEL
 */
/*
//defaultProps: faz com q um comp defina alguns valores padroes para propriedads caso as msm nao sejam informadas
Button.defaultProps = {
    titulo: 'Enviar Padrao'
}

//propTypes: define tipagem e required para props do comp
Button.propTypes = {
    onClick: PropTypes.func.isRequired, //tem q ser funcao e é obrigatorio
    children: PropTypes.string,  //tem q ser string
}
*/



class App extends Component {
    //state: define variaveis q podem ser manipuladas pelo comp; os valores definidos no state podem ser acessados por this.state.variavel
    //porem o estado é imutavel e portanto nao pode ser modificado por essa forma; para modificar precisa ser feito uma sobreposicao do
    //valor atraves do metodo setState
    state = {
        counter: 0,
        error: 'ERR'
    }
    //funcoes definidas dentro do componente (com excecao das func padroes do React) preferencialmente devem ser declaradas
    //como arrow functions, para que o this continue referenciando à class componente
    handleClick = () => {
        this.setState({ counter: this.state.counter + 1 })
        //info: estado no react é assincrono, assim apesar de setState modificar o estado, para esse estado modificado
        //poder ser acessado logo em seguida para outra modificacao é preciso adicionar um segund param como callback para
        //o setState ou entao usar dentro do setState uma funcao com parametro 'state' q instantaneamente acessa o novo valor modificado
        //essas açoes no entanto são pouco utilizadas
    }

    //métodos de ciclo de vida do comp
    //sao metodos proprios do react q sao chamados de acordo com certas ações do componente
    //componentDidMount(): chamado automaticamente assim q o comp aparece em tela; pode ser por exemplo usado para carregar dados de uma api
    //ou para cadastrar eventlisteners
    //componentWillMount(): chamado quando o comp deixa de existir; usado geralmente para limpar eventlisteners criado no componentDidMount

    //existem tbm metodos de ciclo de vida q sao chamados quando o comp tiver seu state ou props modificado
    //shouldComponentUpdate(nextProps, nextState): chamado exatamente antes de atualizar o state/prop; usando os params nextProps, nextState
    //pode-se acessar quais os novos valores q serao atribuidos e definir por exemplo um fluxo fazendo com que o comp só renderize
    //novamente a prop/state se estiver de acordo com o metodo shouldComponentUpdate()
    //componentDidUpdate(prevProps, prevState): chamado depois q a atualizacao de state/prop é feita, e tem acesso aos params
    //prevProps, prevState
    //quando é feita mudanca o ciclo de vida fica algo como:
    // 1º shouldComponentUpdate: executado logo antes de atualizar a prop/state
    // 2º componente passou pelo shouldComponentUpdate() e renderizou
    // 3º componentDidUpdate: executado logo depois q atualizou

    render(){
        //quando retorno tiver mais de uma linha, os elementos precisam estar envolvidos dentro um wrapper, que pode
        //por exemplo ser uma div simples. Porém como a div tem por padrão algumas formatações já definidas pelo html, como espaçamento
        //o React fornece um componente chamado <Fragment> que serve como wrapper padrao e não possui nenhuma formatacao que possa modificar seu layout
        return (
            <Fragment>
                <h1>Hello RocketSeat</h1>
                <Button titulo="Contar" onClick={this.handleClick} />
                <h2>{this.state.counter}</h2>
                <br/>
                <Button onClick={ () => alert('Button 2') }></Button>
                <br/>
                <div>{ this.state.error && 'Erro' }</div>
                <Link>Sou um link</Link>
            </Fragment>
        )
    }
}

//render principal: vai renderizar o componente App dentro do elemento 'app' q tiver no index.html
render(<App />, document.getElementById('app'))
