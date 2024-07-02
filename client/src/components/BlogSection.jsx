import React from "react";

const BlogSection = () => {
  const blogs = [
    // Dummy data for blogs
    {
      id: 1,
      title: "Blog Post 1",
      image: "./mission.jpeg",
      snippet: "This is a snippet of the first blog post.",
    },
    {
      id: 2,
      title: "Blog Post 2",
      image: "./mission.jpeg",
      snippet: "This is a snippet of the second blog post.",
    },
    {
      id: 3,
      title: "Blog Post 3",
      image: "./mission.jpeg",
      snippet: "This is a snippet of the third blog post.",
    },
  ];

  return (
    <section id="blog" className="py-12 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Latest Blog Posts
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden mx-6"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{blog.title}</h3>
                <p className="mt-2 text-gray-600">{blog.snippet}</p>
                <button className="mt-4 bg-[#001F3F] text-white px-4 py-2 rounded-md">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
