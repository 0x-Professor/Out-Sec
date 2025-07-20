import { useRouter } from 'next/router';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const BlogPost = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>{post.title} | Out-Sec Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto">
          {/* Back button */}
          <button 
            onClick={() => router.back()}
            className="flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </button>

          {/* Post header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center text-sm text-gray-400 mb-4">
              <time dateTime={post.date} className="mr-4">
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
              {post.author && (
                <span className="flex items-center mr-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {post.author}
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.categories.map((category, index) => (
                  <span 
                    key={index}
                    className="bg-gradient-to-r from-cyan-500/30 to-purple-600/30 text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-500/30"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured image */}
          {post.image && (
            <div className="mb-12 rounded-xl overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}

          {/* Post content */}
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Author bio */}
          {post.author && (
            <div className="mt-16 pt-8 border-t border-gray-800">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white mr-4">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{post.author}</h3>
                  <p className="text-gray-400">Cybersecurity Expert</p>
                </div>
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
};

export async function getStaticPaths() {
  // Get all markdown files in the posts directory
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const fileNames = fs.readdirSync(postsDirectory);

  // Get the paths we want to pre-render based on posts
  const paths = fileNames.map((fileName) => ({
    params: { id: fileName.replace(/\.md$/, '') },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const postsDirectory = path.join(process.cwd(), 'src/posts');
  const fullPath = path.join(postsDirectory, `${id}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      props: {
        post: {
          id,
          content: matterResult.content,
          ...matterResult.data,
          date: matterResult.data.date ? matterResult.data.date.toString() : null,
        },
      },
      // Re-generate the page at most once per second
      // if a request comes in
      revalidate: 1,
    };
  } catch (error) {
    console.error(`Error reading post ${id}:`, error);
    return {
      notFound: true,
    };
  }
}

export default BlogPost;
