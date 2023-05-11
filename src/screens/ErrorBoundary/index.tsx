import { View, StyleSheet, Text } from "react-native";
import React, { Component, ErrorInfo, ReactNode } from "react";

//Custom Imports
import color from "../../constants/color";
import fontFamily from "../../constants/fontFamily";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.sorryText}>{"Sorry.. there was an error"}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.white
  },
  sorryText: {
    color: color.mediumBlack,
    fontFamily: fontFamily.medium,
    fontSize: 16
  }
})