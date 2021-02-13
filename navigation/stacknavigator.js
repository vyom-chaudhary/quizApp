import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from "../screens/Home";
import Question from "../screens/Question";
import Result from '../screens/Result'

const stack = createStackNavigator();

const StackNavigator = () => {

    return (
        <NavigationContainer>
            <stack.Navigator >
                <stack.Screen name="Home" component={Home} />
                <stack.Screen name="Quiz" component={Question} />
                <stack.Screen name="result" component={Result} />
            </stack.Navigator>
        </NavigationContainer>
    )
}
export default StackNavigator



