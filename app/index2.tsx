import React, { useState } from "react";
import { Button, Text, View } from "react-native";

const CounterApp = () => {
  // 2. 宣告 count 狀態，預設值為 0
  const [count, setCount] = useState(0);
  return (
    <View>
      <Text>目前的點擊次數：{count}</Text>
      {/* 3. 按鈕點擊後呼叫 setCount，將舊的值加 1 */}
      <Button title="點我加 1" onPress={() => setCount(count + 1)} />
      {/* 4. 另一個重置按鈕 */}
      <Button title="歸零" onPress={() => setCount(0)} color="red" /> 
    </View>
  );
};
export default CounterApp;
