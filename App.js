import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { Camera } from 'expo-camera';
import CameraSimples from './src/components/CameraSimples';
import { FontAwesome } from "@expo/vector-icons";

export default function App() {
    // permissão da camera
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    // opção para tirar foto
    const [takePhoto, setTakePhoto] = useState(false);

    // ao abrir a tela, solicita permissão de acesso a camera
    useEffect(() => {
        async function getCameraStatus() {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status == 'granted');
        }
        getCameraStatus();
    }, []);

    // se não tiver permissão, exibe mensagem
    if (hasCameraPermission === null) {
        return (
            <View style={styles.information}>
                <Text>Aguardando permissão de câmera</Text>
            </View>
        );
        // se a permissão for negada, exibe mensagem
    } else if (hasCameraPermission === false) {
        return (
            <View style={styles.information}>
                <Text>Sem acesso a câmera</Text>
            </View>
        );
        // se der certo, exibe a tela da câmera
    } else {
        return (
            <SafeAreaView style={styles.container}>
                {!takePhoto ?
                    <TouchableOpacity
                        style={styles.takePhoto}
                        onPress={() => setTakePhoto(true)}>
                        <Text style={styles.takePhoto}>Tirar foto</Text>
                    </TouchableOpacity> :
                    <>
                        <CameraSimples/>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setTakePhoto(false)}>
                            <FontAwesome name="chevron-left" size={50} color="#fff" />
                        </TouchableOpacity>
                    </>}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    information: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    closeButton: {
        alignSelf: "flex-end",
    },
    takePhoto: {
        fontSize: 20,
        alignSelf: "center",
        backgroundColor: "blue",
        padding: 10,
        color: "white",
        borderRadius: 20,
    }
});