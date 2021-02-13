import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { View, Text, Button } from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


const Question = (props) => {

    const typeGet = props.route.params.type
    const [data, setData] = useState([])
    const [type, setType] = useState(typeGet)
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState(0);
    const [radio_props, setRadioProps] = useState([])
    const [answer, setAnswer] = useState('')
    // let radio_props = []


    // }
    const getData = () => {

        fetch(`http://192.168.1.23:3001/api/getSingleQuestion?video_id=5ff6a028ee0fece6763c6360&member_id=5fdc85dbcbe1c79c373a3663&type=${type}`).
            then(response => response.json()).
            then(response => response.data).
            then(result => {
                console.log('hello')
                setData(result)
                let newArray = []
                for (let i = 0; i < result[0].answer.length; i++) {
                    const obj = {
                        label: result[0].answer[i].name,
                        value: i,
                        id: result[0].answer[i]._id
                    }
                    if (i === 0) {
                        setAnswer(result[0].answer[i]._id)
                    }
                    console.log(obj, radio_props)

                    // setRadioProps([...radio_props, obj])
                    newArray.push(obj)


                    console.log("newArray", newArray)
                }
                setRadioProps(newArray)

            })
            .catch(error => {
                //reject(error);
            }).finally(() =>
                setLoading(false)
            )
    }
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

    }, [])
    // useEffect(() => { }, [data, radio_props])
    const nextQuestionHandler = useCallback(() => {
        fetch('http://192.168.1.23:3001/api/verifyVideoQuestion', {
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question_id: data[0]._id,
                answer_id: answer,
                member_id: "5fdc85dbcbe1c79c373a3663",
                video_id: "5ff6a028ee0fece6763c6360",
                type: type
            })
        }).
            then(response => response.json()).then(response => {
                if (response.total_attempt === 5) {
                    props.navigation.navigate('result', {
                        member_id: "5fdc85dbcbe1c79c373a3663",
                        video_id: "5ff6a028ee0fece6763c6360",
                    })
                } else {
                    return response
                }
            }
            ).finally(() => setType('old')
            )

        getData()


    })

    const onClickRadioButtonHandler = (value) => {
        const getPropsProperty = radio_props.find(data => data.value === value)

        setAnswer(getPropsProperty.id)
        console.log(answer)
    }

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
                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    onPress={onClickRadioButtonHandler}
                />
            </View>
            <Button title="next" onPress={nextQuestionHandler}></Button>
        </View>
    )
}

export default Question
