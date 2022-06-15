import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const API_KEY = "8932387c2567421cb46b39972b3d8447";

export default function Layout({ children }) {
  const [news, setNews] = useState([]);

  const getNews = async () => {
    const res = await axios.get(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`
    );
    if (res.status === 200 && res.data.status === "ok") {
      setNews(res.data.articles);
    }
  };

  useEffect(() => {
    getNews();
    setInterval(() => {
      getNews();
    }, [60000]);
  }, []);
  return (
    <>
      <Header />
      <main className="main-body">
        <div className="left-side">{children}</div>
        <div className="right-side">
          <Link to={"/"} className="home-link">
            Home
          </Link>
          <h4>Top Headlines</h4>
          <div className="headlines">
            {news.map((item, index) => {
              return (
                <div className="news-item" key={index}>
                  <h5>Title: {item.title}</h5>
                  <div className="flex">
                    <div className="user-circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                      </svg>
                    </div>
                    <div>
                      <h3>{item.author}</h3>
                      <p>{new Date(item.publishedAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="summary">
                    <div>
                      <img
                        src={item.urlToImage}
                        alt="headlines-images"
                        className="blog-image"
                      />
                    </div>
                    <p style={{ fontSize: "11px", fontFamily: "serif" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
