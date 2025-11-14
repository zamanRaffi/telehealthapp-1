import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Globe, GraduationCap, MapPin, Star } from "lucide-react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { doctors } from "../../data/doctors";

export default function DoctorDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const doctor = doctors.find((d) => d.id === id);

  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  if (!doctor) {
    return (
      <View style={styles.container}>
        <Text>Doctor not found</Text>
      </View>
    );
  }

  const handleBookAppointment = async () => {
    if (!selectedDay || !selectedSlot) {
      Alert.alert("Selection Required", "Please select a day and time slot");
      return;
    }
  
    const appointment = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      avatar: doctor.avatar,
      day: selectedDay,
      time: selectedSlot,
      consultationFee: doctor.consultationFee,
    };
  
    // Save to AsyncStorage
    const existing = await AsyncStorage.getItem("appointments");
    const parsed = existing ? JSON.parse(existing) : [];
    parsed.push(appointment);
    await AsyncStorage.setItem("appointments", JSON.stringify(parsed));
  
    // Navigate to Appointments tab
    router.push("/(tabs)/appointments");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: doctor.name,
          headerBackTitle: "Back",
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={{ uri: doctor.avatar }}
            style={styles.avatar}
            contentFit="cover"
          />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{doctor.name}</Text>
            <Text style={styles.specialty}>{doctor.specialty}</Text>
            <View style={styles.ratingContainer}>
              <Star color="#FFA500" size={16} fill="#FFA500" />
              <Text style={styles.rating}>
                {doctor.rating} ({doctor.reviewCount} reviews)
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <GraduationCap color="#1976D2" size={20} />
            </View>
            <Text style={styles.statValue}>{doctor.yearsExperience}+</Text>
            <Text style={styles.statLabel}>Years Exp.</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Star color="#1976D2" size={20} />
            </View>
            <Text style={styles.statValue}>{doctor.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Globe color="#1976D2" size={20} />
            </View>
            <Text style={styles.statValue}>{doctor.languages.length}</Text>
            <Text style={styles.statLabel}>Languages</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>{doctor.bio}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.languagesContainer}>
            {doctor.languages.map((lang, index) => (
              <View key={index} style={styles.languageChip}>
                <Text style={styles.languageText}>{lang}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Slots</Text>
          {doctor.availability.map((dayAvailability, index) => (
            <View key={index} style={styles.dayContainer}>
              <TouchableOpacity
                style={[
                  styles.dayButton,
                  selectedDay === dayAvailability.day && styles.dayButtonActive,
                ]}
                onPress={() => {
                  setSelectedDay(dayAvailability.day);
                  setSelectedSlot("");
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.dayText,
                    selectedDay === dayAvailability.day && styles.dayTextActive,
                  ]}
                >
                  {dayAvailability.day}
                </Text>
              </TouchableOpacity>

              {selectedDay === dayAvailability.day && (
                <View style={styles.slotsContainer}>
                  {dayAvailability.slots.map((slot, slotIndex) => (
                    <TouchableOpacity
                      key={slotIndex}
                      style={[
                        styles.slotChip,
                        selectedSlot === slot && styles.slotChipActive,
                      ]}
                      onPress={() => setSelectedSlot(slot)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.slotText,
                          selectedSlot === slot && styles.slotTextActive,
                        ]}
                      >
                        {slot}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Consultation Fee</Text>
          <Text style={styles.price}>${doctor.consultationFee}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookAppointment}
          activeOpacity={0.8}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 24,
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rating: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "500" as const,
  },
  statsContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: "#1A1A1A",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  section: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 12,
  },
  bio: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 22,
  },
  languagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  languageChip: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  languageText: {
    fontSize: 14,
    color: "#1976D2",
    fontWeight: "500" as const,
  },
  dayContainer: {
    marginBottom: 12,
  },
  dayButton: {
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  dayButtonActive: {
    backgroundColor: "#1976D2",
    borderColor: "#1976D2",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#6B7280",
  },
  dayTextActive: {
    color: "#fff",
  },
  slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
    paddingLeft: 12,
  },
  slotChip: {
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  slotChipActive: {
    backgroundColor: "#E8F5E9",
    borderColor: "#2E7D32",
  },
  slotText: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "#6B7280",
  },
  slotTextActive: {
    color: "#2E7D32",
  },
  footer: {
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 2,
  },
  price: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "#1976D2",
  },
  bookButton: {
    backgroundColor: "#1976D2",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#fff",
  },
});
