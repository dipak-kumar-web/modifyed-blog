import { getPostBySlug } from "@/lib/api"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PostPageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params?.slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post?.date).toLocaleDateString()
  const featuredImage = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url

  return (
    <div className="container py-8 max-w-4xl">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/posts" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Link>
      </Button>

      <article>
        <h1 className="text-3xl md:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: post?.title?.rendered }} />

        <div className="flex items-center text-muted-foreground mb-6">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{formattedDate}</span>
        </div>

        {featuredImage && (
          <div className="mb-8 relative w-full h-[400px] overflow-hidden rounded-lg">
            <Image
              src={featuredImage || "/placeholder.svg"}
              alt={post.title.rendered}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-slate max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </div>
  )
}
