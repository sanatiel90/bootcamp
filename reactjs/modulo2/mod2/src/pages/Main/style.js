import styled from 'styled-components'

//styled-component: uma tag já com toda a estilizacao definida
//criando e exportando algumas tags estilizadas

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
`
export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  width: 100%;
  max-width: 400px;

  input{
    flex: 1;
    padding: 0 20px;
    border-radius: 5px;
    background: #FFF;
    height: 50px;
    font-size: 18px;
    /*o styled componentes pode receber props enviadas pelo react e acessa-las atraves de uma func com param props*/
    border: ${(props) => ( props.withError ? '2px solid #F00' : 0 )}
  }

  button{
    width: 80px;
    margin-left: 10px;
    background: #63F5b8;
    padding: 0 20px;
    height: 50px;
    border: 0;
    border-radius: 5px;
    font-size: 20px;
    font-weight: bold;
    &:hover{
      background: #52d89f;
    }
  }
`
