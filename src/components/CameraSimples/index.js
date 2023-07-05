import React, {useState, useRef} from "react";
import { View, 
    TouchableOpacity, 
    Dimensions, 
    Platform, } from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import GaleriaFotos from "../GaleriaFotos";

export default function CameraSimples() {
    // referenciando a foto registrada
    const [camera, setCamera] = useState(null);
    // referenciando a foto registrada
    const camRef = useRef(null);
    // armazenando a foto registrada
    const [picture, setPicture] = useState(null);
    // galeria de fotos
    const [pictureList, setPictureList] = useState([]);
    // abrir e fechar o modal em GaleriaFotos
    const [open, setOpen] = useState(false);
    // definindo o tipo padrão da câmera (traseira)
    const [type, setType] = useState(Camera.Constants.Type.back);
    // proporção da tela e padding da imagem
    const [imagePadding, setImagePadding] = useState(0);
    // padrão é 4:3
    const [ratio, setRatio] = useState('4:3');  
    const { height, width } = Dimensions.get('window');
    const screenRatio = height / width;
    const [isRatioSet, setIsRatioSet] =  useState(false);
    // determina a proporção da camera e o padding
    // preferencia por modo retrato
    const prepareRatio = async () => {
        // padrão 4:3
        let desiredRatio = '4:3';  
        // esse problema afeta apenas o android
        if (Platform.OS === 'android') {
            const ratios = await camera.getSupportedRatiosAsync();
            // calcula a largura e a altura de cada proporção de camera
            // a largura e a altura são calculados em modo paisagem
            // encontra a proporção mais próxima da proporção do celular
            let distances = {};
            let realRatios = {};
            let minDistance = null;
            for (const ratio of ratios) {
                const parts = ratio.split(':');
                const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
                realRatios[ratio] = realRatio;
                // proporção não pode ser maior que a tela
                const distance = screenRatio - realRatio; 
                distances[ratio] = realRatio;
                if (minDistance == null) {
                    minDistance = ratio;
                } else {
                    if (distance >= 0 && distance < distances[minDistance]) {
                        minDistance = ratio;
                    }
                }
            }
            // define a melhor proporção
            desiredRatio = minDistance;
            // calcula a diferença entre a largura e a altura da proporção de camera 
            const remainder = Math.floor(
                (height - realRatios[desiredRatio] * width) / 2
            );
            // define o padding da imagem e a proporção desejada
            setImagePadding(remainder);
            setRatio(desiredRatio);
            // só calcula uma vez a proporção de tela
            setIsRatioSet(true);
        }
    };

    // a camera deve ser carregada para calcular a proporção da tela
    const setCameraReady = async() => {
        if (!isRatioSet) {
            await prepareRatio();
        }
    };

    // função de trocar a camera (frontal para traseira)
    function changeCamera() {
        setType(
        type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
    }

    // ao capturar a foto, armazena no estado
    async function takePicture() {
        if(camRef){
            const data = await camRef.current.takePictureAsync();
            setPicture(data.uri);
            setOpen(true);
            setPictureList((arr) => [...arr, {id: new Date().getTime(), picture: data.uri}]);
        }
    }

    return (
        <>
        <Camera
            style={[styles.cameraPreview, 
            {marginTop: imagePadding, 
            marginBottom: imagePadding}]}
            onCameraReady={setCameraReady}
            type={type}
            ratio={ratio}
            ref={(ref) => {
                camRef.current = ref;
                setCamera(ref);
            }}>
            <View style={styles.contentButtons}>
            {!open && <>
                <TouchableOpacity
                style={[styles.buttonFlip, styles.button]}
                onPress={changeCamera}>
                    <FontAwesome name="exchange" size={23} color="red"/>
                </TouchableOpacity>
                <TouchableOpacity 
                style={[styles.buttonCamera, styles.button]} 
                onPress={takePicture}>
                    <FontAwesome name="camera" size={23} color="white"/>
                </TouchableOpacity>
            </>}
            </View>
        </Camera>
        {picture && (
            <GaleriaFotos 
            open={open} 
            setOpen={setOpen} 
            picture={picture}
            pictureList={pictureList}
            />
        )}
        </>
    );
}