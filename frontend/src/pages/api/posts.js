import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export default function handler(req, res) {
  try {
    // Get all markdown files in the posts directory
    const fileNames = fs.readdirSync(postsDirectory);
    
    // Get the data from each file
    const posts = fileNames.map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        ...matterResult.data,
        // Add a formatted date
        date: matterResult.data.date || new Date().toISOString().split('T')[0],
        // Ensure categories is an array
        categories: matterResult.data.categories || [],
        // Add a default excerpt if not provided
        excerpt: matterResult.data.excerpt || matterResult.content.substring(0, 100) + '...',
        // Add a default image if not provided
        image: matterResult.data.image || '/images/blog-placeholder.jpg'
      };
    });

    // Sort posts by date
    const sortedPosts = posts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    // Return the posts data
    res.status(200).json(sortedPosts);
  } catch (error) {
    console.error('Error reading posts:', error);
    res.status(500).json({ error: 'Failed to load posts' });
  }
}
