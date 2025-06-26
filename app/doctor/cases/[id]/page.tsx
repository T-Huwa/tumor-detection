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
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CaseForm from "@/components/case-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowLeftCircle, Download, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function CaseDetail() {
  const { id } = useParams();
  const [exporting, setExporting] = useState(false);
  const [caseData, setCaseData] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const authString = localStorage.getItem("auth");

  let auth = null;
  if (authString) {
    auth = JSON.parse(authString);
  }
  const authToken = auth?.access_token;

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const authString = localStorage.getItem("auth");
    const auth = authString ? JSON.parse(authString) : null;

    const formData = new FormData();
    formData.append("file", selectedFile);

    setShowModal(true);

    try {
      const res = await fetch(
        `${process.env.BACKEND_URL}/cases/upload-oimage/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth?.access_token}`,
          },
          body: formData,
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.detail || "Upload failed");

      console.log("Uploaded successfully:", result);
      setCaseData((prev: any) => ({
        ...prev,
        o_image: result.url,
        status: "processed",
      }));
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setShowModal(false);
    }
  };

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
  }, []);

  const handleDownloadPDF = () => {
    setExporting(true);
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

    setExporting(false);
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
        <Link
          href={"/doctor/cases"}
          className="bg-gray-200 border border-gray-100 shadow-md hover:shadow-lg hover:bg-gray-300 my-auto p-2 rounded-full transition-colors"
        >
          <ArrowLeft className="my-auto" />
        </Link>
        <h1 className="text-2xl flex-1 font-semibold mb-4 ml-3">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="border rounded p-4 shadow">
            <CardHeader className="font-semibold text-lg">
              Patient Original MRI Image
            </CardHeader>
            <CardContent className="mt-4 space-y-4">
              {!caseData.o_image ? (
                <>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setSelectedFile(e.target.files?.[0] || null)
                    }
                  />
                  <Button
                    onClick={handleFileUpload}
                    className="bg-blue-400 hover:bg-blue-600 text-white"
                    size={"sm"}
                  >
                    Upload Image
                  </Button>
                </>
              ) : (
                <Image
                  width={200}
                  height={200}
                  src={caseData.o_image || "/placeholder.svg"}
                  alt="MRI Image"
                  className="w-full rounded"
                />
              )}
            </CardContent>
          </Card>

          <Card className="border rounded p-4 shadow">
            <CardHeader className="font-semibold text-lg">
              Model Result
            </CardHeader>
            <CardContent className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prediction</TableHead>
                    <TableHead>Disease Type</TableHead>
                    <TableHead>Confidence (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {caseData.prediction ? caseData.prediction : "N/A"}
                    </TableCell>
                    <TableCell>Brain Tumor</TableCell>
                    <TableCell>
                      {caseData.pred_probability
                        ? `${(caseData.pred_probability * 100).toFixed(1)}%`
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <CaseForm
            setLoading={setShowModal}
            caseData={CaseFormData}
            isEditable={true}
            token={authToken}
            isExporting={exporting}
          />
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg font-medium">
              Processing Image. Please Wait...
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
