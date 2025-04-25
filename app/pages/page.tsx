"use client"

import { useState, useEffect } from "react"
import { getPages, type Page } from "@/lib/api"
import { PageCard } from "@/components/page-card"
import { Pagination } from "@/components/pagination"
import { Loader2 } from "lucide-react"

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPages = async (page: number) => {
    setIsLoading(true)
    try {
      const { pages, totalPages } = await getPages(page)
      setPages(pages)
      setTotalPages(totalPages)
      setError(null)
    } catch (err) {
      setError("Failed to load pages. Please try again later.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPages(currentPage)
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Modifyed Pages</h1>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center p-8 border rounded-lg bg-red-50 text-red-500">{error}</div>
      ) : pages.length === 0 ? (
        <div className="text-center p-8 border rounded-lg">No pages found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <PageCard key={page.id} page={page} />
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  )
}
