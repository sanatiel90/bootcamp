import React from 'react'
import { Container, Repository } from './style'
import PropTypes from 'prop-types'

//recebendo repositories q foram enviados via props dentro dos param do componente;
//para nao ter q usar this.props.repositories, foi usada desestruturacao, como se fosse a construcao
//const { repositories } = this.props
const CompareList = ({ repositories, removeRepository, updateRepository, loading }) => (
  <Container>
    { repositories.map((repo) => (
        <Repository key={repo.id}>
        <header>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <strong>{repo.name}</strong>
          <small>{repo.owner.login}</small>
        </header>

        <ul>
          <li>{repo.stargazers_count} <small>stars</small></li>
          <li>{repo.forks_count} <small>forks</small></li>
          <li>{repo.open_issues_count} <small>issues</small></li>
          <li>{repo.lastCommit} <small>last commit</small></li>
        </ul>
        <div className="buttons-container">
          <button type="button" onClick={() => updateRepository(repo.id) }  className="action-update">
            { loading ? <i className="fa fa-spinner fa-pulse" /> : <span><i className="fa fa-retweet"/> Atualizar </span> }
          </button>

          <button type="button" onClick={() => removeRepository(repo.id) }  className="action-delete">
            <i className="fa fa-trash"/>
            Excluir
          </button>
        </div>
      </Repository>
    ))}

  </Container>
)
//definindo PropTypes: informando a tipagem das propriedades (nesse caso terá apenas a repositories)
//q o comp CompareList vai receber
CompareList.propTypes = {
  //repositories é um array of objetos(shape); cada uma das prop internas será tipada
  repositories : PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    owner: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
    }),
    stargazers_count: PropTypes.number,
    forks_count: PropTypes.number,
    open_issues_count: PropTypes.number,
    pushed_at: PropTypes.string
  })).isRequired,
  updateRepository: PropTypes.func.isRequired,
  removeRepository: PropTypes.func.isRequired,
}

export default CompareList
