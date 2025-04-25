import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import type { Page } from "@/lib/api"
import { Button } from "@/components/ui/button"

interface PageCardProps {
  page: Page
}

export function PageCard({ page }: PageCardProps) {
  const formattedDate = new Date(page.date).toLocaleDateString()

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">
          {/* This Link navigates to the individual page when clicked */}
          <Link href={`/pages/${page.slug}`} className="hover:underline">
            <span dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
          </Link>
        </CardTitle>
      </CardHeader>
      {/* Rest of component... */}
      <CardContent className="pb-2 flex-grow">
        <div
          className="line-clamp-3 text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: page.content.rendered.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
          }}
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
        <Button asChild size="sm">
          <Link href={`/pages/${page.slug}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
