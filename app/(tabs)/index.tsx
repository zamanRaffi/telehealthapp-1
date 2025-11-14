import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import LogoutButton from "../LogoutButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Activity,
  Calendar,
  FileText,
  Heart,
  Search,
  Video,
} from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { appointments } from "../../data/appointments";
import { getDailyTips } from "../../utils/healthTips";

export default function HomeScreen() {
    const [username, setUsername] = useState("");
    const [dailyTips, setDailyTips] = useState([]);

    useEffect(() => {
        const loadName = async () => {
          const storedName = await AsyncStorage.getItem("userName");
          if (storedName) setUsername(storedName);
        };
        loadName();
      }, []);


    useEffect(() => {
      setDailyTips(getDailyTips());
    }, []);
  const router = useRouter();
  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "upcoming"
  );


  

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
        <Text style={styles.greeting}>
      Hello, {username ? username : "User"}
    </Text>
          <Text style={styles.subGreeting}>How are you feeling today?</Text>
          <LogoutButton />
        </View>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionCard, styles.primaryAction]}
          onPress={() => router.push("/doctors")}
          activeOpacity={0.7}
        >
          <View style={styles.actionIconContainer}>
            <Search color="#fff" size={24} />
          </View>
          <Text style={styles.actionTitle}>Find Doctors</Text>
          <Text style={styles.actionSubtitle}>
            Search by specialty or name
          </Text>
        </TouchableOpacity>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.smallActionCard}
            onPress={() => router.push("/appointments")}
            activeOpacity={0.7}
          >
            <View style={[styles.smallIconContainer, { backgroundColor: "#E8F5E9" }]}>
              <Calendar color="#2E7D32" size={20} />
            </View>
            <Text style={styles.smallActionTitle}>Appointments</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallActionCard}
            activeOpacity={0.7}
          >
            <View style={[styles.smallIconContainer, { backgroundColor: "#FFF3E0" }]}>
              <FileText color="#E65100" size={20} />
            </View>
            <Text style={styles.smallActionTitle}>Records</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.smallActionCard}
            activeOpacity={0.7}
          >
            <View style={[styles.smallIconContainer, { backgroundColor: "#FCE4EC" }]}>
              <Heart color="#C2185B" size={20} />
            </View>
            <Text style={styles.smallActionTitle}>Health Tracker</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallActionCard}
            activeOpacity={0.7}
          >
            <View style={[styles.smallIconContainer, { backgroundColor: "#E3F2FD" }]}>
              <Activity color="#1565C0" size={20} />
            </View>
            <Text style={styles.smallActionTitle}>Lab Results</Text>
          </TouchableOpacity>
        </View>
      </View>

      {upcomingAppointments.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity onPress={() => router.push("/appointments")}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {upcomingAppointments.map((appointment) => (
            <TouchableOpacity
              key={appointment.id}
              style={styles.appointmentCard}
              activeOpacity={0.7}
            >
              <Image
                source={{ uri: appointment.doctorAvatar }}
                style={styles.appointmentAvatar}
                contentFit="cover"
              />
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentDoctorName}>
                  {appointment.doctorName}
                </Text>
                <Text style={styles.appointmentSpecialty}>
                  {appointment.doctorSpecialty}
                </Text>
                <View style={styles.appointmentMeta}>
                  <Calendar color="#1976D2" size={14} />
                  <Text style={styles.appointmentMetaText}>
                    {new Date(appointment.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    at {appointment.time}
                  </Text>
                </View>
              </View>
              <View style={styles.appointmentType}>
                <Video color="#1976D2" size={18} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Health Tips</Text>
  {dailyTips.map((tip, index) => (
    <View
      key={index}
      style={[styles.tipCard, index !== dailyTips.length - 1 && { marginBottom: 12 }]} // add gap except last
    >
      <Text style={styles.tipText}>{tip}</Text>
    </View>
  ))}
</View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: "#6B7280",
  },
  quickActions: {
    padding: 20,
    gap: 12,
  },
  actionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  primaryAction: {
    backgroundColor: "#1976D2",
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#fff",
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  smallActionCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  smallIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  smallActionTitle: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#1A1A1A",
  },
  section: {
    padding: 20,
    paddingTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#1A1A1A",
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#1976D2",
  },
  appointmentCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  appointmentAvatar: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  appointmentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  appointmentDoctorName: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#1A1A1A",
    marginBottom: 2,
  },
  appointmentSpecialty: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 6,
  },
  appointmentMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  appointmentMetaText: {
    fontSize: 13,
    color: "#1976D2",
    fontWeight: "500" as const,
  },
  appointmentType: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
  },
  tipCard: {
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#2E7D32",
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
});
