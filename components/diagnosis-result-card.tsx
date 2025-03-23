import { CheckCircle2, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface DiagnosisResultCardProps {
  detected: boolean
  confidence: number
  details?: {
    region?: string
    size?: string
    type?: string
    recommendation?: string
  }
  timestamp?: string
}

export function DiagnosisResultCard({
  detected,
  confidence,
  details,
  timestamp = new Date().toLocaleString(),
}: DiagnosisResultCardProps) {
  // Format confidence as percentage
  const confidencePercent = Math.round(confidence * 100)

  return (
    <Card className={`overflow-hidden ${detected ? "border-red-200" : "border-green-200"}`}>
      <div className={`h-2 w-full ${detected ? "bg-red-500" : "bg-green-500"}`} />

      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-blue-900">Diagnosis Result</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Status */}
          <div
            className={`flex items-center justify-between p-4 rounded-lg ${
              detected
                ? "bg-red-50 text-red-800 border border-red-100"
                : "bg-green-50 text-green-800 border border-green-100"
            }`}
          >
            <div className="flex items-center">
              {detected ? (
                <AlertTriangle className="h-6 w-6 mr-3 text-red-500" />
              ) : (
                <CheckCircle2 className="h-6 w-6 mr-3 text-green-500" />
              )}
              <span className="font-bold text-lg">{detected ? "Tumor Detected" : "No Tumor Detected"}</span>
            </div>
            <div className="text-sm font-medium opacity-80">
              ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </div>
          </div>

          {/* Confidence */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-blue-800">Confidence</div>
              <div
                className={`font-bold ${
                  detected
                    ? confidencePercent > 80
                      ? "text-red-600"
                      : "text-red-500"
                    : confidencePercent > 80
                      ? "text-green-600"
                      : "text-green-500"
                }`}
              >
                {confidencePercent}%
              </div>
            </div>
            <Progress
              value={confidencePercent}
              className={`h-2 ${detected ? "bg-red-100" : "bg-green-100"}`}
              indicatorClassName={`${detected ? "bg-red-500" : "bg-green-500"}`}
            />
          </div>

          {/* Details */}
          {details && (
            <div className="space-y-3 pt-3 border-t border-gray-200">
              <h4 className="font-medium text-blue-900 flex items-center">
                <Info className="h-4 w-4 mr-1" />
                Diagnostic Details
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {details.region && (
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="text-xs text-blue-600 mb-1">Region</div>
                    <div className="text-sm font-medium text-blue-900">{details.region}</div>
                  </div>
                )}

                {details.size && (
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="text-xs text-blue-600 mb-1">Size</div>
                    <div className="text-sm font-medium text-blue-900">{details.size}</div>
                  </div>
                )}

                {details.type && (
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="text-xs text-blue-600 mb-1">Type</div>
                    <div className="text-sm font-medium text-blue-900">{details.type}</div>
                  </div>
                )}
              </div>

              {details.recommendation && (
                <div className="bg-amber-50 p-3 rounded-md border border-amber-100 mt-3">
                  <div className="text-xs text-amber-700 mb-1">Recommendation</div>
                  <div className="text-sm text-amber-900">{details.recommendation}</div>
                </div>
              )}
            </div>
          )}

          {/* Timestamp */}
          <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">Analysis completed: {timestamp}</div>
        </div>
      </CardContent>
    </Card>
  )
}

