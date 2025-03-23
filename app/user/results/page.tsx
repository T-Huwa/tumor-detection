"use client"

import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import Link from "next/link";

// This I just put it here for typescript typing
interface Case {
    caseId: number;
    modelPrediction: string;
    probability: number;
    yourFeedback: string;
    assignedDoctor: string;
    doctorFeedback: string;
    doctorDecision: string;
    dateTime: string;
  }
  

export default function ResultsPage(){

    const cases: Case[] = [
        {
          caseId: 35,
          modelPrediction: "Meningioma (Tumor)",
          probability: 98.22,
          yourFeedback: "None",
          assignedDoctor: "None",
          doctorFeedback: "None",
          doctorDecision: "None",
          dateTime: "2024-03-01 22:08:48"
        },
        {
          caseId: 36,
          modelPrediction: "Pituitary (Tumor)",
          probability: 100.0,
          yourFeedback: "looks like model is right patient is suffering from Pituitary Tumor. Forwarded for doctor's review",
          assignedDoctor: "akash.mishra@gmail.com",
          doctorFeedback: "Referred for CT Scan and Harmonal Blood test to confirm the tumor",
          doctorDecision: "Pituitary (Tumor)",
          dateTime: "2024-03-02 21:28:30"
        },
        {
          caseId: 37,
          modelPrediction: "Meningioma (Tumor)",
          probability: 100.0,
          yourFeedback: "Looks like Meningioma forwarded to doctor",
          assignedDoctor: "akash.mishra@gmail.com",
          doctorFeedback: "yes it seems meningioma still MRS and PET need to be done for confirmation",
          doctorDecision: "Meningioma (Tumor)",
          dateTime: "2024-03-02 22:33:46"
        },
        {
          caseId: 38,
          modelPrediction: "Glioma (Tumor)",
          probability: 99.99,
          yourFeedback: "forwarded to doctor for review",
          assignedDoctor: "akash.mishra@gmail.com",
          doctorFeedback: "Biopsy need to be done for confirmation of Glioma",
          doctorDecision: "Glioma (Tumor)",
          dateTime: "2024-03-02 22:35:59"
        },
        {
          caseId: 39,
          modelPrediction: "Glioma (Tumor)",
          probability: 100.0,
          yourFeedback: "looks like glioma forwarded for doctor review",
          assignedDoctor: "akash.mishra@gmail.com",
          doctorFeedback: "The model is right need to do Lumbar Puncture and PET scan for confirmation",
          doctorDecision: "Glioma (Tumor)",
          dateTime: "2024-03-03 05:29:18"
        }
      ];

    return(
        <>
            <div className="px-6 py-16 my-6">
                <Table>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Prediction</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Your Feedback</TableHead>
                    <TableHead>Assigned Doctor</TableHead>
                    <TableHead>Doctor Feedback</TableHead>
                    <TableHead>Doctor's Decision</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
                <TableBody>
                    {cases.map((c, i) => (
                    <TableRow key={i}>
                        <TableCell>{c.caseId}</TableCell>
                        <TableCell>{c.modelPrediction}</TableCell>
                        <TableCell>{c.probability}%</TableCell>
                        <TableCell>{c.yourFeedback}</TableCell>
                        <TableCell>{c.assignedDoctor}</TableCell>
                        <TableCell>{c.doctorFeedback}</TableCell>
                        <TableCell>{c.doctorDecision}</TableCell>
                        <TableCell>{c.dateTime}</TableCell>
                        <TableCell>
                        <Link 
                            className="px-3 py-2 rounded-full bg-blue-100 hover:bg-blue-300 text-sm font-light transition-colors"
                            href={`results/${c.caseId}`}
                        >
                            View
                        </Link>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
        </>
    )
}