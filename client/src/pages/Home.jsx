import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get('/articles').then(({ data }) => setArticles(data));
  }, []);

  console.log(user);

  return (
    <>
      <div className="container mx-auto my-10">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ea possimus doloremque alias esse harum, beatae ducimus, impedit ad asperiores a exercitationem voluptatibus optio saepe ipsam. Obcaecati a neque doloremque consectetur
          dolores provident assumenda sed sint suscipit. Placeat adipisci quibusdam ab sed, est veniam eaque! Culpa autem ut, veniam obcaecati tempore, quaerat mollitia iure similique libero optio accusamus blanditiis porro fugit deserunt
          exercitationem inventore a asperiores voluptatem omnis sed rem. Quo explicabo ut, voluptatibus beatae, sit ullam dignissimos recusandae sequi itaque, architecto quod doloribus ipsam id ratione harum fuga nesciunt nostrum ea porro
          aliquid! Perferendis officiis asperiores omnis in similique?
        </p>
      </div>
    </>
  );
};

export default Home;
