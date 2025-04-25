import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container py-8 flex justify-center items-center min-h-[300px]">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-muted-foreground">Loading pages...</p>
      </div>
    </div>
  )
}
