import { getPageBySlug } from "@/lib/api"
import { notFound } from "next/navigation"
import { Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PagePageProps {
  params: {
    slug: string
  }
}

export default async function PagePage({ params }: PagePageProps) {
  const page = await getPageBySlug(params.slug)

  if (!page) {
    notFound()
  }

  const formattedDate = new Date(page.date).toLocaleDateString()

  return (
    <div className="container py-8 max-w-4xl">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/pages" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Pages
        </Link>
      </Button>

      <article>
        <h1 className="text-3xl md:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: page.title.rendered }} />

        <div className="flex items-center text-muted-foreground mb-6">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{formattedDate}</span>
        </div>

        <div
          className="prose prose-slate max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />
      </article>
    </div>
  )
}
