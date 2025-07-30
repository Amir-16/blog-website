import { useEffect, useState } from 'react';
import { api } from '../api/api';
import BlogCard from '../components/BlogCard';
import Loader from '../components/Loader';
import { useSearchParams } from 'react-router-dom';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    setLoading(true);

    api
      .get('/blogs', { params: { search, page } })
      .then((res) => {
        const { blogs: blogList = [], meta: pagination = {} } = res.data.data || {};
        setBlogs(blogList);
        setMeta({
          current_page: pagination.current_page || 1,
          last_page: pagination.last_page || 1,
          total: pagination.total || 0,
          per_page: pagination.per_page || 10,
        });
      })
      .catch((error) => {
        console.error('Blog fetch error:', error);
        setBlogs([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    setSearchParams({ search: value, page: 1 });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
         Tech <span className="text-blue-600">Blogs</span>
      </h1>

      {/* 🔍 Search */}
      <form
        onSubmit={handleSearch}
        className="mb-10 flex flex-col sm:flex-row justify-center gap-4"
      >
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search blog titles..."
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
           Search
        </button>
      </form>

      {loading ? (
        <Loader />
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500 italic">No blogs found.</p>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {/* 🔢 Pagination */}
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((i) => (
              <button
                key={i}
                onClick={() => setSearchParams({ search, page: i })}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  meta.current_page === i
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-white text-gray-700 hover:bg-blue-100 border-gray-300'
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
