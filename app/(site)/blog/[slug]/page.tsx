import { notFound } from "next/navigation";
import Image from "next/image";
import { blogPosts } from "@/lib/data";

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();
  // Create dummy content paragraphs based on excerpt
  const paragraphs = [
    post!.excerpt,
    "Our experts share insights on the latest trends and timeless principles in architecture and interior design. Learn how to integrate sustainable practices with luxury and style, and discover how small changes can make a big impact in your living space.",
    "At Atrium Studio, we believe that every project is a narrative. From the flow of natural light to the selection of materials, each element plays a part in telling your story. Join us as we explore the art and science behind creating spaces that resonate with you.",
  ];
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-semibold">{post!.title}</h1>
      <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 gap-4">
        <span>{post!.category}</span>
        <span>•</span>
        <span>{post!.readingTime}</span>
      </div>
      <div className="relative h-64 rounded-lg overflow-hidden">
        <Image
          src={post!.image}
          alt={post!.title}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
        {paragraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>
    </div>
  );
}