import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { View, Text } from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


const Question = () => {
    const [data, setData] = useState([])
    const [type, setType] = useState('old')
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState(0);
    const [radio_props, setRadioProps] = useState([])

    // let radio_props = []
    const getData = async () => {
        return new Promise(async (resolve, reject) => {
            await fetch(`http://192.168.1.23:3001/api/getSingleQuestion?video_id=5ff6a028ee0fece6763c6360&member_id=5fdc85dbcbe1c79c373a3663&type=${type}`).
                then(response => response.json()).
                then(result => {
                    resolve(result);
                    setData(result.data)
                    for (let i = 0; i < data[0].answer.length; i++) {

                        const obj = {
                            label: data[0].answer[i].name,
                            value: i
                        }
                        console.log(obj, radio_props)

                        // setRadioProps([...radio_props, obj])
                        setRadioProps(obj)

                        console.log(radio_props)
                    }
                })
                .catch(error => {
                    reject(error);
                }).finally(() =>
                    setLoading(false)
                )
        });
    }

    // const getData = async () => {
    //     setLoading(true)
    //     const apiData = await fetch(`http://192.168.1.23:3001/api/getSingleQuestion?video_id=5ff6a028ee0fece6763c6360&member_id=5fdc85dbcbe1c79c373a3663&type=${type}`).then(response => response.json()).
    //         then(response => {
    //             setData(response.data)
    //         }).
    //         catch(error => console.log(error));
    //     console.log("apiData", apiData)
    //     return apiData

    //     // if (data.length > 0) {
    //     //     for (let i = 0; i < apiData.data[0].answer.length; i++) {
    //     //         const obj = [{
    //     //             label: apiData.data[0].answer[i].name, value: i
    //     //         }]
    //     //         setRadioProps([...radio_props, ...obj])
    //     //     }
    //     // }

    // }


    useEffect(() => {
        getData()

        // if (data.length > 0) {
        //     for (let i = 0; i < data[0].answer.length; i++) {

        //         const obj = {
        //             label: data[0].answer[i].name,
        //             value: i
        //         }

        //         radio_props.push(obj)
        //         console.log(obj, radio_props)
        //         console.log(radio_props)
        //     }
        // }
        console.log("useefect")
        return () => {
            getData()
            console.log("useefect return", getData())


        }
    }, [])

    if (loading) {
        return <ActivityIndicator size="large" animating={true} color='blue' />
    }
    return (
        <View>
            <Text> Question
            </Text>
            <Text> {data.length > 0 ? data[0].question : 0}
            </Text>
            <View>
                {console.log(radio_props)}

                {data[0].answer.map(data => {

                    const obj = [{
                        label: data.name,
                        value: data._id
                    }]
                    return (
                        <RadioForm
                            radio_props={obj}
                            // initial={0}
                            onPress={(value) => { setValue(value) }}
                        />)
                }
                )}

            </View>
        </View>
    )
}

export default Question
