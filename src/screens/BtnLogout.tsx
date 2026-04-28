import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";

const BtnLogout: React.FC = () => {
  const { logout } = useAuth();

  return (
    <TouchableOpacity style={styles.button} onPress={logout}>
      <Text style={styles.buttonText}>Sair</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    zIndex: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BtnLogout;