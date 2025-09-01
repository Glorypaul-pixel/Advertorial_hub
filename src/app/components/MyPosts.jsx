"use client";
import React, { useEffect, useState } from "react";
import Loader from "../dashboard/loading";
import { icons } from "@/lib/Icons";
import { useRouter } from "next/navigation";
import "../../styles/Allposts.css";

function MyPost() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userReactions, setUserReactions] = useState({});
  const [isReacting, setIsReacting] = useState({});
  const router = useRouter();

  // Fetch user info by id/email
  const getUser = async (idOrEmail) => {
    const userToken = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://advertorial-backend.onrender.com/api/auth/user/${idOrEmail}`,
        {
          headers: {
            Authorization: ` ${userToken}`,
          },
        }
      );
      const userData = await response.json();
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  // Fetch posts created by the authenticated user only
  const getUserPosts = async () => {
    const userToken = localStorage.getItem("token");
    const currentUserId = localStorage.getItem("userId");
    setLoading(true);
    try {
      const response = await fetch(
        "https://advertorial-backend.onrender.com/api/posts",
        {
          headers: {
            Authorization: ` ${userToken}`,
          },
        }
      );

      const postsData = await response.json();

      if (!response.ok) {
        console.error("Failed to fetch posts:", postsData);
        setLoading(false);
        return;
      }

      // Filter posts to only include those by current user
      const filteredPosts = postsData.filter(
        (post) => post.creatorId === currentUserId
      );

      // Fetch creator data for each post (should be the current user)
      const postsWithCreators = await Promise.all(
        filteredPosts.map(async (post) => {
          const creatorData = await getUser(post.creatorId);
          return {
            ...post,
            creator: creatorData,
          };
        })
      );

      setUserPosts(postsWithCreators);

      // Prepare reactions info for the current user
      const reactions = {};
      filteredPosts.forEach((post) => {
        reactions[post._id] = {
          liked:
            Array.isArray(post.likesUsers) &&
            currentUserId &&
            post.likesUsers.some(
              (id) => id?.toString() === currentUserId.toString()
            ),
          disliked:
            Array.isArray(post.dislikesUsers) &&
            currentUserId &&
            post.dislikesUsers.some(
              (id) => id?.toString() === currentUserId.toString()
            ),
        };
      });
      setUserReactions(reactions);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getUserPosts();
    }
  }, []);

  // Navigate to detailed post view
  const handleViewPost = (e, postId) => {
    e.preventDefault();
    router.push(`/dashboard/posts/${postId}`);
  };

  // Handle like/dislike reaction
  const handlePostReaction = async (postId, reactionType) => {
    const userToken = localStorage.getItem("token");
    if (!userToken) return;

    const prevReactions = userReactions;
    const prevPosts = userPosts;
    const prev = prevReactions[postId] || { liked: false, disliked: false };
    let next = { ...prev };

    if (reactionType === "like") {
      next = {
        liked: !prev.liked,
        disliked: prev.liked ? prev.disliked : false,
      };
    } else if (reactionType === "dislike") {
      next = {
        liked: prev.disliked ? prev.liked : false,
        disliked: !prev.disliked,
      };
    }

    const updatedPosts = userPosts.map((p) => {
      if (p._id !== postId) return p;

      let likes = p.likes ?? 0;
      let dislikes = p.dislikes ?? 0;

      if (reactionType === "like") {
        if (prev.liked) likes -= 1;
        else {
          likes += 1;
          if (prev.disliked) dislikes -= 1;
        }
      } else {
        if (prev.disliked) dislikes -= 1;
        else {
          dislikes += 1;
          if (prev.liked) likes -= 1;
        }
      }

      return { ...p, likes, dislikes };
    });

    setIsReacting((m) => ({ ...m, [postId]: true }));
    setUserReactions((r) => ({ ...r, [postId]: next }));
    setUserPosts(updatedPosts);

    try {
      const res = await fetch(
        `https://advertorial-backend.onrender.com/api/posts/${postId}/reactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userToken}`,
          },
          body: JSON.stringify({ reactionType }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Reaction failed");

      setUserPosts((posts) =>
        posts.map((p) =>
          p._id === postId
            ? { ...p, likes: data.likes, dislikes: data.dislikes }
            : p
        )
      );
    } catch (err) {
      console.error(err);
      setUserReactions(prevReactions);
      setUserPosts(prevPosts);
    } finally {
      setIsReacting((m) => ({ ...m, [postId]: false }));
    }
  };

  // Share post via Web Share API
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

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="posth-text">My Posts</h2>

      <main
        className="createpost-container mild-zoom"
        data-aos="zoom-in"
        data-aos-delay="400"
        data-aos-duration="2000"
      >
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <section
              className="recetpost-card"
              key={post._id}
              onClick={(e) => handleViewPost(e, post._id)}
            >
              <div className="recentpost-info">
                <article>
                  {post?.creator?.profilePicture ? (
                    <img
                      src={post?.creator?.profilePicture}
                      alt="Profile"
                      className="avatar-dummy-img"
                    />
                  ) : (
                    <p className="avatar-dummy">
                      {post?.creator?.firstName.slice(0, 1) +
                        post?.creator?.lastName.slice(0, 1)}
                    </p>
                  )}

                  <p>
                    {post?.creator?.firstName + " " + post?.creator?.lastName}{" "}
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
              </div>

              <p style={{ margin: "0", fontSize: "16px", fontWeight: "bolder" }}>
                {post.title}
              </p>

              <div>
                <img
                  className="post-images"
                  src={post.images[0] || "/logo.png"}
                  alt={post.title}
                />
              </div>

              <section>
                <div>
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isReacting[post._id]) {
                        handlePostReaction(post._id, "like");
                      }
                    }}
                    className="reaction-button"
                  >
                    {userReactions[post._id]?.liked ? icons.likesfill : icons.likes}
                    {post?.likes}
                  </p>

                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isReacting[post._id]) {
                        handlePostReaction(post._id, "dislike");
                      }
                    }}
                    className="reaction-button"
                  >
                    {userReactions[post._id]?.disliked
                      ? icons.dislikefill
                      : icons.dislike}
                    {post?.dislikes}
                  </p>

                  <button onClick={() => handleSharePost(post._id)}>
                    Share {icons.sharepublic}
                  </button>
                </div>

                <span onClick={(e) => handleViewPost(e, post._id)}>View Insight</span>
              </section>
            </section>
          ))
        ) : (
          <div className="no-posts">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="96"
              height="96"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#016ce8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="no-posts-icon"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
              <line x1="7" y1="9" x2="17" y2="9" />
              <line x1="7" y1="13" x2="13" y2="13" />
              <line x1="7" y1="17" x2="11" y2="17" />
              <circle cx="18" cy="15" r="2" />
              <path d="M17 16.5q1-1 2 0" />
            </svg>

            <h3>No posts yet</h3>
            <p>Start creating your first post to see it appear here.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default MyPost;
