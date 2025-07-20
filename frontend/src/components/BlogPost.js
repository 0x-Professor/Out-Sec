import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet';

// Path to markdown files in the public directory
const POSTS_DIR = '/posts/';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        
        // Fetch the markdown file from the public directory
        const response = await fetch(`${POSTS_DIR}${id}.md`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        
        const text = await response.text();
        
        // Parse the markdown content
        const matterResult = parseMarkdown(text);
        setPost({
          id,
          content: matterResult.content,
          ...matterResult.data,
          date: matterResult.data.date ? new Date(matterResult.data.date).toISOString() : new Date().toISOString(),
        });
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Simple markdown parser that extracts frontmatter and content
  const parseMarkdown = (content) => {
    const lines = content.split('\n');
    
    // Check if content has frontmatter (starts with ---)
    if (lines[0] === '---') {
      const frontmatterEnd = lines.slice(1).findIndex(line => line === '---') + 1;
      if (frontmatterEnd > 0) {
        const frontmatter = {};
        const frontmatterLines = lines.slice(1, frontmatterEnd);
        
        frontmatterLines.forEach(line => {
          const match = line.match(/^([^:]+):\s*(.*)$/);
          if (match) {
            const key = match[1].trim().toLowerCase();
            let value = match[2].trim();
            
            // Parse arrays (for categories, tags, etc.)
            if (value.startsWith('[') && value.endsWith(']')) {
              value = value
                .slice(1, -1)
                .split(',')
                .map(item => item.trim().replace(/['"]/g, ''))
                .filter(Boolean);
            }
            
            frontmatter[key] = value;
          }
        });
        
        return {
          data: frontmatter,
          content: lines.slice(frontmatterEnd + 1).join('\n')
        };
      }
    }
    
    // If no frontmatter, return the whole content
    return {
      data: {},
      content: content
    };
    const frontMatter = {};
    let contentStart = 0;
    
    if (lines[0] === '---') {
      for (let i = 1; i < lines.length; i++) {
        if (lines[i] === '---') {
          contentStart = i + 1;
          break;
        }
        const [key, ...value] = lines[i].split(':');
        frontMatter[key.trim()] = value.join(':').trim().replace(/^['"]|['"]$/g, '');
      }
    }
    
    return {
      data: frontMatter,
      content: lines.slice(contentStart).join('\n')
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center p-8 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-300 mb-6">The requested blog post could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
      <Helmet>
        <title>{post.title} | Out-Sec Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.image && <meta property="og:image" content={post.image} />}
      </Helmet>
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{post.title}</h1>
          <div className="flex items-center text-gray-400 text-sm mb-4">
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          {post.categories && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="bg-gradient-to-r from-cyan-500/30 to-purple-600/30 text-cyan-300 px-3 py-1 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}

// Helper function to get all posts (for future use)
// In a real app, this would fetch from your API
async function getAllPosts() {
  try {
    const response = await fetch('/posts.json');
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Helper function to get a single post by ID (for future use)
async function getPostById(id) {
  try {
    const response = await fetch(`${POSTS_DIR}${id}.md`);
    if (!response.ok) return null;
    
    const text = await response.text();
    const matterResult = parseMarkdown(text);
    
    return {
      id,
      content: matterResult.content,
      ...matterResult.data,
      date: matterResult.data.date || new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
