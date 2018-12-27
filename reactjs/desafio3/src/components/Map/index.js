import React, { Component, Fragment } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import LateralBar from './../LateralBar'
import Modal from 'react-responsive-modal'
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-toastify/dist/ReactToastify.css';
import { connect }  from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as UserActions } from './../../store/ducks/users'
import { ToastContainer, toast } from 'react-toastify';



class Map extends Component {
    state = {
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
            latitude: -3.778648,      //-3.778648,       ///-3.78468560 
            longitude: -38.566428,      //-38.566428,     //-38.5742811
            zoom: 15 
        },
        open: false,
        data: 
            { userInput: '', latitude: '', longitude: '' },
        

    }

    onOpenModal = (e) => {
        const [latitude, longitude] = e.lngLat
        //setando  coordenadas no estado
        this.setState({
            open: true,
            data: {
                userInput:'',
                latitude,
                longitude 
            }
         })
    }

    onCloseModal = () => {
        this.setState({ open: false }) 
    }

    componentDidMount(){
        window.addEventListener("resize", this._resize)
        this._resize()
        this._locateUser()
    }

    _locateUser(){
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    zoom: 15
                }
            })
        })
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this._resize)
    }

    _resize = () => {
        this.setState({
            viewport: {
                ...this.state.viewport,
                width: window.innerWidth,
                height: window.innerHeight,
            }
        })
    }

    handleAddUser = (e) => {
        const { users, addUserRequest } = this.props
        e.preventDefault()
        
        addUserRequest(this.state.data)
        this.setState({
            data: {
                userInput: '',
                latitude: '',
                longitude: '', 
            }
         })
         !users.error ? this.toastSuccess() : this.toastError(users.error)
         this.onCloseModal()
    }

    handleDeleteUser = (id) => {
        const { users, deleteUserRequest } = this.props
        deleteUserRequest(id)
        if (users.error) this.toastError(users.error)
    }

    toastSuccess = () => {
        toast.success('Usuário Adicionado!', {
            position: toast.POSITION.TOP_CENTER
        })
    }

    toastError = (msg) => {
        toast.error(msg , {
            position: toast.POSITION.TOP_CENTER
        })
    }

    
    render(){
        const {  open, data } = this.state
        return(
           <Fragment>         
                <ReactMapGL
                    { ...this.state.viewport }
                    onClick={ this.onOpenModal }
                    mapStyle="mapbox://styles/mapbox/basic-v9"
                    onViewportChange={(viewport) => this.setState({viewport})}
                    mapboxApiAccessToken={'pk.eyJ1Ijoic2FuYXRpZWw5MCIsImEiOiJjanEwd2Q0eWgwY3R2NDlxbjFuZGMwNnEzIn0.sP7PvKKuUyIApDMY4OCdxw'}>
                    
                    <LateralBar 
                        users={this.props.users.data} 
                        deleteUser={this.handleDeleteUser} />
                    
                    {   this.props.users.data.map(user => (
                            <Marker key={user.id} latitude={user.longitude} longitude={user.latitude}  onClick={this.onOpenModal} captureClick={true} >
                                    <div>
                                        <img style={{
                                            borderRadius: 100,
                                            width: 48,
                                            height: 48
                                        }} src={user.avatar} alt={user.name} />
                                    
                                    </div>
                            </Marker>
                        ))
                    }
                    
                    <Modal open={open} onClose={this.onCloseModal} center >
                        <form style={{ padding: 50 }} onSubmit={this.handleAddUser}>
                            <strong>Adicionar novo usuário</strong>
                            <br/>
                            <input type="text" placeholder="Usuário no Github" value={data.userInput}  
                            onChange={e => { this.setState({ data: { userInput: e.target.value, latitude: data.latitude, longitude: data.longitude } } )}} />
                            <button onClick={this.onCloseModal}> Cancelar </button>
                            <button type="submit" > Adicionar </button>
                        </form>
                    </Modal>
                   
                </ReactMapGL>
                <ToastContainer autoClose={3000} />
            </Fragment>
        )
    }
}


const mapStateToProps = state => ({
    users: state.users
})

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Map)
 
