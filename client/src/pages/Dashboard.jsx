import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('/article-user').then(({ data }) => setArticles(data));
  }, []);

  const deleteArticle = async (id) => {
    await axios.delete('/delete-article/' + id).then(({ data }) => {
      const filterArticle = articles.filter((article) => article._id !== data._id);
      setArticles(filterArticle);
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-20">
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
      <div className="flex flex-col gap-3 justify-between">
        {!!articles &&
          articles.map((article) => (
            <div key={article._id} className="flex gap-3 p-5 justify-between h-36 shadow rounded bg-gray-50 cursor-pointer">
              <div className="flex gap-3">
                <img className="w-60 h-full rounded object-cover" src={import.meta.env.VITE_BASE_URL + '/uploads/' + article.thumbnail} alt="thumbnail" />
                <div>
                  <h2 className="font-bold text-xl">{article.title}</h2>
                  <div className="flex items-center gap-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                      />
                    </svg>
                    <p className="font-semibold">Publish on {new Date(article.createdAt).toLocaleDateString('en-US')}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 w-30">
                <span className="bg-red-500 w-20 text-center text-sm text-white font-semibold py-2 rounded-lg" onClick={() => deleteArticle(article._id)}>
                  Delete
                </span>
                <span className="bg-sky-500 w-20 text-center text-sm text-white font-semibold py-2 rounded-lg">Update</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
