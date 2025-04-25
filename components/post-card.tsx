import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import type { Post } from "@/lib/api"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post?.date).toLocaleDateString()
  const featuredImage = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">
          <Link href={`/posts/${post.slug}`} className="hover:underline">
            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </Link>
        </CardTitle>
      </CardHeader>
      {featuredImage && (
        <div className="px-6 pb-2">
          <div className="relative w-full h-48 overflow-hidden rounded-md">
            <Image src={featuredImage || "/placeholder.svg"} alt={post.title.rendered} fill className="object-cover" />
          </div>
        </div>
      )}
      <CardContent className="pb-2 flex-grow">
        <div
          className="line-clamp-3 text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
        <Button asChild size="sm">
          <Link href={`/posts/${post.slug}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
