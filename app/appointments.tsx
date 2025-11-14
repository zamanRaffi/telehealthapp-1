import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { Calendar, MapPin, Video, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { appointments as initialAppointments } from "../data/appointments";

export default function AppointmentsScreen() {
  const router = useRouter();
  const [appointments, setAppointments] = useState(initialAppointments);

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "upcoming"
  );

  const handleCancelAppointment = (id: string) => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            setAppointments((prev) =>
              prev.map((apt) =>
                apt.id === id ? { ...apt, status: "cancelled" as const } : apt
              )
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "My Appointments",
          headerBackTitle: "Back",
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {upcomingAppointments.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Calendar color="#9CA3AF" size={48} />
            </View>
            <Text style={styles.emptyTitle}>No Appointments</Text>
            <Text style={styles.emptyText}>
              You don't have any upcoming appointments
            </Text>
            <TouchableOpacity
              style={styles.findDoctorButton}
              onPress={() => router.push("/doctors")}
              activeOpacity={0.8}
            >
              <Text style={styles.findDoctorButtonText}>Find a Doctor</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.appointmentsList}>
            <Text style={styles.sectionTitle}>
              Upcoming ({upcomingAppointments.length})
            </Text>

            {upcomingAppointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateDay}>
                      {new Date(appointment.date).getDate()}
                    </Text>
                    <Text style={styles.dateMonth}>
                      {new Date(appointment.date).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </Text>
                  </View>

                  <View style={styles.appointmentInfo}>
                    <View style={styles.doctorHeader}>
                      <Image
                        source={{ uri: appointment.doctorAvatar }}
                        style={styles.doctorAvatar}
                        contentFit="cover"
                      />
                      <View style={styles.doctorInfo}>
                        <Text style={styles.doctorName}>
                          {appointment.doctorName}
                        </Text>
                        <Text style={styles.doctorSpecialty}>
                          {appointment.doctorSpecialty}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.appointmentDetails}>
                      <View style={styles.detailRow}>
                        <Calendar color="#6B7280" size={16} />
                        <Text style={styles.detailText}>
                          {new Date(appointment.date).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Video color="#6B7280" size={16} />
                        <Text style={styles.detailText}>
                          {appointment.time} • Video Consultation
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => handleCancelAppointment(appointment.id)}
                    activeOpacity={0.7}
                  >
                    <X color="#DC2626" size={18} />
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.joinButton}
                    activeOpacity={0.8}
                  >
                    <Video color="#fff" size={18} />
                    <Text style={styles.joinButtonText}>Join Call</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  findDoctorButton: {
    backgroundColor: "#1976D2",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  findDoctorButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#fff",
  },
  appointmentsList: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  appointmentCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  dateContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  dateDay: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "#1976D2",
  },
  dateMonth: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: "#1976D2",
    textTransform: "uppercase" as const,
  },
  appointmentInfo: {
    flex: 1,
  },
  doctorHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginRight: 12,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: "center",
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 2,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#6B7280",
  },
  appointmentDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#4B5563",
  },
  cardFooter: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F5F7FA",
  },
  cancelButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#FEE2E2",
    gap: 6,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#DC2626",
  },
  joinButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#1976D2",
    gap: 6,
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: "#fff",
  },
});
