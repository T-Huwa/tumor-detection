"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { TriangleAlert } from "lucide-react";

interface CaseFormData {
  id: number;
  doctorFeedback: string;
  doctorDecision: string;
}

const CaseForm = ({
  caseData,
  isEditable = false,
  setLoading,
  token,
  isExporting = false,
}: {
  caseData: CaseFormData;
  isEditable: boolean;
  setLoading: any;
  token: string;
  isExporting: boolean;
}) => {
  const [message, setMessage] = useState("");
  const [decision, setDecision] = useState(caseData.doctorDecision || "");
  const [feedback, setFeedback] = useState(caseData.doctorFeedback || "");

  //console.log(caseData);

  const handleSubmit = async () => {
    setLoading(true);
    console.log(
      JSON.stringify({
        feedback: feedback,
        decision: decision,
      })
    );
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/cases/doctor-feedback/${caseData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            feedback: feedback,
            decision: decision,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);

        throw new Error(errorData.detail || "Failed to submit doctor feedback");
      }

      const result = await response.json();
      //console.log("Feedback submitted successfully:", result);
      setMessage("Submitted Successfully!");
    } catch (error: any) {
      //console.error("Error submitting doctor feedback:", error?.message);
      setMessage("Failed to Submit Feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border rounded p-4 shadow">
      <CardHeader className="font-semibold text-lg">Diagnosis</CardHeader>
      {message && (
        <div className="mb-4 p-3 bg-green-50 border border-red-200 rounded-md flex items-center text-green-800 text-sm">
          <TriangleAlert className="h-4 w-4 mr-2 flex-shrink-0" />
          {message}
        </div>
      )}
      <CardContent className="mt-4">
        <form>
          <div className="form-control my-6">
            <Label className="absolute translate-y-[-11px] translate-x-[7px] bg-white p-1">
              Doctor's Feedback
            </Label>
            <Textarea
              disabled={!isEditable}
              onChange={(e) => setFeedback(e.target.value)}
              className="border rounded-md p-3 my-2 text-gray-600"
              value={feedback}
            />
          </div>

          <div className="form-control my-6">
            <Label className="absolute translate-y-[-11px] translate-x-[7px] bg-white p-1">
              Doctor's Decision
            </Label>
            <Input
              type="text"
              disabled={!isEditable}
              onChange={(e) => setDecision(e.target.value)}
              value={decision}
              className="border rounded-md p-3 my-2 text-gray-600"
            />
          </div>

          {isEditable && !isExporting && (
            <Button type="button" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default CaseForm;
