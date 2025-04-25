import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Home, Newspaper } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span className="font-bold">Modifyed Blog</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild variant="ghost">
              <Link href="/posts" className="flex items-center">
                <Newspaper className="mr-2 h-4 w-4" />
                Posts
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/pages" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Pages
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
