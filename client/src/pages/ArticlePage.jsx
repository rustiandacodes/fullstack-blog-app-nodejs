import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const baseImgUrl = import.meta.env.VITE_BASE_URL + '/uploads/';

  useEffect(() => {
    axios.get('/article/' + id).then(({ data }) => setArticle(data));
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="max-w-4xl bg-gray-50 px-20 mx-auto py-20">
        <h2 className="font-bold text-5xl">{article.title}</h2>
        <img className="w-full py-10" src={baseImgUrl + article.thumbnail} alt="thumbnail" />
        <FroalaEditorView model={article.body} />
      </div>
    </div>
  );
};

export default ArticlePage;
