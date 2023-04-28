import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from "react-redux";

//Custom Imports
import Main from "./src/index";
import store from './src/store';
import ErrorBoundary from './src/screens/errorBoundary'

type Props = {}

const App = (props: Props) => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <ErrorBoundary> 
          <Main />
          <StatusBar />
        </ErrorBoundary>
      </Provider>
    </React.Fragment>
  )
}

export default App;