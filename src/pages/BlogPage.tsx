import React, { useState } from 'react';
import { format } from 'date-fns';
import type { BlogPost } from '../types';

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web3: Beyond the Hype',
    excerpt: 'Exploring the real-world applications and potential impact of Web3 technologies on various industries.',
    content: 'Full article content here...',
    author: {
      name: 'Alex Thompson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      role: 'Web3 Architect'
    },
    category: 'Web3',
    tags: ['Blockchain', 'DeFi', 'NFTs'],
    publishedAt: '2025-01-15T10:00:00Z',
    readTime: 8,
    imageUrl: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg'
  },
  {
    id: '2',
    title: 'Building Immersive Metaverse Experiences',
    excerpt: 'A deep dive into the technologies and design principles behind successful metaverse projects.',
    content: 'Full article content here...',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      role: 'Metaverse Designer'
    },
    category: 'Metaverse',
    tags: ['Virtual Reality', 'Gaming', 'Social'],
    publishedAt: '2025-01-10T14:30:00Z',
    readTime: 12,
    imageUrl: 'https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg'
  },
  {
    id: '3',
    title: 'AI Integration in Modern Web Applications',
    excerpt: 'Learn how to leverage AI capabilities to enhance user experiences and automate processes.',
    content: 'Full article content here...',
    author: {
      name: 'Marcus Johnson',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      role: 'AI Engineer'
    },
    category: 'Artificial Intelligence',
    tags: ['Machine Learning', 'Automation', 'UX'],
    publishedAt: '2025-01-05T09:15:00Z',
    readTime: 10,
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'
  }
];

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = ['all', ...new Set(mockBlogPosts.map(post => post.category))];

  const filteredPosts = selectedCategory === 'all'
    ? mockBlogPosts
    : mockBlogPosts.filter(post => post.category === selectedCategory);

  return (
    <main className="container mx-auto px-4 py-16">
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">METAQUBE Blog</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Insights and updates from our team on Web3, Metaverse, AI, and the future of digital experiences.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12 space-x-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-metaEmerald-500 text-white'
                  : 'bg-gray-100 dark:bg-deepCosmos-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-deepCosmos-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              className="bg-white dark:bg-deepCosmos-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:transform hover:scale-105"
            >
              <div className="relative h-48">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-metaEmerald-500 text-white px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {post.author.role}
                    </p>
                  </div>
                </div>

                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
                  <span>{post.readTime} min read</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-gray-100 dark:bg-deepCosmos-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;