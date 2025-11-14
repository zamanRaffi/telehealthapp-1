import { Link, Stack } from "expo-router";
import { AlertCircle } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <AlertCircle color="#DC2626" size={64} />
        </View>
        <Text style={styles.title}>Page Not Found</Text>
        <Text style={styles.description}>
          The page you&apos;re looking for doesn&apos;t exist.
        </Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to Home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F7FA",
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
  },
  link: {
    backgroundColor: "#1976D2",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#fff",
  },
});
