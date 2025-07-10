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

  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [uploadMessage, setUploadMessage] = useState<string>("");

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
    setUploadStatus("uploading");
    setUploadMessage("Processing Image. Please Wait...");

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

      setUploadStatus("success");
      setUploadMessage("Upload successful! Case updated.");

      // Fetch case data again to get updated prediction and image
      await fetchCase(auth?.access_token);
    } catch (error: any) {
      setUploadStatus("error");
      setUploadMessage(error.message || "Upload failed");
    } finally {
      // Automatically close modal after a short delay
      setTimeout(() => {
        setShowModal(false);
        setUploadStatus("idle");
        setUploadMessage("");
      }, 2500);
    }
  };

  const waitForImageToLoad = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Image failed to load"));
      img.src = src;
    });
  };

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

  const printRef = useRef(null);

  useEffect(() => {
    if (id && authToken) fetchCase(authToken);
  }, [id, authToken]);

  const handleDownloadPDF = async () => {
    setExporting(true);
    const element = printRef.current;
    if (!element) return;

    await waitForImageToLoad(caseData.o_image);

    html2pdf()
      .set({
        margin: 0.5,
        filename: `case_${caseData.full_name.replace(/\s+/g, "_")}_${id}.pdf`,
        image: { type: "pgn", quality: 0.5 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
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
          <Card className="border rounded p-4 shadow max-w-md">
            <CardHeader className="font-semibold text-lg">
              Patient Original MRI Image
            </CardHeader>
            <CardContent className="mt-4 space-y-4">
              {!caseData.o_image ? (
                <>
                  <Input
                    className="hover:bg-blue-300"
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
                <img
                  src={caseData.o_image || "/placeholder.svg"}
                  alt="MRI Image"
                  crossOrigin="anonymous"
                  className={`${exporting ? "w-64" : "max-w-sm"} rounded`}
                />
              )}

              <div className="font-semibold text-lg">Model Result</div>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Prediction:</strong>{" "}
                  {caseData.prediction ? caseData.prediction : "N/A"}
                </p>
                <p>
                  <strong>Confidence:</strong>{" "}
                  {caseData.pred_probability
                    ? `${(caseData.pred_probability * 100).toFixed(1)}%`
                    : "N/A"}
                </p>
              </div>
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
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center w-[300px]">
            {uploadStatus === "uploading" ? (
              <>
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              </>
            ) : uploadStatus === "success" ? (
              <div className="text-green-600 text-2xl mb-2">✓</div>
            ) : uploadStatus === "error" ? (
              <div className="text-red-600 text-2xl mb-2">✗</div>
            ) : null}
            <p className="text-lg font-medium">{uploadMessage}</p>
          </div>
        </div>
      )}
    </main>
  );
}
