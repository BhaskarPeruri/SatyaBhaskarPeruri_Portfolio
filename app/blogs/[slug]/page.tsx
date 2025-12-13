import { Header } from "@/components/header";
import { BlogContent } from "@/components/blog-content";
import { blogs } from "@/lib/blog-data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <BlogContent blog={blog} />
      </main>
    </div>
  );
}
