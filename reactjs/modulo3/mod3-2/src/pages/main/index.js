import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//importando actions
import { Creators as FavoriteActions } from '../../store/ducks/favorites'

class Main extends Component {
    state = {
        repositoryInput: '',
    }

    static propTypes = {
        addFavoriteRequest: PropTypes.func.isRequired,
        favorites: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
            error: PropTypes.oneOfType([null, PropTypes.string]),
            data: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                desc: PropTypes.string,
                url: PropTypes.string
            })).isRequired
        }).isRequired
    }
    


    handleAddRepository = (event) => {
        event.preventDefault()
        //chama a action addFavoriteRequest 
        this.props.addFavoriteRequest(this.state.repositoryInput)
        this.setState({
            repositoryInput: '',
        })
    }

    render(){
        return (
            <Fragment>
                <form onSubmit={this.handleAddRepository}>
                    <input placeholder="usuário/repositório"
                           value={this.state.repositoryInput}
                           onChange={e => { this.setState({ repositoryInput: e.target.value }) }}  />
                    
                    <button type="submit">Adicionar</button>
                    { this.props.favorites.loading && <span>Carregando ...</span> }
                    { !! this.props.favorites.error && <span style={{ color: '#f00' }} >{ this.props.favorites.error }</span> }
                </form>

                <ul>
                    {this.props.favorites.data.map(fav => (
                        <li key={fav.id}>
                            <p>
                                <strong>{fav.name}</strong>
                                {fav.desc} 
                            </p>
                            <a href={fav.url}>Acessar Github</a>
                        </li> 
                    ))}
                </ul>
            </Fragment>
        )
    }

}



//mapeando o reducer favorites para as props desse comp
const mapStateToProps = state => ({
    favorites: state.favorites
})

//mapeando actions de favorites; usando bindActionCreators para passar dispatch para cada action
const mapDispatchToProps = dispatch => bindActionCreators(FavoriteActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)