import { useLocation } from "react-router-dom";
import Layout from "../components/layout";

export default function Post() {
  const { state } = useLocation();

  const post = JSON.parse(state.list);

  return (
    <Layout>
      <div>
        <h2>{post[3]?.value}</h2>

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
            <h3>{post[2]?.value}</h3>
            <p>{post[1]?.value}</p>
          </div>
        </div>
        <div className="summary">
          <div>
            <img
              src={post[4]?.value}
              alt="blog images"
              className="blog-image"
            />
          </div>
          <p>{post[6]?.value}</p>
        </div>
      </div>
    </Layout>
  );
}
