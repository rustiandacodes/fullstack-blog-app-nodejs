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
              <FroalaEditorView model={article.body} />
              {/* <p>{article.body}</p> */}
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
