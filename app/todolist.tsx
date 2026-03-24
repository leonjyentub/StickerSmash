// ========================================
// 📱 React Native 教學範例：任務清單 App
// 涵蓋：useState / FlatList / Switch / Pressable / Alert / Modal
// ========================================

import { useState } from "react";
import {
    Alert,
    FlatList,
    ListRenderItem,
    Modal,
    Pressable,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// ── 型別定義 ──────────────────────────────
interface Task {
  id: string;
  title: string;
  done: boolean;
}

// ── 初始資料 ──────────────────────────────
const INITIAL_TASKS: Task[] = [
  { id: "1", title: "閱讀 React Native 文件", done: false },
  { id: "2", title: "練習 useState 用法", done: true },
  { id: "3", title: "完成今天的作業", done: false },
];

// ========================================
export default function App() {
  // ── 1. useState：管理各種狀態 ────────────
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS); // 任務陣列
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Modal 開關
  const [inputText, setInputText] = useState<string>(""); // 輸入框文字

  // ── 2. Switch 切換完成狀態 ───────────────
  const toggleTask = (id: string): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  // ── 3. Alert 確認刪除 ────────────────────
  const deleteTask = (id: string, title: string): void => {
    Alert.alert(
      "刪除任務", // 標題
      `確定要刪除「${title}」嗎？`, // 訊息
      [
        { text: "取消", style: "cancel" },
        {
          text: "刪除",
          style: "destructive",
          onPress: () =>
            setTasks((prev) => prev.filter((task) => task.id !== id)),
        },
      ],
    );
  };

  // ── 4. 新增任務（Modal 內確認用）──────────
  const addTask = (): void => {
    if (!inputText.trim()) {
      Alert.alert("提示", "請輸入任務名稱！");
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      title: inputText.trim(),
      done: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setInputText("");
    setModalVisible(false);
  };

  // ── 5. FlatList renderItem ────────────────
  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <View style={styles.taskRow}>
      {/* 任務名稱 */}
      <Text style={[styles.taskTitle, item.done && styles.taskDone]}>
        {item.title}
      </Text>

      {/* Switch：切換完成 / 未完成 */}
      <Switch
        value={item.done}
        onValueChange={() => toggleTask(item.id)}
        trackColor={{ false: "#ddd", true: "#4CAF50" }}
        thumbColor={item.done ? "#fff" : "#fff"} // 同色，讓 Switch 看起來更簡潔
      />

      {/* Pressable：刪除按鈕（按下有視覺反饋） */}
      <Pressable
        onPress={() => deleteTask(item.id, item.title)}
        style={({ pressed }) => [
          styles.deleteBtn,
          pressed && styles.deleteBtnPressed, // pressed 狀態改變樣式
        ]}
      >
        <Text style={styles.deleteBtnText}>✕</Text>
      </Pressable>
    </View>
  );

  // ========================================
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

        {/* 標題列 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📋 我的任務</Text>
          <Text style={styles.headerSub}>
            完成 {tasks.filter((t) => t.done).length} / {tasks.length}
          </Text>
        </View>

        {/* ── FlatList：渲染任務列表 ── */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>還沒有任務，快新增一個吧！</Text>
          }
        />

        {/* ── Pressable：開啟 Modal 的新增按鈕 ── */}
        <Pressable
          style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.fabText}>＋</Text>
        </Pressable>

        {/* ── Modal：新增任務彈窗 ── */}
        <Modal
          visible={modalVisible}
          animationType="slide" // 動畫：slide / fade / none
          transparent={true} // 背景透明
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>新增任務</Text>

              <TextInput
                style={styles.input}
                placeholder="輸入任務名稱..."
                value={inputText}
                onChangeText={setInputText}
                autoFocus
              />

              {/* Modal 內的按鈕列 */}
              <View style={styles.modalBtns}>
                {/* 取消 */}
                <Pressable
                  style={[styles.modalBtn, styles.cancelBtn]}
                  onPress={() => {
                    setInputText("");
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.cancelBtnText}>取消</Text>
                </Pressable>

                {/* 確認新增 */}
                <Pressable
                  style={[styles.modalBtn, styles.confirmBtn]}
                  onPress={addTask}
                >
                  <Text style={styles.confirmBtnText}>新增</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// ========================================
// 樣式
// ========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },

  // 標題
  header: {
    backgroundColor: "#1a1a2e",
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSub: {
    fontSize: 14,
    color: "#aab4c8",
    marginTop: 4,
  },

  // FlatList 容器
  list: {
    padding: 16,
    gap: 12,
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 40,
    fontSize: 16,
  },

  // 任務列
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  taskDone: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },

  // 刪除按鈕（Pressable）
  deleteBtn: {
    marginLeft: 10,
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtnPressed: {
    backgroundColor: "#fca5a5", // 按下時加深
    transform: [{ scale: 0.92 }],
  },
  deleteBtnText: {
    color: "#ef4444",
    fontWeight: "bold",
  },

  // 浮動新增按鈕（FAB）
  fab: {
    position: "absolute",
    right: 24,
    bottom: 32,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1a1a2e",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6, // Android 陰影
  },
  fabPressed: {
    backgroundColor: "#16213e",
    transform: [{ scale: 0.93 }],
  },
  fabText: {
    color: "#fff",
    fontSize: 28,
    lineHeight: 32,
  },

  // Modal 背景遮罩
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#dde3ee",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },

  // Modal 按鈕列
  modalBtns: {
    flexDirection: "row",
    gap: 12,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#f0f4f8",
  },
  cancelBtnText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmBtn: {
    backgroundColor: "#1a1a2e",
  },
  confirmBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
