import moment from 'moment';
import React, { useState, memo } from 'react'
import { Calendar, DateData } from 'react-native-calendars'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image } from 'react-native'

//Custom Imports
import color from '../constants/color';
import CrossIcon from '../assets/svgs/CrossIcon';

type Props = {
    placeHolder: string;
    onDayPress: (date: DateData) => void;
}

const CalendarView = ({ placeHolder = "", onDayPress = () => { } }: Props) => {
    const [visible, setVisible] = useState<boolean>(false)

    const openCalendar = () => {
        setVisible(true);
    }

    const closeCalendar = () => {
        setVisible(false);
    }

    const onCalendarItemPress = (date: DateData) => {
        onDayPress(date);
        closeCalendar();
    }

    return (
        <React.Fragment>
            <TouchableOpacity activeOpacity={0.6} style={styles.buttonContainer} onPress={openCalendar}>
                <Text>{placeHolder}</Text>
                <Image resizeMode={"contain"} style={styles.calendarIcon} source={{ uri: "https://img.icons8.com/material-outlined/24/null/calendar--v1.png" }} />
            </TouchableOpacity>
            <Modal
                transparent
                visible={visible}
                onRequestClose={closeCalendar}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.innerContainer}>
                        <TouchableOpacity onPress={closeCalendar} style={styles.closeCalendar}>
                            <CrossIcon
                                width={"15"}
                                height={"15"}
                            />
                        </TouchableOpacity>
                        <Calendar
                            onDayPress={onCalendarItemPress}
                            minDate={moment().format("YYYY-MM-DD")}
                        />
                    </View>
                </View>
            </Modal>
        </React.Fragment>
    )
}

export default memo(CalendarView);

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
        paddingVertical: 16,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.001,
        shadowRadius: 4.65,
        elevation: 4,
        shadowColor: "rgba(0,0,0,0.7)",
        backgroundColor: color.white,
        borderRadius: 8,
        paddingVertical: 10,
        width: "45%"
    },
    buttonText: {

    },
    calendarIcon: {
        width: 20,
        height: 20,
        marginStart: 8
    },
    closeCalendar: {
        alignSelf: "flex-end",
        marginEnd: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    }
})