"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

const users = [
    { id: 1, name: "Chikondi Banda", email: "chikondi.banda@gmail.com", userType: "doctor", created: "2023-02-02 17:47:56", status: "Inactive" },
    { id: 2, name: "Thandiwe Phiri", email: "thandiwe.phiri@gmail.com", userType: "doctor", created: "2023-02-02 20:20:22", status: "Inactive" },
    { id: 3, name: "Blessings Mvula", email: "blessings.mvula@gmail.com", userType: "admin", created: "2023-12-28 16:33:46", status: "Active" },
    { id: 4, name: "Limbani Chirwa", email: "limbani.chirwa@gmail.com", userType: "nurse", created: "2023-12-28 16:35:13", status: "Inactive" },
    { id: 5, name: "Zione Mwale", email: "zione.mwale@gmail.com", userType: "doctor", created: "2023-12-28 16:57:52", status: "Active" },
    { id: 6, name: "Tadala Nkhoma", email: "tadala.nkhoma@gmail.com", userType: "doctor", created: "2023-12-28 17:01:04", status: "Active" },
    { id: 7, name: "Kondwani Nyirenda", email: "kondwani.nyirenda@gmail.com", userType: "doctor", created: "2023-12-28 18:47:45", status: "None" },
    { id: 8, name: "Mphatso Kamanga", email: "mphatso.kamanga@gmail.com", userType: "nurse", created: "2023-12-28 18:49:00", status: "None" },
  ];

export default function UserList() {

    const [selectedAction, setSelectedAction] = useState("Active");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState(users);

    const handleChange = (e: any) => {
        setSelectedAction(e)
        setFilteredUsers(users.filter((user) => user.status === e))
    };

    useEffect(() => {
        setFilteredUsers(users.filter((user) => user.status === selectedAction))
    }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold">List of All Users</h2>
      <div className="flex items-center space-x-4">
        <Select defaultValue="Active" onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button>Submit</Button>
      </div>
      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID#</TableHead>
                <TableHead>Name of User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>User Type</TableHead>
                <TableHead>Date of Creation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.userType}</TableCell>
                  <TableCell>{user.created}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell><Checkbox /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}