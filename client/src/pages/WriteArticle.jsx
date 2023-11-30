import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
// froala editor
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import FroalaEditorComponent from 'react-froala-wysiwyg';

const WriteArticle = () => {
  const [title, setTitle] = useState('');
  const [model, setModel] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [photoFile, setPhotoFile] = useState();
  const [preview, setPreview] = useState();
  const [updatePreview, setUpdatePreview] = useState();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  !user ? navigate('/login') : null;

  useEffect(() => {
    if (id) {
      axios.get('/article/' + id).then(({ data }) => {
        setTitle(data.title);
        setModel(data.body);
        setThumbnail(data.thumbnail);
        setUpdatePreview(import.meta.env.VITE_BASE_URL + '/uploads/' + data.thumbnail);
      });
    }
  }, []);

  const showImg = () => {
    if (preview) {
      return <img className="w-56 h-32 object-cover rounded-lg" src={preview} alt="preview" />;
    } else if (updatePreview) {
      return <img className="w-56 h-32 object-cover rounded-lg" src={updatePreview} alt="preview" />;
    }
    return;
  };

  const handleModelChange = (e) => {
    setModel(e);
  };

  const handleViewPhoto = (e) => {
    setPhotoFile(e.target.files);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleCreateArticle = (fileNames) => {
    axios.post('/create-article', {
      title: title,
      body: model,
      thumbnail: fileNames,
    });
  };

  const handleUpdateArticle = (thumbnail) => {
    axios.put('/update-article/' + id, {
      title,
      body: model,
      thumbnail,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (photoFile) {
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
          id ? handleUpdateArticle(fileNames) : handleCreateArticle(fileNames);
        });
    } else {
      handleUpdateArticle(thumbnail);
    }
  };

  return (
    <div className="mx-auto container py-40 min-h-screen">
      <form onSubmit={handleSubmit}>
        <div>
          <p className="font-bold mb-2">Title</p>
          <input className="input-style border-2 rounded-lg" type="text" placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="my-5">
          <p className="font-bold mb-2">Thumbnail</p>
          <div className="flex gap-3">
            <label className="cursor-pointer h-32 w-52 flex justify-center items-center gap-3 bg-transparent rounded-lg p-4 text-2xl border text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
              <input onChange={handleViewPhoto} multiple type="file" hidden />
              <span>Upload</span>
            </label>
            <div>{showImg()}</div>
          </div>
        </div>
        <div className="my-5">
          <p className="font-bold mb-2">Article</p>
          <FroalaEditorComponent
            model={model}
            tag="textarea"
            onModelChange={handleModelChange}
            config={{
              placeholderText: 'Edit Your Content Here!',
              charCounterCount: false,
            }}
          />
        </div>
        <div className="flex justify-end">
          <button className="w-full md:w-40 bg-sky-500 text-white py-3 mt-2 rounded-lg font-bold focus:outline-none">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default WriteArticle;
