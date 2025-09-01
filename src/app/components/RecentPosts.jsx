"use client";
import React, { useEffect, useState } from "react";
import Loader from "../dashboard/loading";
import { icons } from "@/lib/Icons";
import { useRouter } from "next/navigation";
import "../../styles/Allposts.css";

function RecentPosts() {
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userReactions, setUserReactions] = useState({});
    const [isReacting, setIsReacting] = useState({});
    const router = useRouter();

    // ✅ Fetch creator info for each post
    const getUser = async (idOrEmail) => {
        const userToken = localStorage.getItem("token");
        try {
            const response = await fetch(
                `https://advertorial-backend.onrender.com/api/auth/user/${idOrEmail}`,
                {
                    headers: { Authorization: `${userToken}` },
                }
            );
            return await response.json();
        } catch (error) {
            console.error("Error fetching user:", error);
            return null;
        }
    };

    // ✅ Fetch posts
    const getPosts = async () => {
        const userToken = localStorage.getItem("token");
        const currentUserId = localStorage.getItem("userId");
        setLoading(true);
        try {
            const response = await fetch(
                "https://advertorial-backend.onrender.com/api/posts",
                {
                    headers: { Authorization: `${userToken}` },
                }
            );

            const postsData = await response.json();
            if (!response.ok) {
                return console.error("Failed to fetch posts:", postsData);
            }

            // ✅ Only take the latest 3 posts
            const latestPosts = postsData.slice(0, 4);

            // ✅ Fetch creator for each post
            const postsWithCreators = await Promise.all(
                latestPosts.map(async (post) => {
                    const creatorData = await getUser(post.creatorId);
                    return { ...post, creator: creatorData };
                })
            );

            setUserPosts(postsWithCreators);

            // ✅ Reactions
            const reactions = {};
            latestPosts.forEach((post) => {
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
        if (typeof window !== "undefined") getPosts();
    }, []);

    const handleViewPost = (e, postId) => {
        e.preventDefault();
        router.push(`/dashboard/posts/${postId}`);
    };

    const handlePostReaction = async (postId, reactionType) => {
        const userToken = localStorage.getItem("token");
        if (!userToken) return;

        const prevReactions = userReactions;
        const prevPosts = userPosts;

        const prev = prevReactions[postId] || { liked: false, disliked: false };
        let next = { ...prev };

        if (reactionType === "like") {
            next = { liked: !prev.liked, disliked: prev.liked ? prev.disliked : false };
        } else if (reactionType === "dislike") {
            next = { liked: prev.disliked ? prev.liked : false, disliked: !prev.disliked };
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
                    headers: { "Content-Type": "application/json", Authorization: `${userToken}` },
                    body: JSON.stringify({ reactionType }),
                }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || "Reaction failed");

            setUserPosts((posts) =>
                posts.map((p) =>
                    p._id === postId ? { ...p, likes: data.likes, dislikes: data.dislikes } : p
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

    if (loading) return <Loader />;

    return (
        <div>
            <div className="community-section">
                <h2 className="community-heading">Join Our Creator Community</h2>
                <p className="community-text">
                    Be part of a vibrant network of flexible creators who are reshaping how ads should truly work.
                    Our community isn’t about spammy clicks or empty impressions — it’s about authentic strategies that connect, convert, and build real value.
                </p>
            </div>

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
                                            {post?.creator?.firstName?.[0] + post?.creator?.lastName?.[0]}
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
                                        onClick={() =>
                                            !isReacting[post._id] &&
                                            handlePostReaction(post._id, "like")
                                        }
                                        className="reaction-button"
                                    >
                                        {userReactions[post._id]?.liked
                                            ? icons.likesfill
                                            : icons.likes}
                                        {post?.likes}
                                    </p>
                                    <p
                                        onClick={() =>
                                            !isReacting[post._id] &&
                                            handlePostReaction(post._id, "dislike")
                                        }
                                        className="reaction-button"
                                    >
                                        {userReactions[post._id]?.disliked
                                            ? icons.dislikefill
                                            : icons.dislike}
                                        {post?.dislikes}
                                    </p>
                                </div>
                                <span onClick={(e) => handleViewPost(e, post._id)}>
                                    View Insight
                                </span>
                            </section>
                        </section>
                    ))
                ) : (
                    <div className="no-posts">
                        <h3>No recent posts</h3>
                    </div>
                )}
            </main>

        </div>
    );
}

export default RecentPosts;
