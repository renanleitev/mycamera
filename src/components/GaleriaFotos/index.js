import React, {useState} from "react";
import {
    View,
    Modal,
    TouchableOpacity,
    Image,
    FlatList
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import * as Sharing from 'expo-sharing';

export default function GaleriaFotos(props) {
    // armazenando a foto registrada
    const [picture, setPicture] = useState(props.picture);
    // compartilhar a foto
    function sharePicture() {
        Sharing.shareAsync(picture);
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.open}>
            <View style={styles.contentModal}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => props.setOpen(false)}>
                    <FontAwesome name="close" size={50} color="#fff" />
                </TouchableOpacity>
                <Image
                    style={styles.imgPicture}
                    source={{ uri: picture }} />
                <TouchableOpacity
                    style={styles.shareButton}
                    onPress={sharePicture}>
                    <FontAwesome name="share" size={23} color="white" />
                </TouchableOpacity>
                <FlatList
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    style={styles.listPictures}
                    data={[...props.pictureList].reverse()}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                            onPress={() => setPicture(item.picture)}>
                                <Image source={{ uri: item.picture }}
                                    style={styles.listPicturesItem}
                                    key={item.id} />
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item) => item.id} />
            </View>
        </Modal>
    )
}