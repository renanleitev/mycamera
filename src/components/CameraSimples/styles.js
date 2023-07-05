import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    cameraPreview: {
        flex: 1,
    },
    contentButtons: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
    },
    button: {
        position: "absolute",
        bottom: 50,
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        height: 50,
        width: 50,
        borderRadius: 50, 
    },
    buttonCamera: {
        right: 30,
        backgroundColor: "red",
    },
    buttonFlip: {
        left: 30,
        backgroundColor: "white",
    },
});

export default styles;