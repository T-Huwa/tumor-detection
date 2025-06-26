"use client";

import { Auth } from "@/app/admin/users/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// This I just put it here for typescript typing
interface Case {
  id: number;
  full_name: string;
  age: number;
  model_diagnosis: string;
  pred_probability: number;
  doctor_name: string;
  doctor_feedback: string;
  doctor_decision: string;
  created_at: string;
  address: string;
  doctor_id: number;
  mobile: string;
  nurse_feedback: string;
  nurse_id: number;
  o_image: string;
  p_image: string;
  prediction: string;
  recommended_test: string;
  status: string;
  updated_at: string;
}

export default function ResultsPage() {
  const [loading, setLoading] = useState(false);
  const [cases, setCases] = useState<Case[]>([]);
  const [message, setMessage] = useState("");

  const fetchCases = async (id: number, token: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/cases/nurse/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log(res);

      const data = await res.json();
      console.log(data);

      setCases(data);
      //console.log(data);
    } catch (error) {
      console.error("Failed to fetch cases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const authString = localStorage.getItem("auth");

    let auth = null;
    if (authString) {
      auth = JSON.parse(authString);
    }

    fetchCases(auth?.id, auth?.access_token);
  }, []);
  /*
  const cases: Case[] = [
    {
      caseId: 35,
      modelPrediction: "Meningioma (Tumor)",
      probability: 98.22,
      yourFeedback: "None",
      assignedDoctor: "None",
      doctorFeedback: "None",
      doctorDecision: "None",
      dateTime: "2024-03-01 22:08:48",
    },
    {
      caseId: 36,
      modelPrediction: "Pituitary (Tumor)",
      probability: 100.0,
      yourFeedback:
        "looks like model is right patient is suffering from Pituitary Tumor. Forwarded for doctor's review",
      assignedDoctor: "akash.mishra@gmail.com",
      doctorFeedback:
        "Referred for CT Scan and Harmonal Blood test to confirm the tumor",
      doctorDecision: "Pituitary (Tumor)",
      dateTime: "2024-03-02 21:28:30",
    },
    {
      caseId: 37,
      modelPrediction: "Meningioma (Tumor)",
      probability: 100.0,
      yourFeedback: "Looks like Meningioma forwarded to doctor",
      assignedDoctor: "akash.mishra@gmail.com",
      doctorFeedback:
        "yes it seems meningioma still MRS and PET need to be done for confirmation",
      doctorDecision: "Meningioma (Tumor)",
      dateTime: "2024-03-02 22:33:46",
    },
    {
      caseId: 38,
      modelPrediction: "Glioma (Tumor)",
      probability: 99.99,
      yourFeedback: "forwarded to doctor for review",
      assignedDoctor: "akash.mishra@gmail.com",
      doctorFeedback: "Biopsy need to be done for confirmation of Glioma",
      doctorDecision: "Glioma (Tumor)",
      dateTime: "2024-03-02 22:35:59",
    },
    {
      caseId: 39,
      modelPrediction: "Glioma (Tumor)",
      probability: 100.0,
      yourFeedback: "looks like glioma forwarded for doctor review",
      assignedDoctor: "akash.mishra@gmail.com",
      doctorFeedback:
        "The model is right need to do Lumbar Puncture and PET scan for confirmation",
      doctorDecision: "Glioma (Tumor)",
      dateTime: "2024-03-03 05:29:18",
    },
  ];
*/
  return (
    <>
      <div className="px-6 py-16 my-6 flex-col">
        <div className="flex">
          <div className="flex-1"></div>
          <Link
            className="flex p-1 rounded-md bg-blue-200 border border-blue-300 hover:bg-blue-400 text-sm font-gray-800 transition-colors"
            href="/user/cases/new"
          >
            <Plus />
          </Link>
        </div>
        <Table>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Prediction</TableHead>
            <TableHead>Probability</TableHead>
            <TableHead>Assigned Doctor</TableHead>
            <TableHead>Doctor Feedback</TableHead>
            <TableHead>Doctor's Decision</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-gray-300 p-2 text-sm font-semibold text-center"
                >
                  Fetching Users...
                </TableCell>
              </TableRow>
            ) : cases ? (
              cases.map((c, i) => (
                <TableRow key={i}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.prediction ? c.prediction : "N/A"}</TableCell>
                  <TableCell>
                    {c.pred_probability ? `${c.pred_probability}%` : "N/A"}
                  </TableCell>
                  <TableCell>{c.doctor_name}</TableCell>
                  <TableCell>
                    {c.doctor_feedback ? c.doctor_feedback : "N/A"}
                  </TableCell>
                  <TableCell>
                    {c.doctor_decision ? c.doctor_decision : "N/A"}
                  </TableCell>
                  <TableCell>{c.created_at}</TableCell>
                  <TableCell>
                    <Link
                      className="px-3 py-2 rounded-full bg-blue-100 hover:bg-blue-300 text-sm font-light transition-colors"
                      href={`cases/${c.id}`}
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-gray-300 p-2 text-sm font-semibold"
                >
                  {message}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
