import React from 'react'

//stateless component
//msm sendo stateless, continua tendo acesso a props
//usando props para acessar conteundo dentro da tag comp 
const Link = (props) =>{
    return <a href="#">{props.children}</a>
}

export default Link
 