// WordPress API functions

export interface Post {
  id: number
  date: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  slug: string
  featured_media: number
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string
    }>
  }
}

export interface Page {
  id: number
  date: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  slug: string
}

const API_URL = "https://demo.modifyed.xyz/wp-json/wp/v2"

export async function getPosts(page = 1, perPage = 10): Promise<{ posts: Post[]; totalPages: number }> {
  try {
    const response = await fetch(`${API_URL}/posts?_embed=wp:featuredmedia&page=${page}&per_page=${perPage}`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`)
    }

    const posts = await response.json()
    const totalPages = Number.parseInt(response.headers.get("X-WP-TotalPages") || "1", 10)

    return { posts, totalPages }
  } catch (error) {
    console.error("Error fetching posts:", error)
    return { posts: [], totalPages: 0 }
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(`${API_URL}/posts?slug=${slug}&_embed=wp:featuredmedia`, { next: { revalidate: 60 } })

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`)
    }

    const posts = await response.json()
    console.log("Fetched posts:", posts)
    return posts.length > 0 ? posts[0] : null
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}

export async function getPages(page = 1, perPage = 10): Promise<{ pages: Page[]; totalPages: number }> {
  try {
    const response = await fetch(`${API_URL}/pages?page=${page}&per_page=${perPage}`, { next: { revalidate: 60 } })

    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.status}`)
    }

    const pages = await response.json()
    const totalPages = Number.parseInt(response.headers.get("X-WP-TotalPages") || "1", 10)

    return { pages, totalPages }
  } catch (error) {
    console.error("Error fetching pages:", error)
    return { pages: [], totalPages: 0 }
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await fetch(`${API_URL}/pages?slug=${slug}`, { next: { revalidate: 60 } })

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status}`)
    }

    const pages = await response.json()
    return pages.length > 0 ? pages[0] : null
  } catch (error) {
    console.error("Error fetching page:", error)
    return null
  }
}
