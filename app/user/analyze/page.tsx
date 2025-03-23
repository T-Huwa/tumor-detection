import BrainScanAnalyzer from "@/components/brain-scan-analyzer";

export default function AnalyzePage() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">Brain Tumor Detection Analysis</h1>

      <div>
        <BrainScanAnalyzer />
      </div>
    </div>
  )
}

