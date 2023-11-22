import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get('/articles').then(({ data }) => setArticles(data));
  }, []);

  return (
    <>
      <div className="container mx-auto my-10">
        {!!articles &&
          articles.map((article) => (
            <div>
              <p className="font-bold text-xl">{article.title}</p>
              <img src={import.meta.env.VITE_BASE_URL + '/uploads/' + article.thumbnail[0]} alt="" />
              <FroalaEditorView model={article.body} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
