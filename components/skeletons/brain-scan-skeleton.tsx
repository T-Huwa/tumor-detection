"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function BrainScanSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
    <Card className="border rounded p-4 shadow animate-pulse">
      <CardHeader className="font-semibold text-lg">Patient Original MRI Image</CardHeader>
      <CardContent className="mt-4">
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </CardContent>
    </Card>

    <Card className="border rounded p-4 shadow">
      <CardHeader className="font-semibold text-lg">Model Prediction (CAM)</CardHeader>
      <CardContent className="mt-4">
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </CardContent>
    </Card>

    <Card className="border rounded p-4 shadow">
      <CardHeader className="font-semibold text-lg">AI Medical Diagnosis</CardHeader>
      <CardContent className="mt-4 text-gray-700">
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
      </CardContent>
    </Card>

    <Card className="border rounded p-4 shadow">
      <CardHeader className="font-semibold text-lg">Recommended Tests</CardHeader>
      <CardContent className="mt-4 text-gray-700">
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
      </CardContent>
    </Card>

    <Card className="border rounded p-4 shadow">
      <CardHeader className="font-semibold text-lg">Model Result Table</CardHeader>
      <CardContent className="mt-4">
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
      </CardContent>
    </Card>

    <Card className="border rounded p-4 shadow">
      <CardHeader className="font-semibold text-lg">Diagnosis</CardHeader>
      <CardContent className="mt-4">
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
      </CardContent>
    </Card>
  </div>
  )
}
