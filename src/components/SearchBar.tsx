import React, { forwardRef } from "react";
import { TouchableOpacity, View, TextInput, StyleSheet, Image } from "react-native";

//Custom Imports
import color from "../constants/color";
import fontFamily from "../constants/fontFamily";
import CrossIcon from "../assets/svgs/CrossIcon";
import SearchIcon from "../assets/svgs/SearchIcon";

interface Props {
    customStyles?: Object;
    placeholder?: string;
    query: string;
    handleQueryChange: Function;
    shouldShowIcon?: boolean;
    autoFocus?: boolean;
    onPressRightIcon?: () => void;
    clearSearch?: boolean;
    disabled?: boolean
}
type Ref = TextInput;

const SearchBar = forwardRef<Ref, Props>(({
    customStyles = {},
    placeholder = "",
    query = "",
    handleQueryChange = () => { },
    shouldShowIcon = false,
    autoFocus = false,
    onPressRightIcon = () => { },
    clearSearch = false,
    disabled = true,
}, ref) => {
    return (
        <View
            style={[
                {
                    flexDirection: "row",
                    alignItems: "center",
                },
                customStyles,
            ]}
        >
            <View style={styles.searchBar}>
                {shouldShowIcon && (
                    <TouchableOpacity
                        onPress={onPressRightIcon}
                        style={styles.searchIconContainer}
                    >
                        {/* <SearchIcon /> */}
                        <Image resizeMode={"contain"} style={styles.locationIcon} source={{ uri: "https://img.icons8.com/ios/50/null/marker--v2.png" }} />
                    </TouchableOpacity>
                )}
                <TextInput
                    placeholderTextColor="rgba(0, 0, 0, 0.36)"
                    placeholder={placeholder}
                    style={styles.searchInput}
                    value={query}
                    onChangeText={(value) => handleQueryChange(value)}
                    autoFocus={autoFocus}
                    clearButtonMode="always"
                    ref={ref}
                    editable={disabled}
                />

                {shouldShowIcon && query.length > 0 && clearSearch && (
                    <TouchableOpacity
                        onPress={onPressRightIcon}
                        style={[styles.searchIconContainer, { opacity: 0.86, padding: 25 }]}
                    >
                        <CrossIcon height={11} width={11} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
})

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        paddingHorizontal: 16
    },
    searchBar: {
        height: 44,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.4)",
        borderRadius: 10,
        alignItems: "center",
        flex: 1,
        backgroundColor: "white",
    },
    searchInput: {
        marginLeft: 8,
        fontSize: 16,
        lineHeight: 24,
        color: color.mediumBlack,
        flex: 1,
        fontFamily: fontFamily.regular
    },
    searchIconContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        marginLeft: 10,
        width: 18,
    },
    locationIcon: {
        width: 24,
        height: 24
    }
})
