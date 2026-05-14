import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    width: '100%',
    alignSelf: 'stretch',
  },
  header: {
    backgroundColor: '#b00000',
    flexDirection: 'row',      
    alignItems: 'center',       
    justifyContent: 'flex-start', 
    paddingHorizontal: 12,
    paddingVertical: 25,
    marginHorizontal: 0,
    height: 80,
    width: '100%',
    alignSelf: 'stretch',
    position: 'relative',
    left: 0,
    right: 0,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 32,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  headerLogo: {
    width: 120,
    height: 120,
    marginTop: 12,
    marginRight: 12,     
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    marginVertical: 30,
    color: '#005C6D',
    fontFamily: 'Roboto_700Bold',

  },
  label: {
    fontSize: 16,
    alignSelf: 'flex-start',
    fontFamily: 'Roboto_400Regular',
    marginBottom: 16,
  },
  link: {
    marginTop: 20,
    color: '#0000EE',
    textDecorationLine: 'underline',
  },
});
