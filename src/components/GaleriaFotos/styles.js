import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    contentModal: {
        flex: 1,
        justifyContent: "center",
        margin: 20,
      },
    closeButton: {
        top: 10,
        left: 2,
        margin: 10,
    },
    imgPicture: {
        width: "100%",
        height: 400,
    },
    listPictures: {
        display: "flex",
        flexDirection: "row",
    },
    listPicturesItem: {
        height: 100,
        width: 120,
    },
    shareButton:{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
        margin: 20,
        height: 50,
        width: 50,
        borderRadius: 50, 
    }
});

export default styles;