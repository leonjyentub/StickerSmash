import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function Index() {
  const [name, setName] = useState("");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>請輸入你的姓名：</Text>
      {/* 3. 綁定輸入框 */}
      <TextInput
        placeholder="在此輸入..."
        onChangeText={(newText) => setName(newText)} // 當文字改變時，更新 state
        value={name} // 讓輸入框顯示 state 的內容
      />
      {/* 4. 即時顯示狀態內容 */}
      <Text>你輸入的是：{name}</Text>
    </View>
  );
}
