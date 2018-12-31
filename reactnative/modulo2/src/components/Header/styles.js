import { StyleSheet } from 'react-native';
//lib para pegar o tamanho da status bar do cel
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { colors, metrics } from '~/styles'

const styles = StyleSheet.create({
  container:{
    height: 50 + getStatusBarHeight(),
    paddingTop: getStatusBarHeight(),
    paddingHorizontal: metrics.basePadding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.light

  },
  title:{
    color: colors.darker,
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
      color: colors.darker
  },
  left: {
    
  }

});

export default styles;
