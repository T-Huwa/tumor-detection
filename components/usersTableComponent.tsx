"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  name: string;
  email: string;
  userType: string;
  specialty: string;
  experience: number;
  hospital: string;
}

function FilterButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      className={`px-3 py-0 border-gray-600 ${
        isActive ? "bg-black text-white" : "bg-gray-400"
      }`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default function userTableGroup() {
  const users: User[] = [
    {
      id: 1,
      name: "Chikondi Banda",
      email: "chikondi.banda@email.com",
      userType: "doctor",
      specialty: "Neurosurgery",
      experience: 12,
      hospital: "Queen Elizabeth Central Hospital",
    },
    {
      id: 2,
      name: "Thandiwe Phiri",
      email: "thandiwe.phiri@email.com",
      userType: "nurse",
      specialty: "Neuro-Oncology Support",
      experience: 6,
      hospital: "Kamuzu Central Hospital",
    },
    {
      id: 3,
      name: "Blessings Mvula",
      email: "blessings.mvula@email.com",
      userType: "doctor",
      specialty: "Radiation Oncology",
      experience: 10,
      hospital: "Blantyre Cancer Center",
    },
    {
      id: 4,
      name: "Limbani Chirwa",
      email: "limbani.chirwa@email.com",
      userType: "nurse",
      specialty: "Palliative Care for Brain Cancer",
      experience: 5,
      hospital: "Mzuzu Central Hospital",
    },
    {
      id: 5,
      name: "Zione Mwale",
      email: "zione.mwale@email.com",
      userType: "doctor",
      specialty: "Neuropathology",
      experience: 8,
      hospital: "Lilongwe Cancer Center",
    },
    {
      id: 6,
      name: "Tadala Nkhoma",
      email: "tadala.nkhoma@email.com",
      userType: "nurse",
      specialty: "Neuro ICU Nursing",
      experience: 4,
      hospital: "Kamuzu Central Hospital",
    },
    {
      id: 7,
      name: "Kondwani Nyirenda",
      email: "kondwani.nyirenda@email.com",
      userType: "doctor",
      specialty: "Neuroimaging",
      experience: 9,
      hospital: "Queen Elizabeth Central Hospital",
    },
  ];

  const [filter, setFilter] = useState<string>("all");

  const filteredUsers =
    filter === "all" ? users : users.filter((user) => user.userType === filter);

  return (
    <>
      <div className="">
        <h3 className="font-bold text-lg mb-6">List of Users</h3>

        <div className="mb-6 flex gap-2">
          <FilterButton
            label="All"
            isActive={filter === "all"}
            onClick={() => setFilter("all")}
          />
          <FilterButton
            label="Doctors"
            isActive={filter === "doctor"}
            onClick={() => setFilter("doctor")}
          />
          <FilterButton
            label="Nurses"
            isActive={filter === "nurse"}
            onClick={() => setFilter("nurse")}
          />
        </div>

        <Table>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>User Type</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Hospital</TableHead>
          </TableRow>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.userType}</TableCell>
                <TableCell>{user.specialty}</TableCell>
                <TableCell>{user.experience} years</TableCell>
                <TableCell>{user.hospital}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
