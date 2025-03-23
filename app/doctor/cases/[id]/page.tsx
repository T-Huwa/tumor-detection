import * as Tabs from '@radix-ui/react-tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import React from 'react';
import CaseForm from '@/components/case-form';

const caseData = {
  patientName: 'P. John',
  age: 54,
  address: '1/A Sandstone area Johannesburg',
  mobile: '987654321',
  aiDiagnosis: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quis ipsam vero voluptatum sed eum id animi repellendus ipsa ratione.',
  recommendedTests: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, consequatur natus quibusdam accusantium eligendi itaque quasi, ea id at sed nihil magnam veniam hic dolor repellendus in culpa ratione a? Quam ea sapiente aut, ex provident illum dicta quasi optio.',
  mriImage: '/placeholder.svg?height=200&width=200',
  camImage: '/placeholder.svg?height=200&width=200',
  scans: [
    { id: 1, prediction: 'Glioma', diseaseType: 'Brain Tumor', confidence: 95 },
    { id: 2, prediction: 'Meningioma', diseaseType: 'Brain Tumor', confidence: 85 },
    { id: 4, prediction: 'Glioma', diseaseType: 'Brain Tumor', confidence: 95 },
  ],
  nurseFeedback: "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
  doctorFeedback: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, ipsum?",
  doctorDecision: "Giloma (Tumor)",
};

export default async function CaseDetail({params,} : {params: Promise<{id: string}>}) {
  const { id } = await params;

  const CaseFormData = {
        id: parseInt(id),
        nurseFeedback: caseData.nurseFeedback,
        doctorFeedback: caseData.doctorFeedback,
        doctorDecision: caseData.doctorDecision,
    }

  return (
    <main className="px-6 py-16">
      <h1 className="text-2xl font-semibold mb-4">Patient Case History - ID {id}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border rounded p-4 shadow">
          <CardHeader className="font-semibold text-lg">Patient Details</CardHeader>
          <CardContent className="mt-2 space-y-1">
            <p><strong>Name:</strong> {caseData.patientName}</p>
            <p><strong>Age:</strong> {caseData.age}</p>
            <p><strong>Address:</strong> {caseData.address}</p>
            <p><strong>Mobile:</strong> {caseData.mobile}</p>
          </CardContent>
        </Card>

        <Card className="border rounded p-4 shadow">
          <CardHeader className="font-semibold text-lg">Diagnosis Information</CardHeader>
          <Tabs.Root defaultValue="ai">
            <Tabs.List className="flex space-x-4 mt-2">
              <Tabs.Trigger value="ai" className="px-3 py-1 border rounded">AI Diagnosis</Tabs.Trigger>
              <Tabs.Trigger value="test" className="px-3 py-1 border rounded">Recommended Tests</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="ai" className="mt-3">
              {caseData.aiDiagnosis}
            </Tabs.Content>
            <Tabs.Content value="test" className="mt-3">
              {caseData.recommendedTests}
            </Tabs.Content>
          </Tabs.Root>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="border rounded p-4 shadow">
          <CardHeader className="font-semibold text-lg">Patient Original MRI Image</CardHeader>
          <CardContent className="mt-4">
            <Image width={200} height={200} src={caseData.mriImage} alt="MRI Image" className="w-full rounded" />
          </CardContent>
        </Card>

        <Card className="border rounded p-4 shadow">
          <CardHeader className="font-semibold text-lg">Model Prediction (Class Activation Map)</CardHeader>
          <CardContent className="mt-4">
            <Image width={200} height={200} src={caseData.camImage} alt="CAM Image" className="w-full rounded" />
          </CardContent>
        </Card>

        <Card className="border rounded p-4 shadow">
          <CardHeader className="font-semibold text-lg">Model Result</CardHeader>
          <CardContent className="mt-4">
            <Table>
              <TableRow>
                <TableHead>Scan #</TableHead>
                <TableHead>Prediction</TableHead>
                <TableHead>Disease Type</TableHead>
                <TableHead>Confidence (%)</TableHead>
              </TableRow>
              <TableBody>
                {caseData.scans.map((scan) => (
                  <TableRow key={scan.id}>
                    <TableCell>{scan.id}</TableCell>
                    <TableCell>{scan.prediction}</TableCell>
                    <TableCell>{scan.diseaseType}</TableCell>
                    <TableCell>{scan.confidence}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <CaseForm caseData={CaseFormData} isEditable={true}/>
      </div>
    </main>
  );
}
