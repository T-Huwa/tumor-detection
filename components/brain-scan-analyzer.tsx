"use client"

import React, { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, BrainCircuit, FileImage, Loader2, Upload, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select"
import BrainScanSkeleton from "./skeletons/brain-scan-skeleton"

const caseData = {
  patientName: 'P. John',
  age: 54,
  address: '1/A Sandstone area Johannesburg',
  mobile: '987654321',
  aiDiagnosis: 'The brain MRI images, after analysis, indicate abnormal tissue growth or lesion in the specified coordinates, pointing towards a Glioma condition. The size and area of the lesion suggest a significantly progressed stage of the disease.',
  recommendedTests: 'Spinal Tap (Lumbar Puncture) to check for tumor cells in the cerebrospinal fluid, and a PET scan for detailed imaging.',
  mriImage: '/mri.jpg',
  camImage: '/cam.jpg',
  scans: [
    { id: 1, prediction: 'Glioma', diseaseType: 'Brain Tumor', confidence: 95 },
    { id: 2, prediction: 'Meningioma', diseaseType: 'Brain Tumor', confidence: 85 },
    { id: 3, prediction: 'Pituitary', diseaseType: 'Brain Tumor', confidence: 75 },
    { id: 4, prediction: 'Glioma', diseaseType: 'Brain Tumor', confidence: 95 },
  ]
}

export default function BrainScanAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    handleSelectedFile(selectedFile)
  }

  const handleSelectedFile = (selectedFile: File | null) => {
    setError(null)
    setResult(null)

    if (!selectedFile) {
      setFile(null)
      setPreview(null)
      return
    }

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp", "image/tiff"]
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload a valid image file (JPEG, PNG, GIF, BMP, TIFF)")
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setFile(selectedFile)
    setPreview(objectUrl)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleAnalyze = async () => {
    scrollTo(0, 0)
    setIsAnalyzing(true)
    setTimeout(() => {
      setResult(!result);
      setIsAnalyzing(false);
    }, 5000)
    // if (!file) return
    // setIsAnalyzing(true)
    // setError(null)

    // try {
    //   const formData = new FormData()
    //   formData.append("image", file)

    //   const response = await fetch("https://your-flask-backend.vercel.app/analyze", {
    //     method: "POST",
    //     body: formData,
    //   })

    //   if (!response.ok) throw new Error(`Analysis failed: ${response.statusText}`)

    //   const data = await response.json()
    //   setResult(data)
    // } catch (err) {
    //   setError("Failed to analyze. Showing simulated data.")
    //   setTimeout(() => {
    //     setResult({
    //       tumorDetected: Math.random() > 0.5,
    //       confidence: Math.round(Math.random() * 100),
    //       region: "Frontal lobe",
    //       additionalNotes: "Simulated result for demo.",
    //     })
    //   }, 2000)
    // } finally {
    //   setIsAnalyzing(false)
    // }
  }

  return (
    <div className="p-2 md:p-6 min-w-xl">
      
      {!result && !isAnalyzing && (
              <Card className="w-full max-w-2xl mx-auto bg-white shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="text-xl text-blue-900 flex items-center">
                  <BrainCircuit className="mr-2 h-5 w-5" />
                  Brain Scan Analysis
                </CardTitle>
                <CardDescription className="text-blue-700">Upload a brain scan image</CardDescription>
              </CardHeader>
      
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Patient Details</h3>
                  <input type="text" placeholder="Patient Name" className="w-full border p-3 rounded-md" />
                  <input type="number" placeholder="Patient Age" className="w-full border p-3 rounded-md" />
                  <textarea placeholder="Address" className="w-full border p-3 rounded-md" rows={3}></textarea>
                  <input type="text" placeholder="Enter mobile number" className="w-full border p-3 rounded-md" />
                </div>
      
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Upload Brain Scan Image</label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      preview ? "border-blue-300 bg-blue-50" : "border-gray-300 hover:border-blue-400"
                    } transition-colors cursor-pointer`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    {!preview ? (
                      <div className="space-y-3">
                        <div className="flex justify-center">
                          <FileImage className="h-12 w-12 text-blue-400" />
                        </div>
                        <p className="text-sm font-medium text-blue-900">
                          Drag and drop your brain scan image, or click to browse
                        </p>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="relative aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-md">
                          <Image src={preview || "/placeholder.svg"} alt="Brain scan preview" fill className="object-cover" />
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveFile()
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
      
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-800 text-sm">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {error}
                  </div>
                )}
      
                <Button onClick={handleAnalyze} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Upload className="mr-2 h-4 w-4" />
                  Predict
                </Button>
      
              </CardContent>
            </Card>
      )}

      {isAnalyzing && !result && (
        <div className="mt-6 text-center">
          <div className="flex justify-center mb-4">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          </div>
          <p className="text-blue-800 font-medium">Analyzing brain scan...</p>
          <p className="text-blue-600 text-sm mt-1">This may take a few moments</p>
          <BrainScanSkeleton/>
        </div>
        
      )}

      {result && !isAnalyzing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="border rounded p-4 shadow">
            <CardHeader className="font-semibold text-lg">Patient Original MRI Image</CardHeader>
            <CardContent className="mt-4">
              <Image
                src={'/placeholder.svg'}
                alt="MRI Image"
                width={200}
                height={200}
                className="rounded object-cover"
              />
            </CardContent>
          </Card>

          <Card className="border rounded p-4 shadow">
            <CardHeader className="font-semibold text-lg">Model Prediction (CAM)</CardHeader>
            <CardContent className="mt-4">
              <Image
                src={'/placeholder.svg'}
                alt="CAM Image"
                width={200}
                height={200}
                className="rounded object-cover"
              />
            </CardContent>
          </Card>

          <Card className="border rounded p-4 shadow">
            <CardHeader className="font-semibold text-lg">AI Medical Diagnosis</CardHeader>
            <CardContent className="mt-4 text-gray-700">
              {caseData.aiDiagnosis}
            </CardContent>
          </Card>

          <Card className="border rounded p-4 shadow">
            <CardHeader className="font-semibold text-lg">Recommended Tests</CardHeader>
            <CardContent className="mt-4 text-gray-700">
              {caseData.recommendedTests}
            </CardContent>
          </Card>

          <Card className="border rounded p-4 shadow">
            <CardHeader className="font-semibold text-lg">Model Result Table</CardHeader>
            <CardContent className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scan #</TableHead>
                    <TableHead>Prediction</TableHead>
                    <TableHead>Disease Type</TableHead>
                    <TableHead>Confidence (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {caseData.scans.map((scan) => (
                    <TableRow key={scan.id}>
                      <TableCell>{scan.id}</TableCell>
                      <TableCell>{scan.prediction}</TableCell>
                      <TableCell>{scan.diseaseType}</TableCell>
                      <TableCell>{scan.confidence}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="border rounded p-4 shadow">
            <CardHeader className="font-semibold text-lg">Diagnosis</CardHeader>
            <CardContent className="mt-4">
              <form action="">
                <div className="form-control">
                  <Label>Feedback</Label>
                  <Input type="text" placeholder="Enter Feedback" />
                </div>
                <div className="form-control my-4">
                  <Label>Allot Case</Label>
                  <Select name="specialist">
                    <SelectTrigger aria-placeholder='Select a specialist' />
                    <SelectContent>
                      <SelectItem value="1">Dr. John Doe</SelectItem>
                      <SelectItem value="2">Dr. Jane Doe</SelectItem>
                      <SelectItem value="3">Dr. James Doe</SelectItem>
                      <SelectItem value="4">Dr. Janet Doe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className='mt-2' type="submit">Submit</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
