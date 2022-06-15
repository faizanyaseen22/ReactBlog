import { useState, useEffect } from "react";
import axios from "axios";
import XMLParser from "react-xml-parser";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";

export default function Home() {
  const [post, setPost] = useState([]);

  const navigate = useNavigate();

  const getPost = async () => {
    const res = await axios.get("/data.xml", {
      "Content-Type": "application/xml; charset=utf-8",
    });
    const jsonFromXml = new XMLParser().parseFromString(res.data);
    const arr = jsonFromXml.getElementsByTagName("post");
    setPost(arr);
  };
  useEffect(() => {
    getPost();
  }, []);

  return (
    <Layout>
      <div className="home">
        <p>All Blog Posts</p>
        <div className="blogs">
          {post.map((item, index) => {
            return (
              <div className="card" key={index}>
                <h2
                  onClick={() =>
                    navigate(`/post/${item.children[0]?.value}`, {
                      state: { list: JSON.stringify(item.children) },
                    })
                  }
                >
                  {item.children[3]?.value}
                </h2>

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
                    <h3>{item.children[2]?.value}</h3>
                    <p>{item.children[1]?.value}</p>
                  </div>
                </div>
                <div className="summary">
                  <div>
                    <img
                      src={item.children[4]?.value}
                      alt="blog images"
                      className="blog-image"
                    />
                  </div>
                  <p>{item.children[5]?.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
