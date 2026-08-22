import { Link } from "react-router-dom";
import "./Post.css";

function Post({ post }) {
  return (
    <Link to={`/posts/${post._id}`} className="post">
      <span className="post-author">{post.author?.name}</span>

      <h3 className="post-title">{post.title}</h3>

      {!post.image && <p className="post-preview">{post.body}</p>}

      {post.image && (
        <img src={post.image} alt={post.title} className="post-image" />
      )}
    </Link>
  );
}

export default Post;
