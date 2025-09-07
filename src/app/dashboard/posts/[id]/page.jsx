"use client";

import { useEffect, useState } from "react";
import ImageSkeleton from "../../ImageSkeleton";
import Loader from "../../loading";
import MakeAds from "@/app/components/MakeAds";
import { icons } from "@/lib/Icons"; 
import { statesAndCapitals } from "./statesAndCapitals";
import DashboardHeader from "@/app/components/DashboardHeader";

export default function Post() {
  const [post, setPost] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [poster, setPoster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [reactions, setReactions] = useState({ liked: false, disliked: false });
  const [isReacting, setIsReacting] = useState(false);
  const [makeAds, setMakeAds] = useState(false);
  const [makeAdLoading, setMakeAdLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const pathParts = window.location.pathname.split("/");
      const postId = pathParts[pathParts.length - 1];
      if (!postId) return;

      try {
        const userToken = localStorage.getItem("token");
        const currentUserId = localStorage.getItem("userId");

        // Fetch post data
        const postRes = await fetch(
          `https://advertorial-backend.onrender.com/api/posts/${postId}`,
          {
            headers: userToken ? { Authorization: `Bearer ${userToken}` } : {},
          }
        );
        if (!postRes.ok) throw new Error("Post fetch failed");
        const postData = await postRes.json();

        // Fetch analytics data
        const analyticsRes = await fetch(
          `https://advertorial-backend.onrender.com/api/posts/analytics/${postId}`
        );
        const analyticsData = analyticsRes.ok
          ? await analyticsRes.json()
          : null;

        // Fetch poster data
        const posterRes = await fetch(
          `https://advertorial-backend.onrender.com/api/auth/user/${postData.creatorId}`,
          {
            headers: userToken ? { Authorization: `Bearer ${userToken}` } : {},
          }
        );
        const posterData = posterRes.ok ? await posterRes.json() : null;

        // Initialize reactions state based on whether current user liked/disliked
        let initialReactions = { liked: false, disliked: false };
        if (postData.likesUsers && currentUserId) {
          initialReactions.liked = postData.likesUsers.some(
            (id) => id?.toString() === currentUserId.toString()
          );
        }
        if (postData.dislikesUsers && currentUserId) {
          initialReactions.disliked = postData.dislikesUsers.some(
            (id) => id?.toString() === currentUserId.toString()
          );
        }

        setPost(postData);
        setAnalytics(analyticsData);
        setPoster(posterData);
        setReactions(initialReactions);
      } catch (err) {
        console.error("Error fetching post or analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) return <Loader />;
  if (!post) return <p>Post not found</p>;

  const currentUserId = localStorage.getItem("userId");
  const isPoster = currentUserId && post.creatorId === currentUserId;

  const handleDeletePost = async () => {
    setDeleting(true);
    const userToken = localStorage.getItem("token");
    try {
      const res = await fetch(
        `https://advertorial-backend.onrender.com/api/posts/${post._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      if (!res.ok) throw new Error("Failed to delete post");
      window.location.href = "/dashboard/posts";
    } catch (err) {
      console.error(err);
      setDeleting(false);
      setShowDeleteConfirm(false);
      alert("Delete failed");
    }
  };

  const handleSubmitAd = async (adData) => {
    setMakeAdLoading(true);

    // example user token & id fetch, adjust as needed
    const userToken = localStorage.getItem("token");
    const userIdOrEmail = localStorage.getItem("userId");

    if (!userToken || !userIdOrEmail || !post?._id) {
      console.error("Missing required info");
      setMakeAdLoading(false);
      return;
    }

    if (
      !adData.minAge ||
      !adData.maxAge ||
      !adData.location ||
      !adData.gender
    ) {
      console.error("Please fill all ad targeting fields.");
      setMakeAdLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://advertorial-backend.onrender.com/api/ads/${userIdOrEmail}/${post._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${userToken}`,
          },
          body: JSON.stringify({
            target: {
              ageRange: {
                min: parseInt(adData.minAge),
                max: parseInt(adData.maxAge),
              },
              location: adData.location,
              gender: adData.gender,
            },
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log("Ad created successfully:", data);
        setMakeAds(false);
      } else {
        console.error("Error from server:", data);
      }
    } catch (error) {
      console.error("Network error:", error);
    }

    setMakeAdLoading(false);
  };

  const handleSharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: "I found this post interesting, thought you might like it too",
        url: `https://advertorialhub.net/dashboard/posts/${postId}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Post link copied!");
    }
  };

  const handlePostReaction = async (reactionType) => {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      alert("You must be logged in to react");
      return;
    }

    if (isReacting) return;

    const prevReactions = reactions;
    const prevPost = post;

    let next = { ...prevReactions };

    if (reactionType === "like") {
      next = {
        liked: !prevReactions.liked,
        disliked: prevReactions.liked ? false : prevReactions.disliked,
      };
    } else if (reactionType === "dislike") {
      next = {
        liked: prevReactions.disliked ? prevReactions.liked : false,
        disliked: !prevReactions.disliked,
      };
    }

    // Update local post counts optimistically
    let likes = post.likes ?? 0;
    let dislikes = post.dislikes ?? 0;

    if (reactionType === "like") {
      if (prevReactions.liked) likes -= 1;
      else {
        likes += 1;
        if (prevReactions.disliked) dislikes -= 1;
      }
    } else {
      if (prevReactions.disliked) dislikes -= 1;
      else {
        dislikes += 1;
        if (prevReactions.liked) likes -= 1;
      }
    }

    setIsReacting(true);
    setReactions(next);
    setPost({ ...post, likes, dislikes });

    try {
      const res = await fetch(
        `https://advertorial-backend.onrender.com/api/posts/${post._id}/reactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ reactionType }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Reaction failed");

      // Update with actual server counts
      setPost((p) =>
        p._id === post._id
          ? { ...p, likes: data.likes, dislikes: data.dislikes }
          : p
      );
    } catch (err) {
      console.error(err);
      // Revert on failure
      setReactions(prevReactions);
      setPost(prevPost);
      // alert("Failed to update reaction");
    } finally {
      setIsReacting(false);
    }
  };

  return (
    <div className="post-layout" onClick={() => setMenu(false)}>
      <DashboardHeader />
      {/* LEFT: Post content */}
      <section className="post-main">
        <p className="post-title">{post.title}</p>
        <p className="post-content">{post.content}</p>

        <ImageSkeleton images={post.images} />
      </section>

      {/* RIGHT: Sidebar */}
      <aside className="post-sidebar">
        <div className="poster-info">
          {poster?.profilePicture ? (
            <img
              src={poster.profilePicture}
              alt="Profile"
              className="avatar-dummy-img"
            />
          ) : (
            <p className="avatar-dummy">
              {poster?.firstName?.[0]}
              {poster?.lastName?.[0]}
            </p>
          )}

          <div>
            <p className="poster-name">
              {poster?.firstName} {poster?.lastName}
            </p>
            <span className="post-date">
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
          </div>
        </div>

        {analytics && (
          <div className="post-analytics">
            <p>
              <strong>Total Views:</strong> {analytics.totalViews}
            </p>
            <div>
              <strong>Devices:</strong>
              <ul>
                {Object.entries(analytics.deviceStats || {}).map(
                  ([device, count]) => (
                    <li key={device}>
                      {device}: {count}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <strong>Locations:</strong>
              <ul>
                {Object.entries(analytics.locationStats || {}).map(
                  ([loc, count]) => (
                    <li key={loc}>
                      {loc}: {count}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Reaction Buttons */}
            <div className="reaction-buttons" style={{ marginTop: "12px" }}>
              <button
                onClick={() => handlePostReaction("like")}
                disabled={isReacting}
                className={`reaction-btn ${reactions.liked ? "liked" : ""}`}
                aria-label="Like"
              >
                {reactions.liked ? icons.likesfill : icons.likes}{" "}
                {post.likes ?? 0}
              </button>
              <button
                onClick={() => handlePostReaction("dislike")}
                disabled={isReacting}
                className={`reaction-btn ${
                  reactions.disliked ? "disliked" : ""
                }`}
                aria-label="Dislike"
              >
                {reactions.disliked ? icons.dislikefill : icons.dislike}{" "}
                {post.dislikes ?? 0}
              </button>
            </div>
          </div>
        )}

        {isPoster && (
          <div className="post-actions">
            <button onClick={handleSharePost}>Share</button>
            <button onClick={() => setMakeAds(true)}>Make Ads</button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}

        <MakeAds
          show={makeAds}
          onClose={() => setMakeAds(false)}
          adPost={post}
          onSubmitAd={handleSubmitAd}
          makeAdLoading={makeAdLoading}
          statesAndCapitals={statesAndCapitals}
        />
      </aside>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this post?</p>
            <div className="modal-actions">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button onClick={handleDeletePost} disabled={deleting}>
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .post-main {
          flex: 3;
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
        }
        .post-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .post-content {
          font-size: 1.1rem;
          white-space: pre-wrap;
          margin-bottom: 20px;
        }
        .post-sidebar {
          flex: 1;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #ddd;
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 250px;
        }
        .poster-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .avatar-dummy-img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
        .avatar-dummy {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #bbb;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
          font-size: 1.5rem;
        }
        .poster-name {
          font-weight: 600;
          font-size: 1.1rem;
        }
        .post-date {
          font-size: 0.85rem;
          color: #666;
        }
        .post-analytics {
          font-size: 0.9rem;
          color: #444;
        }
        .post-analytics strong {
          font-weight: 600;
        }
        .post-analytics ul {
          list-style: none;
          padding-left: 0;
          margin: 6px 0 10px;
        }
        .reaction-buttons {
          display: flex;
          gap: 12px;
        }
        .reaction-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          font-weight: 600;
          border: 1.5px solid #ccc;
          border-radius: 6px;
          background: white;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease;
          font-size: 1rem;
        }
        .reaction-btn:hover:not(:disabled) {
          background-color: #f0f0f0;
          border-color: #0070f3;
        }
        .reaction-btn:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
        .reaction-btn.liked {
          background-color: #0070f3;
          color: white;
          border-color: #0070f3;
        }
        .reaction-btn.disliked {
          background-color: #e63946;
          color: white;
          border-color: #e63946;
        }
        .post-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .post-actions button {
          padding: 10px;
          font-weight: 600;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          background-color: #0070f3;
          color: white;
          transition: background-color 0.2s ease;
        }
        .post-actions button:hover:not(:disabled) {
          background-color: #005bb5;
        }
        .post-actions button:disabled {
          background-color: #8ab4f8;
          cursor: not-allowed;
        }
        .delete-modal {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .modal-content {
          background: white;
          padding: 25px 30px;
          border-radius: 8px;
          max-width: 320px;
          text-align: center;
        }
        .modal-actions {
          margin-top: 20px;
          display: flex;
          justify-content: space-around;
        }
        .modal-actions button {
          padding: 8px 16px;
          border-radius: 4px;
          border: none;
          font-weight: 600;
          cursor: pointer;
        }
        .modal-actions button:first-child {
          background: #ccc;
          color: #333;
        }
        .modal-actions button:last-child {
          background: #e63946;
          color: white;
        }
        .modal-actions button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
