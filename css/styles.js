import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  inlineWrapper: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  inputGroup: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  inputTitle: {

  },
  inputField: {
    height: 40
  },
  entries: {
    flex: 1,
    alignSelf: 'stretch',
  },
  entry: {
    padding: 5,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  footerBar: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    backgroundColor: '#fbfbfb',
    paddingVertical: 10,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});