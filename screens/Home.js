import React from "react";
import { View, Text, Button } from "react-native";


const Home = (props) => {
    return (
        <View>
            <Text> hello</Text>
            <Button title='play' onPress={() => props.navigation.navigate('Quiz')}></Button>
        </View>
    )
}

export default Home
