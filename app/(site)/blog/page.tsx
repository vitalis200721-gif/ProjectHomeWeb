import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/data";

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Blog</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="bg-white dark:bg-neutral-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={600}
              height={400}
              className="h-40 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <span className="text-xs uppercase text-accent-olive dark:text-accent-copper mb-2">
                {post.category}
              </span>
              <h3 className="text-lg font-semibold mb-2 flex-grow">
                {post.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                {post.excerpt}
              </p>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-auto">
                {post.readingTime}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
