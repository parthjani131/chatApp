import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import * as Device from "expo-device";

export default function App() {
  const [deviceType, setDeviceType] = useState(Device.DeviceType.PHONE);
  const [inputText, setInputText] = useState<String | null>();
  const [msgContent, setMsgContent] = useState([]);
  const [updateContent, setUpdateContent] = useState(false);

  useEffect(async () => {
    const type = await Device.getDeviceTypeAsync();

    setDeviceType(type);
  }, []);

  useEffect(() => {
    if (updateContent) {
      setTimeout(() => {
        setMsgContent([
          ...msgContent,
          {
            msg: "Message Received",
            isSender: false,
            timeStamp: new Date().getTime(),
          },
        ]);
        setInputText(null);
        setUpdateContent(false);
      }, 1000);
    }
  }, [updateContent]);

  const setContent = () => {
    setMsgContent([
      ...msgContent,
      { msg: inputText, isSender: true, timeStamp: new Date().getTime() },
    ]);
    setUpdateContent(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-grey">
      <View className="flex-1 items-center justify-center bg-grey mt-10">
        <View className="flex-1 w-full bg-grey">
          <FlatList
            data={msgContent}
            renderItem={({ item, index }) => {
              const date = new Date(item.timeStamp);
              return (
                <View
                  className={`flex-row items-center mx-8 ${
                    item.isSender ? "bg-white" : ""
                  } p-2 rounded-xl`}
                >
                  <View className={`flex-1 flex-row items-center`}>
                    <View
                      className={`h-10 w-10 ${
                        item.isSender ? "bg-blue" : "bg-orange"
                      } rounded-full mr-4`}
                    />
                    <Text>{item.msg}</Text>
                  </View>
                  {deviceType !== Device.DeviceType.PHONE && (
                    <Text>{`${date.getHours()}:${date.getMinutes()}`}</Text>
                  )}
                </View>
              );
            }}
          />
        </View>
        <View className="flex-row bg-grey border-2 border-lightGrey rounded-xl align-center mx-6 mt-4 mb-4">
          <TextInput
            className="flex-1 h-12 mx-2"
            value={inputText}
            onChangeText={(text) => setInputText(text)}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setContent();
              // setTimeout(setReceiveMsg, 1000);
            }}
            className="justify-center align-center mr-2"
          >
            <Image source={require("./assets/send.png")} className="h-8 w-8" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
