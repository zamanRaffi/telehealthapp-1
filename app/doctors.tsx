import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { MapPin, Search, Star } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { doctors, specialties } from "../data/doctors";

export default function DoctorsScreen() {
  const router = useRouter();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty =
      selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;
    const matchesSearch =
      searchQuery === "" ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Find Doctors",
          headerBackTitle: "Back",
        }}
      />

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color="#6B7280" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors, specialties..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.specialtiesContainer}
        contentContainerStyle={styles.specialtiesContent}
      >
        {specialties.map((specialty) => (
          <TouchableOpacity
            key={specialty.id}
            style={[
              styles.specialtyChip,
              selectedSpecialty === specialty.name &&
                styles.specialtyChipActive,
            ]}
            onPress={() => setSelectedSpecialty(specialty.name)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.specialtyText,
                selectedSpecialty === specialty.name &&
                  styles.specialtyTextActive,
              ]}
            >
              {specialty.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.doctorsList}
        contentContainerStyle={styles.doctorsListContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.resultsText}>
          {filteredDoctors.length} doctors available
        </Text>

        {filteredDoctors.map((doctor) => (
          <TouchableOpacity
            key={doctor.id}
            style={styles.doctorCard}
            onPress={() => router.push(`/doctor/${doctor.id}`)}
            activeOpacity={0.7}
          >
            <Image
              source={{ uri: doctor.avatar }}
              style={styles.doctorAvatar}
              contentFit="cover"
            />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
              <View style={styles.doctorMeta}>
                <View style={styles.ratingContainer}>
                  <Star color="#FFA500" size={14} fill="#FFA500" />
                  <Text style={styles.ratingText}>
                    {doctor.rating} ({doctor.reviewCount})
                  </Text>
                </View>
                <View style={styles.separator} />
                <Text style={styles.experienceText}>
                  {doctor.yearsExperience} years exp.
                </Text>
              </View>
              <View style={styles.doctorFooter}>
                <Text style={styles.feeText}>${doctor.consultationFee}</Text>
                <View style={styles.availabilityBadge}>
                  <View style={styles.availabilityDot} />
                  <Text style={styles.availabilityText}>
                    {doctor.nextAvailable}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  searchContainer: {
    backgroundColor: "#fff",
    padding: 16,
    paddingBottom: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1A1A1A",
  },
  specialtiesContainer: {
    backgroundColor: "#fff",
    paddingBottom: 16,
  },
  specialtiesContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  specialtyChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F5F7FA",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  specialtyChipActive: {
    backgroundColor: "#1976D2",
    borderColor: "#1976D2",
  },
  specialtyText: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "#6B7280",
  },
  specialtyTextActive: {
    color: "#fff",
  },
  doctorsList: {
    flex: 1,
  },
  doctorsListContent: {
    padding: 16,
  },
  resultsText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  doctorCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  doctorAvatar: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 16,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#1A1A1A",
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  doctorMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    color: "#1A1A1A",
    fontWeight: "500" as const,
  },
  separator: {
    width: 1,
    height: 12,
    backgroundColor: "#E5E7EB",
  },
  experienceText: {
    fontSize: 13,
    color: "#6B7280",
  },
  doctorFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  feeText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#1976D2",
  },
  availabilityBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  availabilityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2E7D32",
  },
  availabilityText: {
    fontSize: 12,
    color: "#2E7D32",
    fontWeight: "500" as const,
  },
});
