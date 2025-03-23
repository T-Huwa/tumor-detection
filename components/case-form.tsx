"use client"

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React from 'react';

interface CaseFormData {
    id: number,
    nurseFeedback: string
    doctorFeedback: string,
    doctorDecision: string,
  };

const CaseForm = ({caseData, isEditable = false} : {caseData : CaseFormData, isEditable: boolean}) => {

    const handleSubmit = (e : any) => {
     e.preventDefault()
     alert("Submitting...")
    }

    return ( 
        <Card className="border rounded p-4 shadow">
        <CardHeader className="font-semibold text-lg">Diagnosis</CardHeader>
        <CardContent className="mt-4">
          <form>
            <div className="form-control my-6">
              <Label className='absolute translate-y-[-11px] translate-x-[7px] bg-white p-1'>Nurse's Feedback</Label>
              <Input type='text' disabled={!isEditable} value={caseData.nurseFeedback} className="border rounded-md p-3 my-2 text-gray-600" />
            </div>

            <div className="form-control my-6">
              <Label className='absolute translate-y-[-11px] translate-x-[7px] bg-white p-1'>Doctor's Feedback</Label>
              <Input type='text' disabled={!isEditable} value={caseData.doctorFeedback} className="border rounded-md p-3 my-2 text-gray-600" />
            </div>

            <div className="form-control my-6">
              <Label className='absolute translate-y-[-11px] translate-x-[7px] bg-white p-1'>Doctor's Decision</Label>
              <Input type='text' disabled={!isEditable} value={caseData.doctorDecision} className="border rounded-md p-3 my-2 text-gray-600" />
            </div>

            {isEditable && <Button type='button' onClick={handleSubmit}>Submit</Button>}

          </form>

        </CardContent>
      </Card>
     );
}
 
export default CaseForm;