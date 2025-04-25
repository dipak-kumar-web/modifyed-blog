"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="container py-8 flex justify-center items-center min-h-[300px]">
      <div className="text-center space-y-4 max-w-md p-6 border rounded-lg">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="text-muted-foreground">{error.message || "Failed to load posts. Please try again."}</p>
        <Button onClick={reset} className="mt-4">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      </div>
    </div>
  )
}
