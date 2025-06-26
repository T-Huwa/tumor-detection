"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, Trash } from "lucide-react";

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

export interface Auth {
  id: number;
  access_token: string;
  token_type: string;
  email: string;
  name: string;
  role: string;
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

export default function UsersListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const authString = localStorage.getItem("auth");
  //console.log(authString);

  const auth: Auth | null = authString ? JSON.parse(authString) : null;
  //console.log(auth);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.BACKEND_URL}/pending-users`, {
          headers: {
            Authorization: `Bearer ${auth?.access_token}`,
          },
        });
        const data = await res.json();
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

  const filteredUsers =
    filter === "all" ? users : users.filter((user) => user.role === filter);

  console.log(filteredUsers);

  return (
    <div className="px-6 py-7 my-6">
      <h3 className="font-bold text-lg mb-6">Pending User Approvals</h3>

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

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>User Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length ? (
              filteredUsers.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
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
                  <TableCell>{user.experience ?? "-"} years</TableCell>
                  <TableCell>{user.hospital || "-"}</TableCell>
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
                          onClick={() => handleRevoke(user.id, user.full_name)}
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
                <TableCell colSpan={8} className="text-center py-4">
                  No Users
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
