import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import ErrorBoundary from './src/screens/ErrorBoundary'
import NetworkIndicator from './src/components/NetworkIndicator'

type Props = {}

const App = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ErrorBoundary>
        <Text>App</Text>
          <NetworkIndicator />
      </ErrorBoundary>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})