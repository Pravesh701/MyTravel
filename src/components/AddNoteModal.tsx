import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native'

//Custom Imports
import showSnackbar from './Snackbar';
import color from '../constants/color';
import { addNotesApi } from '../services/api';
import CrossIcon from '../assets/svgs/CrossIcon';
import fontFamily from '../constants/fontFamily';

type Props = {
    showAddNoteModal: boolean;
    setShowAddNoteModal: Function;
}

const AddNoteModal = ({ showAddNoteModal = false, setShowAddNoteModal = (flag: boolean) => { } }: Props) => {

    const [noteValue, setNoteValue] = useState<string>("");

    const addNotes = async () => {
        try {
            if (noteValue.trim() === "" || noteValue.length <= 20) {
                showSnackbar("Note should be grater than 20 characters.")
            } else {
                const { message = "" }: any = await addNotesApi();
                setShowAddNoteModal(false);
                showSnackbar(message);
                setNoteValue("");
            }
        } catch (error) {
            console.log('Not able to add notes.');
        }
    }

    return (
        <Modal
            transparent
            visible={showAddNoteModal}
            onRequestClose={() => setShowAddNoteModal(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.innerContainer}>
                    <TouchableOpacity onPress={() => setShowAddNoteModal(false)} style={styles.closeCalendar}>
                        <CrossIcon
                            width={"20"}
                            height={"20"}
                        />
                    </TouchableOpacity>
                    <Text style={styles.addNoteText}>Add Notes</Text>
                    <TextInput
                        value={noteValue}
                        onChangeText={(val) => setNoteValue(val)}
                        style={styles.textContainer}
                        multiline={true}
                    />
                    <TouchableOpacity style={styles.addNoteContainer} activeOpacity={0.8} onPress={addNotes}>
                        <Text style={styles.textStyle}>{"Add Notes"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default AddNoteModal

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: color.modalBackground,
        flexDirection: "column",
        justifyContent: "flex-end",
        flex: 1,
    },
    innerContainer: {
        flexDirection: "column",
        backgroundColor: color.white,
        height: "75%",
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        padding: 16
    },
    closeCalendar: {
        alignSelf: "flex-end",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    addNoteText: {
        color: color.lightBlack,
        fontSize: 18,
        fontFamily: fontFamily.bold
    },
    textContainer: {
        color: color.mediumBlack,
        fontFamily: fontFamily.regular,
        fontSize: 16,
        height: 140,
        borderColor: color.lightBlack,
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 20
    },
    addNoteContainer: {
        height: 44,
        backgroundColor: color.primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 30
    },
    textStyle: {
        color: color.white,
        fontSize: 16,
        fontFamily: fontFamily.bold
    }
})