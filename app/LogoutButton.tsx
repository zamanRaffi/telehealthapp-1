import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Remove token from storage
    await AsyncStorage.removeItem("userToken");

    // Navigate back to login
    router.replace("/login");
  };

  return (
    <TouchableOpacity
      onPress={handleLogout}
      style={{ padding: 12, backgroundColor: "#1976D2", borderRadius: 8, marginTop: 20 }}
    >
      <Text style={{ color: "#fff", fontWeight: "700", textAlign: "center" }}>Logout</Text>
    </TouchableOpacity>
  );
}
