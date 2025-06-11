"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Check, Trash } from "lucide-react";

// const users = [
//   {
//     id: 1,
//     name: "Chikondi Banda",
//     email: "chikondi.banda@gmail.com",
//     userType: "doctor",
//     created: "2023-02-02 17:47:56",
//     status: "Inactive",
//   },
//   {
//     id: 2,
//     name: "Thandiwe Phiri",
//     email: "thandiwe.phiri@gmail.com",
//     userType: "doctor",
//     created: "2023-02-02 20:20:22",
//     status: "Inactive",
//   },
//   {
//     id: 3,
//     name: "Blessings Mvula",
//     email: "blessings.mvula@gmail.com",
//     userType: "admin",
//     created: "2023-12-28 16:33:46",
//     status: "Active",
//   },
//   {
//     id: 4,
//     name: "Limbani Chirwa",
//     email: "limbani.chirwa@gmail.com",
//     userType: "nurse",
//     created: "2023-12-28 16:35:13",
//     status: "Inactive",
//   },
//   {
//     id: 5,
//     name: "Zione Mwale",
//     email: "zione.mwale@gmail.com",
//     userType: "doctor",
//     created: "2023-12-28 16:57:52",
//     status: "Active",
//   },
//   {
//     id: 6,
//     name: "Tadala Nkhoma",
//     email: "tadala.nkhoma@gmail.com",
//     userType: "doctor",
//     created: "2023-12-28 17:01:04",
//     status: "Active",
//   },
//   {
//     id: 7,
//     name: "Kondwani Nyirenda",
//     email: "kondwani.nyirenda@gmail.com",
//     userType: "doctor",
//     created: "2023-12-28 18:47:45",
//     status: "None",
//   },
//   {
//     id: 8,
//     name: "Mphatso Kamanga",
//     email: "mphatso.kamanga@gmail.com",
//     userType: "nurse",
//     created: "2023-12-28 18:49:00",
//     status: "None",
//   },
// ];

interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
  specialty?: string;
  experience?: number;
  hospital?: string;
  is_active: boolean;
}

interface Auth {
  access_token: string;
  token_type: string;
  email: string;
  name: string;
  role: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAction, setSelectedAction] = useState("Active");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const authString = localStorage.getItem("auth");

  const auth: Auth | null = authString ? JSON.parse(authString) : null;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.BACKEND_URL}/users`, {
          headers: {
            Authorization: `Bearer ${auth?.access_token}`,
          },
        });
        const data = await res.json();
        console.log("data:");
        console.log(data);

        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleApprove = async (userId: number) => {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/approve/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth?.access_token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to approve user");

      // Remove user from list
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error("Approval error:", err);
    }
  };

  const handleDeactivate = async (userId: number, name: string) => {
    if (!confirm("Proceed to deactivate user " + name + "?")) return;
    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/deactivate/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth?.access_token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to deactivate user");
    } catch (err) {
      console.error("Deactivation error:", err);
    }
  };

  const handleRevoke = async (userId: number, name: string) => {
    if (
      !confirm(
        "Proceed to deactivate user " +
          name +
          "? This will deactivate them and remove them from the system!"
      )
    )
      return;
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/deny/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth?.access_token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to revoke user");

      // Remove user from list
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error("Revocation error:", err);
    }
  };

  const handleChange = (e: any) => {
    setSelectedAction(e);
    setFilteredUsers(users.filter((user) => user.is_active === e));
  };

  useEffect(() => {
    setFilteredUsers(users.filter((user) => user.is_active === true));
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-semibold">List of All Users</h2>
      {/* <div className="flex items-center space-x-4">
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
      </div> */}
      <Card>
        <CardContent className="p-4">
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID#</TableHead>
                  <TableHead>Name of User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>User Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.full_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      {user.is_active ? (
                        <TableCell className="text-green-500 font-semibold">
                          Active
                        </TableCell>
                      ) : (
                        <TableCell className="text-red-500 font-semibold">
                          Inactive
                        </TableCell>
                      )}
                      <TableCell>
                        {!user.is_active ? (
                          <>
                            <button
                              className="border border-green border-green-500 p-1 text-green-500 rounded-lg"
                              onClick={() => handleApprove(user.id)}
                            >
                              <Check />
                            </button>
                            <button
                              className="ml-2  border border-green border-red-500 p-1 text-xs text-red-500 rounded-lg"
                              onClick={() =>
                                handleRevoke(user.id, user.full_name)
                              }
                            >
                              <Trash />
                            </button>
                          </>
                        ) : (
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleDeactivate(user.id, user.full_name)
                            }
                          >
                            Deactivate
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No Users
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
