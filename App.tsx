import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from "react-redux";

//Custom Imports
import store from './src/store';
import Main from "./src/navigation/Main";
import ErrorBoundary from './src/screens/ErrorBoundary/index';

type Props = {}

const App = (props: Props) => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <ErrorBoundary>
          <StatusBar backgroundColor="white" />
          <Main />
        </ErrorBoundary>
      </Provider>
    </React.Fragment>
  )
}

export default App;