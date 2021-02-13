import React, { useState } from "react";
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from 'expo-permissions'

const Home = (props) => {
    const [imagePicker, setImagePicker] = useState()
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA);

        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };
    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        // if (!hasPermission) {
        //     return;
        // }
        const image = await ImagePicker.launchCameraAsync();
        console.log(image)
        setImagePicker(image.uri)
    };
    return (
        <View>
            <Text> hello</Text>
            <View>

                <View style={styles.imagePicker}>
                    <View style={styles.imagePreview}>
                        {
                            imagePicker ? <Image source={{ uri: imagePicker }} style={styles.image} /> : <Text>No image picked yet.</Text>
                        }


                    </View>
                    <Button
                        title="Take Image"
                        color='#fc9208'
                        onPress={takeImageHandler}
                    />
                </View>
            </View>
            <Button title='play' onPress={() => props.navigation.navigate('Quiz', { type: 'new' })}></Button>
        </View>
    )
}
const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
    },
    imagePreview: {
        width: '100%',
        height: 500,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
});
export default Home
