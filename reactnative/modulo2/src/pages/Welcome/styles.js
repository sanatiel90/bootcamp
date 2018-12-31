import { StyleSheet } from 'react-native'
import { colors, metrics } from '~/styles'

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        flex: 1,
        padding: metrics.basePadding * 2,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    title: {
        color: colors.white,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',
        marginTop: metrics.baseMargin,
        color: colors.light,
        fontSize: 16,
        lineHeight: 21,
    },
    error: {
        textAlign: 'center',
        color: colors.danger,
        marginTop: metrics.baseMargin,
    },
    form: {
        marginTop: metrics.baseMargin * 2,
    },
    input: {
       
        borderRadius: metrics.baseRadius,
        backgroundColor: colors.white,
        height: 44,
        paddingHorizontal: metrics.basePadding,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: metrics.baseRadius,
        height: 44,
        marginTop: metrics.baseMargin,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    }

})

export default styles

//alignItens: 'strech': faz com q todos os elementos ocupem todo o espaço disponivel na tela
