////arq q contem as medidas como maring,padding e width/height a serem usadas no app
import { Dimensions } from 'react-native'

//com Dimensions.get('window'), é possivel pegar a largura e altura do celular
const { width, height } = Dimensions.get('window')

//exportando medidas padrao
export default {
    baseMargin: 10,
    basePadding: 20,
    baseRadius: 3,
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width
}

//screenWidth: width < height ? width : height
//saber largura do cel: se largura for menor q a altura, então a largura do cel será a propria largura, do contrário será a altura
//com isso é possivel saber se o cel está no modo portrait ou landscape e setar a screenWidth e screenHeight corretas 
//de acordo com a posicao q o cel estiver 