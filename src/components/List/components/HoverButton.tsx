import * as React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
// import FontAwesome5Icons from "react-native-vector-icons/FontAMaterialCommunityIcons";
const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  },
  buttonText: {
    color: "#f1f1f1",
    fontSize: 14
  }
});

const HoverButton = ({ isHovered, title, style }: any) => {
  return (
    <Pressable
      style={({ hovered }: any) => [
        styles.button,
        {
          backgroundColor: hovered
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(255, 255, 255, 0.1)",
          display: isHovered ? "flex" : "none",
          ...style
        }
      ]}
    >
      {/* <FontAwesome5Icons name="clock" size={34} color="#fff" /> */}
      <Text style={{ textAlign: "center", color: "white" }}>{title}</Text>
    </Pressable>
  );
};

export default HoverButton;
