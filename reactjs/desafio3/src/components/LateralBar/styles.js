import styled from 'styled-components'

export const Container = styled.div`
    background: rgba(255, 255, 255, 0.945)	;
    height: 600px;
    width: 300px;
    display: flex;
    flex-direction: column;
    margin: 15px;
    border-radius: 10px;
`

export const RowUser = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    margin: 5px 5px;
    background: rgb(243, 240, 240);

    img{
        border-radius: 100px;
        width: 48px;
        height: 48px;
        margin-left: 7px;
        padding: 5px 0;
    }
    
    .info-user{
        display: flex;
        flex-direction: column;
        flex: 5;
        margin-left: 10px;
    }

    button{
        border: none;
        background: red;
        color: white;
        border-radius: 100px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
    }   

    a{
        text-decoration: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 20px;
        margin-right: 5px;
    }   

`
