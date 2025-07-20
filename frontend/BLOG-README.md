# Blog System Documentation

This document explains how to manage blog posts on the Out-Sec website.

## Adding a New Blog Post

1. **Create a new markdown file** in the `src/posts/` directory.
   - Use a descriptive filename in kebab-case (e.g., `my-awesome-post.md`)
   - You can copy the `TEMPLATE.md` file as a starting point

2. **Add frontmatter** at the top of your markdown file:
   ```yaml
   ---
   title: "Your Blog Post Title"
   date: "YYYY-MM-DD"  # Use the current date or publication date
   author: "Your Name"
   categories: ["category1", "category2"]  # Add relevant categories
   excerpt: "A brief summary of your blog post"
   image: "/path/to/image.jpg"  # Optional: Add path to your image
   featured: false  # Set to true to highlight this post
   ---
   ```

3. **Write your content** using Markdown syntax below the frontmatter.
   - Use headings, lists, code blocks, images, etc.
   - Reference the `TEMPLATE.md` for examples

4. **Save the file** - The blog post will be automatically included in the blog listing.

## Features

- **Categories**: Add categories to your posts for better organization
- **Featured Posts**: Mark important posts as `featured: true` to highlight them
- **Search**: Users can search through all blog posts
- **Responsive**: Works on all device sizes

## Image Guidelines

- Store images in the `public/images/blog/` directory
- Use descriptive filenames (e.g., `cyber-threat-landscape-2025.jpg`)
- Recommended size: 1200x630px for featured images
- Optimize images before uploading

## Previewing Posts

1. Run the development server:
   ```bash
   npm run dev
   ```
2. Visit `http://localhost:3000/blog` to see all posts
3. Click on your new post to view it

## Deployment

- New posts will be automatically included in the next build
- The blog supports Incremental Static Regeneration (ISR) for fast updates

## Troubleshooting

- If a post doesn't appear, check for syntax errors in the frontmatter
- Ensure the file has a `.md` extension
- Check the browser console for any errors

For any issues, please refer to the documentation or contact the development team.
