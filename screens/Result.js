import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator } from 'react-native-paper';

const Result = (props) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    props.navigation.setOptions({
        headerLeft: null,
    })
    const getData = () => {
        setLoading(true)
        fetch(`http://192.168.1.23:3001/api/GetQuizResultByMember?video_id=5ff6a028ee0fece6763c6360&member_id=5fdc85dbcbe1c79c373a3663`).
            then(response => response.json()).
            then(response => response.result).
            then(result => {

                setData(result)

            })
            .catch(error => {
                console.log(error)
            }).finally(() =>
                setLoading(false)
            )
    }
    const renderResultItem = (itemData) => {
        const data = itemData.item
        return (
            <View style={{
                flex: 1,
                margin: 15,
                padding: 15,
                height: 150,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.50,
                shadowRadius: 10,
                elevation: 3,
                backgroundColor: 'white'
            }}>
                <Text style={{ fontSize: 22 }}>Test Unit No : {data.test_unit}</Text>
                <Text>Total Attempt : {data.total_attempt}</Text>
                <Text>True Answer : {data.true_answer}</Text>
                <Text>Wrong Answer : {data.wrong_answer}</Text>

            </View>
        )
    }
    useEffect(() => {
        getData()
    }, [])
    if (loading) {
        return <ActivityIndicator size="large" animating={true} color='blue' />
    }
    return (
        <View>
            <Button title="play again" onPress={() => props.navigation.navigate('Home')}></Button>
            <FlatList data={data} keyExtractor={(item => item.test_unit)} renderItem={renderResultItem}></FlatList>
        </View >
    )
}

export default Result
