import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Blog Image */}
      {blog.image_url && (
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      )}

      {/* Blog Content */}
      <div className="p-5 flex flex-col h-full">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-700 transition-colors">
          {blog.title}
        </h2>

        <p className="text-xs text-gray-500 mb-3">
          By <span className="font-medium text-gray-700">{blog.author}</span> •{' '}
          {new Date(blog.created_at).toLocaleDateString()}
        </p>

        <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">
          {blog.content?.replace(/<[^>]+>/g, '').slice(0, 180)}...
        </p>

        <Link
          to={`/blog/${blog.slug}`}
          className="self-start text-blue-600 hover:text-blue-800 text-sm font-medium transition"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
