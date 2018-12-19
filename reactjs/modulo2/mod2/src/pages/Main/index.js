import React, { Component } from 'react'
import logo from '../../assets/logo.png'
import { Container, Form } from './style'
import CompareList from './../../components/CompareList'
import api from '../../services/api'
import moment from 'moment'

class Main extends Component{
  state = {
    repositoryError: false,
    loading: false,
    repositoryInput: '',
    repositories : []
  }

  //quando o app iniciar, carregar repositorios salvos no local storage
  async componentDidMount(){
    this.setState({ loading: true })

    this.setState({ loading: false, repositories: await this.getLocalRepositories() })
  }

  //met q recupara o local storage @GitCompare:repositories ou retorna array vazio caso nao houver
  getLocalRepositories = async () => {
    //o item recuperado tem q passar por um parse JSON
    return  JSON.parse(await localStorage.getItem('@GitCompare:repositories')) || []
  }



  //func disparada no onSubmit do form, recebe o evento como param; vai fazer a consultaà api e salvar repositorio no local storage
  handleAddRepository = async (e) => {
    e.preventDefault() //retira o comportamento padrao do form recarrega a pag

    this.setState({
      loading: true
    })

    try {
      const { repositoryInput, repositories } = this.state
      //req à api: a api do github vai retornar um obj 'data', q aqui estamos pegando via desestruturacao e renomeando para repository
      const { data: repository } = await api.get(`/repos/${repositoryInput}`)

      //formatando a data: sempre formatar valores antes q seja repassado para o render (ao usar setState o render é chamado), para diminuir processanto
      //aqui estamos add um novo campo (lastCommit) ao obj, campo com a data formatada de acordo com o pushed_at informado pela api
      repository.lastCommit = moment(repository.pushed_at).fromNow()

      //salva repos buscado no state
      this.setState({
        repositoryInput: '',
        //atualiza o estado com o valor q já possuia (usando operador spread) e o novo valor
        repositories : [ ...repositories, repository ],
        repositoryError: false
      })

      //recupera repos locais
      const localRepositories = await this.getLocalRepositories()

      //salva no local storage os repos q ja existiam e o novo buscado; precisa fazer um JSON stringify para salvar os dados
      await localStorage.setItem('@GitCompare:repositories', JSON.stringify([...localRepositories, repository]))

    } catch (err) {
      console.log(err)
      this.setState({
        repositoryError: true
      })
    } finally {
      this.setState({
        loading: false
      })
    }

  }

  //met para atualizar repos
  handleUpdateRepository = async (id) => {
    const { repositories } = this.state
    this.setState({
      loading: true
    })
    //pega somente o repo informado
    const repository = repositories.find(repo => repo.id === id)
    try {
      const { data } = await api.get(`/repos/${repository.full_name}`)

      data.lastCommit = moment(data.pushed_at).fromNow()

      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo))
      })

      await localStorage.setItem('@GitCompare:repositories', JSON.stringify(repositories))

    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({
        loading: false
      })
    }

  }

  handleRemoveRepository = async (id) => {
      const { repositories } = this.state
      //cria uma nova lista de repositorios, com todos os repo menos o informado
      const updatedRepositories = repositories.filter(repo => repo.id !== id)
      this.setState({
        repositories: updatedRepositories
      })
      await localStorage.setItem('@GitCompare:repositories', JSON.stringify(updatedRepositories))

  }

  render(){
      const {
        repositories, repositoryInput, repositoryError, loading,
      } = this.state;
      return(
        <Container>
          <img src={logo} alt="logo" />

          <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
            <input
              type="text"
              placeholder="usuário/repositório"
              value={repositoryInput}
              onChange={(e) => this.setState({repositoryInput: e.target.value})}
            />
            <button type="submit">{ loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK' }</button>
          </Form>

          <CompareList
            repositories={repositories}
            removeRepository={this.handleRemoveRepository}
            updateRepository={this.handleUpdateRepository}
            loading={loading} />
        </Container>
    )
  }
}

export default Main
