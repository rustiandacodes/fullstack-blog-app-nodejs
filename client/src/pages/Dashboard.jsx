import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/article-user').then(({ data }) => setArticles(data));
  }, []);

  const deleteArticle = async (article) => {
    await axios.delete('/delete-article/' + article._id).then(({ data }) => {
      const filterArticle = articles.filter((x) => x._id !== data._id);
      setArticles(filterArticle);
      axios.post('/delete-image', {
        fileNames: data.thumbnail[0],
      });
    });
  };

  return (
    <div className="max-w-6xl min-h-screen mx-auto py-36">
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
      <div className="flex flex-col gap-6 justify-between">
        {!!articles &&
          articles.map((article) => (
            <div key={article._id} className="relative flex gap-3 p-5 justify-between md:h-40 h-full shadow rounded bg-gray-50 cursor-pointer">
              <div className="flex md:flex-row flex-col gap-3">
                <img className="md:w-60 w-fit h-full rounded object-cover" src={import.meta.env.VITE_BASE_URL + '/uploads/' + article.thumbnail} alt="thumbnail" />
                <div>
                  <div>
                    <h2 className="font-bold text-xl truncate">{article.title}</h2>
                    <div className="flex items-center gap-1 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>
                      <p className="font-semibold my-2">Publish on {new Date(article.createdAt).toLocaleDateString('en-US')}</p>
                    </div>
                    <div className="flex items-center gap-2 w-30">
                      <span className="bg-teal-500 p-2 flex gap-2 text-center text-sm text-white font-semibold py-2 rounded-lg" onClick={() => navigate('/article/' + article._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        View
                      </span>
                      <span className="bg-sky-500 p-2 flex gap-2 items-center text-center text-sm text-white font-semibold py-2 rounded-lg" onClick={() => navigate('/update-article/' + article._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                        Update
                      </span>
                      <span className="bg-red-500 p-2 flex gap-2 items-center text-center text-sm text-white font-semibold py-2 rounded-lg" onClick={() => deleteArticle(article)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                        Delete
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
