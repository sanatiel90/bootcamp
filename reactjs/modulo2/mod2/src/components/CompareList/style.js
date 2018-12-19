import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
`

export const Repository = styled.div`
  display: flex;
  flex-direction: column;
  background: #FFF;
  margin: 10px;
  width: 250px;
  border-radius: 3px;

  header{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;

    img{
      width: 64px;
    }

    strong{
      font-size: 24px;
      margin-top: 10px;
    }

    small{
      font-size: 14px;
      color: #666;
    }
  }

  ul{
    list-style: none;

    li{
      font-weight: bold;
      padding: 12px 20px;

      small{
        font-weight: normal;
        font-size: 12px;
        color:#999;
        font-style: italic;
      }

      &:nth-child(2n - 1){
        background: #F5F5F5;
      }
    }
    }

  }


 div.buttons-container{
  display: flex;
  justify-content: space-around;
  padding: 10px 20px;;

      button{
        width: 90px;
        border-radius: 3px;
        font-size: 12px;
        font-weight: bold;
        padding: 3px 8px;

        i{
          margin-right: 3px;
        }

        &:nth-child(2n){
          border: 1px solid #c11927;
          color: #c11927;

          &:hover{
            background: #aa1622;
            color: #fff;
          }

        }

        &:nth-child(2n - 1) {
        border: 1px solid #116088;
        color: #116088;
          &:hover {
            background: #0e5071;
            color: #fff;
          }
        }

      }


`
