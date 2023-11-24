import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
// froala editor
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import FroalaEditorComponent from 'react-froala-wysiwyg';

const WriteArticle = () => {
  const [title, setTitle] = useState();
  const [model, setModel] = useState();
  const [photoFile, setPhotoFile] = useState();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  !user ? navigate('/login') : '';

  const handleModelChange = (e) => {
    setModel(e);
  };

  const storeArticle = (fileName) => {
    axios.post('/create-article', {
      owner: user._id,
      title: title,
      body: model,
      thumbnail: fileName,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const files = photoFile;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios
      .post('/upload', data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then((response) => {
        const { data: fileNames } = response;
        storeArticle(fileNames);
      });
  };

  return (
    <div className="mx-auto container py-20">
      <form onSubmit={handleSubmit}>
        <div>
          <p className="font-bold mb-2">Title</p>
          <input className="input-style border-2 rounded-lg" type="text" placeholder="Title..." onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="my-5">
          <p className="font-bold mb-2">Thumbnail</p>
          <input className="border-2 p-5 rounded-lg w-fit" multiple type="file" onChange={(e) => setPhotoFile(e.target.files)} />
        </div>
        <div className="my-5">
          <p className="font-bold mb-2">Article</p>
          <FroalaEditorComponent tag="textarea" onModelChange={handleModelChange} />
        </div>
        <div className="flex justify-end">
          <button className="w-full md:w-40 bg-sky-500 text-white py-3 mt-2 rounded-lg font-bold focus:outline-none">Submit</button>
        </div>
      </form>
      <div className="my-5">
        <p>{model}</p>
        {/* <FroalaEditorView model={model} /> */}
      </div>
    </div>
  );
};

export default WriteArticle;
