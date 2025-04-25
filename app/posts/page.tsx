"use client"

import { useState, useEffect } from "react"
import { getPosts, type Post } from "@/lib/api"
import { PostCard } from "@/components/post-card"
import { Pagination } from "@/components/pagination"
import { Loader2 } from "lucide-react"

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async (page: number) => {
    setIsLoading(true)
    try {
      const { posts, totalPages } = await getPosts(page)
      setPosts(posts)
      setTotalPages(totalPages)
      setError(null)
    } catch (err) {
      setError("Failed to load posts. Please try again later.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts(currentPage)
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center p-8 border rounded-lg bg-red-50 text-red-500">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-center p-8 border rounded-lg">No posts found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  )
}
