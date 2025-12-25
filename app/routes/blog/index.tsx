import { useState } from "react";
import type { Route } from "./+types/index";
import PostCard from "~/components/PostCard";
import type { PostMeta } from "~/types";
import Pagination from "~/components/Pagination";

export async function loader({request} : Route.LoaderArgs) : Promise<{posts: PostMeta[]}>{
  const url = new URL('/posts-meta.json', request.url)
  const res = await fetch(url.href);

  if(!res.ok) throw new Error('Failed to fetch data');

  const data = await res.json();

  data.sort((a: PostMeta, b: PostMeta) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  })

  return { posts: data };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const { posts } = loaderData as { posts: PostMeta[] };

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  return (
    <section className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900'>
      <h2 className='text-3xl font-bold mb-8 text-white'>📝 Blog</h2>
      {currentPosts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}

      {
        totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )
      }
    </section>
  );
};

export default BlogPage;