"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function DownloadDataPage() {
  const predictionData = [
    {
      id: 41,
      originalImage: "Te-gl_0030.jpg",
      predictionImage: "Te-gl_0030.jpg_cam.jpg",
      modelPrediction: "Glioblastoma (Tumor)",
      probability: "97.85",
      nurse: "Chikondi Banda",
      nurseFeedback: "Forwarded to doctor for further review.",
      doctor: "Blessings Mvula",
      doctorFeedback: "MRI and biopsy recommended for confirmation.",
      decision: "Glioblastoma (Tumor)",
    },
    {
      id: 42,
      originalImage: "Te-me_0020.jpg",
      predictionImage: "Te-me_0020.jpg_cam.jpg",
      modelPrediction: "Meningioma (Tumor)",
      probability: "99.50",
      nurse: "Thandiwe Phiri",
      nurseFeedback: "Looks like Meningioma. Sent to doctor for confirmation.",
      doctor: "Zione Mwale",
      doctorFeedback: "CT scan and PET scan required for further analysis.",
      decision: "Meningioma (Tumor)",
    },
    {
      id: 43,
      originalImage: "Te-pItr_0015.jpg",
      predictionImage: "Te-pItr_0015.jpg_cam.jpg",
      modelPrediction: "Pituitary Adenoma (Tumor)",
      probability: "98.90",
      nurse: "Limbani Chirwa",
      nurseFeedback: "Patient shows symptoms consistent with Pituitary Adenoma.",
      doctor: "Kondwani Nyirenda",
      doctorFeedback: "Hormonal blood tests and MRI needed for confirmation.",
      decision: "Pituitary Adenoma (Tumor)",
    },
    {
      id: 44,
      originalImage: "Te-gl_0045.jpg",
      predictionImage: "Te-gl_0045.jpg_cam.jpg",
      modelPrediction: "Glioma (Tumor)",
      probability: "96.75",
      nurse: "Tadala Nkhoma",
      nurseFeedback: "Forwarded to doctor for review.",
      doctor: "Blessings Mvula",
      doctorFeedback: "Biopsy and PET scan required for confirmation.",
      decision: "Glioma (Tumor)",
    },
    {
      id: 45,
      originalImage: "Te-me_0032.jpg",
      predictionImage: "Te-me_0032.jpg_cam.jpg",
      modelPrediction: "Meningioma (Tumor)",
      probability: "99.99",
      nurse: "Chikondi Banda",
      nurseFeedback: "Model prediction seems accurate. Sent to doctor.",
      doctor: "Zione Mwale",
      doctorFeedback: "Further imaging required to confirm diagnosis.",
      decision: "Meningioma (Tumor)",
    },
    {
      id: 46,
      originalImage: "Te-pItr_0020.jpg",
      predictionImage: "Te-pItr_0020.jpg_cam.jpg",
      modelPrediction: "Pituitary Adenoma (Tumor)",
      probability: "97.65",
      nurse: "Thandiwe Phiri",
      nurseFeedback: "Symptoms align with Pituitary Adenoma. Forwarded to doctor.",
      doctor: "Kondwani Nyirenda",
      doctorFeedback: "CT scan and hormonal tests recommended.",
      decision: "Pituitary Adenoma (Tumor)",
    },
    {
      id: 47,
      originalImage: "Te-gl_0050.jpg",
      predictionImage: "Te-gl_0050.jpg_cam.jpg",
      modelPrediction: "Glioblastoma (Tumor)",
      probability: "98.45",
      nurse: "Limbani Chirwa",
      nurseFeedback: "Forwarded to doctor for further review.",
      doctor: "Blessings Mvula",
      doctorFeedback: "MRI and biopsy required for confirmation.",
      decision: "Glioblastoma (Tumor)",
    },
  ];

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Original Image",
      "Prediction Image",
      "Model Prediction",
      "Probability",
      "Nurse Handled",
      "Nurse Feedback",
      "Assigned Doctor",
      "Doctor Feedback",
      "Doctor Decision",
    ];

    const rows = predictionData.map((data) => [
      data.id,
      data.originalImage,
      data.predictionImage,
      data.modelPrediction,
      data.probability,
      data.nurse,
      data.nurseFeedback,
      data.doctor,
      data.doctorFeedback,
      data.decision,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "prediction_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-7 px-16 mx-6 mt-3 space-y-4">
      <h2 className="text-lg font-semibold">Full Prediction Data</h2>
      <Button className="mb-4" onClick={exportToCSV}>
        Export to CSV
      </Button>
      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Original Image</TableHead>
                <TableHead>Prediction Image</TableHead>
                <TableHead>Model Prediction</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Nurse Handled</TableHead>
                <TableHead>Nurse Feedback</TableHead>
                <TableHead>Assigned Doctor</TableHead>
                <TableHead>Doctor Feedback</TableHead>
                <TableHead>Doctor Decision</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {predictionData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>{data.originalImage}</TableCell>
                  <TableCell>{data.predictionImage}</TableCell>
                  <TableCell>{data.modelPrediction}</TableCell>
                  <TableCell>{data.probability}</TableCell>
                  <TableCell>{data.nurse}</TableCell>
                  <TableCell>{data.nurseFeedback}</TableCell>
                  <TableCell>{data.doctor}</TableCell>
                  <TableCell>{data.doctorFeedback}</TableCell>
                  <TableCell>{data.decision}</TableCell>
                  <TableCell><Download className="text-gray-600"/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}