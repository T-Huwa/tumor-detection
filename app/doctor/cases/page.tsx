"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Match backend field names
interface Case {
  id: number;
  prediction: string;
  pred_probability: number;
  doctor_feedback: string;
  doctor_id: number;
  status: string;
  updated_at: string;
}

export default function ResultsPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authString = localStorage.getItem("auth");

    let auth = null;
    if (authString) {
      auth = JSON.parse(authString);
    }

    const fetchCases = async (id: number, token: string) => {
      setLoading(true);
      try {
        //const res = await fetch(`http://localhost:8000/cases/doctor/${id}`);
        const res = await fetch(
          `${process.env.BACKEND_URL}/cases/doctor/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //console.log(res);

        //const data = await res.json();
        //console.log(data);
        if (!res.ok) throw new Error("Failed to fetch cases");

        const data: Case[] = await res.json();
        setCases(data);
      } catch (error) {
        console.error("Error fetching cases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases(auth?.id, auth?.access_token);
  }, []);

  return (
    <div className="px-6 py-16 my-6">
      <h3 className="font-bold text-lg mb-6">List of Allotted Cases</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Model Prediction</TableHead>
            <TableHead>Probability</TableHead>
            <TableHead>Doctor Feedback</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="items-center">
                <Loader className="animate-spin" />
              </TableCell>
            </TableRow>
          ) : (
            cases.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.prediction || "N/A"}</TableCell>
                <TableCell>
                  {`${(c.pred_probability * 100).toFixed(2)}%` || "N/A"}
                </TableCell>
                <TableCell>{c.doctor_feedback || "N/A"}</TableCell>
                <TableCell>{c.status || "Pending"}</TableCell>
                <TableCell>{new Date(c.updated_at).toLocaleString()}</TableCell>
                <TableCell>
                  <Link
                    className="p-2 rounded-lg bg-blue-200 hover:bg-blue-300 text-xs transition-colors"
                    href={`cases/${c.id}`}
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
