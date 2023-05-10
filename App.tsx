import React from 'react'
import { Provider } from "react-redux";
import { StatusBar, LogBox } from 'react-native'

//Custom Imports
import store from './src/store';
import Main from "./src/navigation/Main";
import ErrorBoundary from './src/screens/ErrorBoundary/index';

LogBox.ignoreAllLogs();

type Props = {}

const App = (props: Props) => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <StatusBar backgroundColor="white" />
        <Main />
      </ErrorBoundary>
    </Provider>
  )
}

export default App;