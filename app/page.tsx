import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Newspaper } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Modifyed Blog</h1>
      <p className="mt-6 text-xl text-muted-foreground max-w-3xl">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi, ipsam impedit reprehenderit vitae minus eos dolore, unde ex, asperiores animi aliquam labore. Iste aspernatur aliquam sit vero necessitatibus blanditiis enim magni harum impedit provident non, repellat suscipit error, dignissimos qui, dolorum laboriosam quis beatae! Nulla aspernatur distinctio est asperiores mollitia.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/posts" className="flex items-center">
            <Newspaper className="mr-2 h-5 w-5" />
            View Posts
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/pages" className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            View Pages
          </Link>
        </Button>
      </div>
    </div>
  )
}
