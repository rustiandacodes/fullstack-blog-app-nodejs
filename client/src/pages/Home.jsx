import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('/articles').then(({ data }) => setArticles(data));
  }, []);

  console.log(articles);

  return (
    <>
      <div>
        {articles.map((article) => (
          <div key={article._id}>{article.title}</div>
        ))}
      </div>
    </>
  );
};

export default Home;
