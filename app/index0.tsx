import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, // 讓容器撐滿整個手機螢幕
    // backgroundColor: '#F7F7F7',
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50, // 留一點上下邊距觀察效果,
  },
  box: {
    width: 200, // 固定寬度，方便觀察比例變化
    margin: 10, // 間距
    justifyContent: "center", // 讓文字在色塊內垂直置中
    alignItems: "center", // 讓文字在色塊內水平置中
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

const FlexExample = () => {
  // 父容器：佔滿全螢幕，並讓子元件在垂直主軸上置中
  return (
    <View style={styles.container}>
      <View style={[styles.box, { backgroundColor: "#FF6B6B", flex: 1 }]}>
        <Text style={styles.text}>Flex: 1</Text>
      </View>
      <View style={[styles.box, { backgroundColor: "#4ECDC4", flex: 2 }]}>
        <Text style={styles.text}>Flex: 2</Text>
      </View>
      <View style={[styles.box, { backgroundColor: "#45B7D1", flex: 3 }]}>
        <Text style={styles.text}>Flex: 3</Text>
      </View>
    </View>
  );
};
export default FlexExample;
