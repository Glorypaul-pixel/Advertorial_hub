"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ImageSkeleton from "../../ImageSkeleton";
import { icons } from "@/lib/Icons";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`https://advertorial-backend.onrender.com/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost(data))
        .catch((err) => console.error("Error fetching post:", err));
    }
    const getUser = async () => {
      const userIdOrEmail = localStorage.getItem("userId");

      if (!userIdOrEmail) return router.push("/authentication/Login");

      try {
        const res = await fetch(
          `https://advertorial-backend.onrender.com/api/auth/user/${userIdOrEmail}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const userData = await res.json();

        setUser(userData);
      } catch (error) {
        console.error("Error fetching user or posts:", error);
      }
    };
    getUser();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  // handling delete post
  const handleDeletePost = async (postId) => {
    const userToken = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://advertorial-backend.onrender.com/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: userToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete post: ${response.statusText}`);
      }

      console.log(`Post ${postId} deleted successfully.`);
      setUserPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // handle share post
  const handleSharePost = (postId) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this post",
          text: "I found this post interesting, thought you might like it too!",
          url: `https://advertorial-backend.onrender.com/api/posts/${postId}`,
        })
        .then(() => console.log("Post shared successfully!"))
        .catch((error) => console.error("Error sharing post:", error));
    }
  };
  return (
    <div style={{ padding: "40px 0px" }} className="createpost-container">
      <section className=" recetpost-card" key={post.id}>
        {/* post information  */}
        <div className=" recentpost-info">
          <article>
            <p className="avatar-dummy">
              {user?.firstName.slice(0, 1) + user?.lastName.slice(0, 1)}
            </p>
            <p>
              {user?.firstName + " " + user?.lastName}{" "}
              <span>
                {new Date() - new Date(post.createdAt) < 60000
                  ? "Just now"
                  : new Date(post.createdAt)
                      .toLocaleString("en-US", {
                        day: "numeric",
                        month: "long",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .replace(",", " at")}
              </span>
            </p>
          </article>
          <p className="recentpost-menu">
            <span
              //  onClick={() => (!menu)}
              onClick={() => setMenu(menu === post._id ? null : post._id)}>
              {" "}
              {icons.menu}
            </span>
            {menu === post._id && (
              <ul>
                <li onClick={() => handleSharePost(post._id)}>Share Post</li>
                <li>Edit Post</li>
                <li className="d" onClick={() => handleDeletePost(post._id)}>
                  Delete Post
                </li>
              </ul>
            )}
          </p>
        </div>
        {/* post write up  */}
        <p>{post.content}</p>

        {/* post images  */}
        <ImageSkeleton images={post.images} />
        <span>View Insight</span>
      </section>
    
    </div>
  );
}
