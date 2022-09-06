import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal 
} from "react-native";
import { useEffect, useState } from "react";

const paletColors = {
  colorOne: "#EE6C4D",
  colorTwo: "#E0FBFC",
  colorTree: "#98C1D9",
  colorFor: "#3D5A80",
  colorFive: "#293241",
};

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    backgroundColor: paletColors.colorTwo,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: paletColors.colorFive,
  },
  inputContainer: {
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputMultiContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 20,
  },

  input: {
    width: "75%",
    borderBottomColor: paletColors.colorTree,
    borderBottomWidth: 1,
    fontSize: 20,
    height: 40,
    color: paletColors.colorTwo,
  },
  container_item: {
    backgroundColor: paletColors.colorFive,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: paletColors.colorFor,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
    color: paletColors.colorTwo,
    fontSize: 22,
  },
  item: {
    margin: 0,
  },
});



export default function App() {
  const [textInput, setTextInput] = useState("");
  const [item, setItem] = useState([]); //para seghuir el curso
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const onHandleDeleteItem = (id) => {
    setItem(item.filter((item) => item.id !== id));
    setSelectedTask(null);
    setModalVisible(!modalVisible);
  }

  const onHandleModal = (id) => {
    setModalVisible(!modalVisible);
    setSelectedTask(item.find((item) => item.id === id))
    console.warn(id);
  }
  
  const Item = ({ item }) => (
    <View style={styles.container_item}>
      <Text style={styles.title}>{item.value}</Text>
  
      <TouchableOpacity style={styles.button} onPress={() => onHandleModal(item.id)}>
          <Text style={styles.delete}>X</Text>
        </TouchableOpacity>
    </View>
  );
  
  const renderItem = ({ item }) => <Item item={item} />;

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
    // console.log(data);
  };


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onHandleText}
          value={textInput}
        />
        <Button title="add" onPress={addItem} />
      </View>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={item}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <Modal animationType='slide' visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Detalle de la lista</Text>
        </View>
        <View style={styles.modalMessageContainer}> 
          <Text style={styles.modalMessage}>¿Estas seguro de que quieres eliminar?</Text>
        </View>
        <View style={styles.modalMessageContainer}> 
          <Text style={styles.selectedTask}>{selectedTask?.value}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            title='Eliminar'
            onPress={() => onHandleDeleteItem(selectedTask?.id)}
            color='#4A306D'
          />
          <Button 
            title='Cancelar'
            onPress={() => setModalVisible(!modalVisible)}
            color='#cccccc'
          />
        </View>
      </Modal>
    </View>
  );
}
