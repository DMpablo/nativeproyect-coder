import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { AddTask, CustomModal } from "./components/index";

const paletColors = {
  colorOne: "#EE6C4D",
  colorTwo: "#E0FBFC",
  colorTree: "#98C1D9",
  colorFor: "#3D5A80",
  colorFive: "#293241",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: paletColors.colorTwo,
  },

  container_item: {
    backgroundColor: paletColors.colorTwo,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: paletColors.colorTwo,
    flex: 1,
    flexDirection: "row",
    alignitems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  title: {
    color: paletColors.colorFive,
    fontSize: 22,
  },
  item: {
    margin: 0,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 20,
  },
  modalTitle: {
    fontSize: 16
  },
  modalMessageContainer : {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalMessage: {
    fontSize: 14,
  },
  selectedTask: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
  button: {
    // backgroundColor: paletColors.colorTree,
    padding: 10,
    // borderRadius: 10,
  }
});

export default function App() {
  const [textInput, setTextInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [item, setItem] = useState([]);

  const onHandleDeleteitem = (id) => {
    setItem(item.filter((item) => item.id !== id));
    setSelectedTask(null);
    setModalVisible(!modalVisible);
  };

  const onHandleModal = (id) => {
    setModalVisible(!modalVisible);
    setSelectedTask(item.find((item) => item.id === id));
    // console.warn(id);
  };

  const onHandleText = (e) => {
    setTextInput(e);
  };

  const addItem = () => {
    setItem((prev) => [
      ...prev,
      {
        id: Date.now(),
        value: textInput,
      },
    ]);
    setTextInput("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.container_item}>
      <Text style={styles.title}>{item.value}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onHandleModal(item.id)}
      >
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <AddTask
        item={item}
        onChangeText={onHandleText}
        placeholder="new task"
        addItem={addItem}
        selectionColor="#4A306D"
        placeholderTextColor="#4A306D"
        textButton=" + "
        color="#4A306D"
      />
      <FlatList
        data={item}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      <CustomModal animationType="slide" visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Detalle de la lista</Text>
        </View>
        <View style={styles.modalMessageContainer}>
          <Text style={styles.modalMessage}>
            ¿Estas seguro de que quieres eliminar?
          </Text>
        </View>
        <View style={styles.modalMessageContainer}>
          <Text style={styles.selectedTask}>{selectedTask?.value}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title="Eliminar"
            onPress={() => onHandleDeleteitem(selectedTask?.id)}
            // color="#4A306D"
          />
          <Button
            style={styles.button}
            title="Cancelar"
            onPress={() => setModalVisible(!modalVisible)}
            // color="#cccccc"
          />
        </View>
      </CustomModal>
    </View>
  );
}
