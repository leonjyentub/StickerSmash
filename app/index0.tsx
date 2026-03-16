import React from "react";
import { Image, Text, View } from "react-native";

const StudentInfo = ({ stdname, id }) => {
  return (
    <View>
      <Text>姓名：{stdname}</Text>
      <Text>學號：{id}</Text>
      <Text>---</Text>
    </View>
  );
};

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>【班級名單】</Text>
      <StudentInfo stdname="張小明" id="A001" />
      <StudentInfo stdname="李大華" id="A002" />
      <StudentInfo stdname="王美玲" id="A003" />
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1773061865077-12120d59a217?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={{ width: "100%", height: "40%" }}
        resizeMode="contain"
      />
    </View>
  );
}
