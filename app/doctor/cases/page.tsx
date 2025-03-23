"use client"

import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import Link from "next/link";

// This I just put it here for typescript typing
interface Case {
    caseId: number;
    modelPrediction: string;
    probability: number;
    doctorFeedback: string;
    approved: string;
    dateTime: string;
  }
  

export default function ResultsPage(){

    const cases: Case[] = [
        {
          caseId: 36,
          modelPrediction: "Pituitary (Tumor)",
          probability: 100.0,
          approved: "akash.mishra@gmail.com",
          doctorFeedback: "Referred for CT Scan and Harmonal Blood test to confirm the tumor",
          dateTime: "2024-03-02 21:28:30"
        },
        {
          caseId: 37,
          modelPrediction: "Meningioma (Tumor)",
          probability: 100.0,
          approved: "akash.mishra@gmail.com",
          doctorFeedback: "yes it seems meningioma still MRS and PET need to be done for confirmation",
          dateTime: "2024-03-02 22:33:46"
        },
        {
          caseId: 39,
          modelPrediction: "Glioma (Tumor)",
          probability: 100.0,
          approved: "akash.mishra@gmail.com",
          doctorFeedback: "The model is right need to do Lumbar Puncture and PET scan for confirmation",
          dateTime: "2024-03-03 05:29:18"
        }
      ];

    return(
        <>
            <div className="px-6 py-16 my-6">
              <h3 className="font-bold text-lg mb-6">
                List of alloted Cases
              </h3>
                <Table>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Model Prediction</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Approved By</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
                <TableBody>
                    {cases.map((c, i) => (
                    <TableRow key={i}>
                        <TableCell>{c.caseId}</TableCell>
                        <TableCell>{c.modelPrediction}</TableCell>
                        <TableCell>{c.probability}%</TableCell>
                        <TableCell>{c.approved}</TableCell>
                        <TableCell>{c.doctorFeedback}</TableCell>
                        <TableCell>{c.dateTime}</TableCell>
                        <TableCell>
                        <Link 
                            className="px-3 py-2 rounded-full bg-blue-100 hover:bg-blue-300 text-sm font-light transition-colors"
                            href={`cases/${c.caseId}`}
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