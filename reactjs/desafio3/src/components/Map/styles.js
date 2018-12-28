import styled from 'styled-components'

export const Form = styled.form`
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    input{
        border-radius: 5px;
        border: solid 2px #eee;
        height: 30px;
        width: 100%;
        padding: 0 10px;
        margin-bottom: 12px;
        display: block;
    }   

    .actions{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    button{
        margin: 0 10px;
        height: 40px;
        width: 120px;
        font-weight: bold;
        border-radius: 5px;
        border: none;
        color: rgba(255, 255, 255, 0.993);

        &:nth-child(2n){
            background: rgba(99, 214, 115, 0.993);
        }

        &:nth-child(2n -1){
            background: rgba(111, 119, 112, 0.993);
        }
    }

`