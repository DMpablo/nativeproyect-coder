import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, FlatList } from "react-native";
import { useEffect, useState } from "react";

const styleColors = {
  colorOne: "#EE6C4D",
  colorTwo: "#E0FBFC",
  colorTree: "#98C1D9",
  colorFor: "#3D5A80",
  colorSix: "#293241",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleColors.colorSix,
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
    // justifyContent:'center',
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 20,
  },

  input: {
    width: "75%",
    borderBottomColor: "#3D5A80",
    borderBottomWidth: 1,
    height: 40,
    color: "#3D5A80",
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//   .then(json => console.log(json))

export default function App() {
  
  const renderItem = ({ item }) => <Item title={item.title} />;
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then(json => console.warn(json))
      // (json) => {
      //   setImageUrl(json);
      //   setIsLoading(false);
      // });
      // console.warn(imageUrl);
  }, []);


  // if (isLoading) { // ⬅️ si está cargando, mostramos un texto que lo indique
  //   return (
  //     <div className="App">
  //       <h1>Cargando...</h1>
  //     </div>
  //   );
  // }



  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput placeholder="new task" style={styles.input} />
        <Button
          title="ADD"
          onPress={() => console.warn("hola")}
          color="#3D5A80"
        />
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}

// Paleta de colores
// #293241
// #EE6C4D
// #E0FBFC
// #98C1D9
// #3D5A80
