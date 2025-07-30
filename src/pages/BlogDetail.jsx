import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/api';
import Loader from '../components/Loader';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/blogs/${slug}`)
      .then((res) => {
        setBlog(res.data.data);
      })
      .catch(() => {
        setNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <Loader />;

  if (notFound)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <p className="text-red-600 text-2xl font-bold"> 404 - Blog Not Found</p>
        <Link
          to="/"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ← Go Back to Blog List
        </Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-white shadow-sm rounded-lg">
      <Link
        to="/"
        className="inline-block mb-8 text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition"
      >
        ← Back to All Blogs
      </Link>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
        {blog.title}
      </h1>

      <div className="text-sm text-gray-500 mb-8">
        By <span className="font-semibold text-gray-700">{blog.author}</span> •{' '}
        {new Date(blog.created_at).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>


      <div
        className="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
