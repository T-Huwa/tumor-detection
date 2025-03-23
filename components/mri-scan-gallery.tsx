"use client"

import { useState } from "react"
import { Eye, Calendar, User } from "lucide-react"

const mriScans = [
  {
    id: 1,
    imageUrl: "/placeholder.svg?height=300&width=300",
    patientId: "PT-10234",
    date: "2025-03-12",
    hasAbnormality: true,
  },
  {
    id: 2,
    imageUrl: "/placeholder.svg?height=300&width=300",
    patientId: "PT-10542",
    date: "2025-03-10",
    hasAbnormality: false,
  },
  {
    id: 3,
    imageUrl: "/placeholder.svg?height=300&width=300",
    patientId: "PT-10876",
    date: "2025-03-08",
    hasAbnormality: true,
  },
  {
    id: 4,
    imageUrl: "/placeholder.svg?height=300&width=300",
    patientId: "PT-10901",
    date: "2025-03-05",
    hasAbnormality: false,
  },
  {
    id: 5,
    imageUrl: "/placeholder.svg?height=300&width=300",
    patientId: "PT-11023",
    date: "2025-03-01",
    hasAbnormality: true,
  },
  {
    id: 6,
    imageUrl: "/placeholder.svg?height=300&width=300",
    patientId: "PT-11045",
    date: "2025-02-28",
    hasAbnormality: false,
  },
  {
    id: 7,
    imageUrl: "/placeholder.svg?height=300&width=300",
    patientId: "PT-11102",
    date: "2025-02-25",
    hasAbnormality: true,
  },
]

export function MriScanGallery() {
  const [selectedScan, setSelectedScan] = useState<number | null>(null)

  const handleViewAnalysis = (id: number) => {
    setSelectedScan(id)
    console.log(`Viewing analysis for scan ${id}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="w-full bg-blue-50 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-blue-900">Uploaded MRI Scans</h2>
        <span className="text-sm text-blue-600">{mriScans.length} scans available</span>
      </div>

      {/* Scrollable container */}
      <div className="overflow-x-auto pb-4 -mx-2">
        <div className="flex space-x-4 px-2">
          {mriScans.map((scan) => (
            <div key={scan.id} className="flex-shrink-0 w-48 group">
              <div
                className="relative overflow-hidden rounded-lg shadow-md bg-white"
                onClick={() => handleViewAnalysis(scan.id)}
              >
                {/* Image with zoom effect */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={scan.imageUrl || "/placeholder.svg"}
                    alt={`Brain MRI Scan for patient ${scan.patientId}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-blue-900/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="px-3 py-2 bg-amber-500 text-white rounded-md flex items-center text-sm font-medium hover:bg-amber-600 transition-colors">
                    <Eye className="w-4 h-4 mr-1" />
                    View Analysis
                  </button>
                </div>

                {/* Abnormality indicator */}
                {scan.hasAbnormality && (
                  <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
                )}
              </div>

              {/* Metadata below image */}
              <div className="mt-2 px-1">
                <div className="flex items-center text-xs text-blue-800">
                  <User className="w-3 h-3 mr-1" />
                  <span>{scan.patientId}</span>
                </div>
                <div className="flex items-center text-xs text-blue-600 mt-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{formatDate(scan.date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center mt-2">
        <div className="flex space-x-1">
          {mriScans.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full ${index === 0 ? "bg-blue-500" : "bg-blue-200"}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

