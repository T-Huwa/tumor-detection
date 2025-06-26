"use client";

import html2pdf from "html2pdf.js";
import { useRef } from "react";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import CaseForm from "@/components/case-form";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function CaseDetail() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState<any>(null);
  const printRef = useRef(null);

  useEffect(() => {
    const authString = localStorage.getItem("auth");

    let auth = null;
    if (authString) {
      auth = JSON.parse(authString);
    }

    const fetchCase = async (token: string) => {
      try {
        const res = await fetch(`${process.env.BACKEND_URL}/cases/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch case");

        const data = await res.json();
        setCaseData(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchCase(auth?.access_token);
  }, [id]);

  const handleDownloadPDF = () => {
    const element = printRef.current;
    if (!element) return;

    html2pdf()
      .set({
        margin: 0.5,
        filename: `case_${id}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  if (!caseData) return <div className="p-6">Loading case...</div>;

  const CaseFormData = {
    id: caseData.id,
    doctorFeedback: caseData.doctor_feedback,
    doctorDecision: caseData.doctor_decision,
  };

  return (
    <main className="px-6 py-16">
      <div className="flex">
        {" "}
        <h1 className="text-2xl flex-1 font-semibold mb-4">
          Patient Case History - ID {id}
        </h1>
        <Button
          size={"sm"}
          onClick={handleDownloadPDF}
          className="bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download PDF <Download />
        </Button>
      </div>

      <div ref={printRef}>
        <Card className="border rounded p-4 shadow">
          <CardHeader className="font-semibold text-lg">
            Patient Details
          </CardHeader>
          <CardContent className="mt-2 space-y-1">
            <p>
              <strong>Name:</strong> {caseData.full_name}
            </p>
            <p>
              <strong>Age:</strong> {caseData.age}
            </p>
            <p>
              <strong>Address:</strong> {caseData.address}
            </p>
            <p>
              <strong>Mobile:</strong> {caseData.mobile}
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
