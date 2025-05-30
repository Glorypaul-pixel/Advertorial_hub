"use client";

import { useEffect, useRef, useState } from "react";
import { icons } from "../../lib/Icons";
import { useRouter } from "next/navigation";
import ImageSkeleton from "./ImageSkeleton";
import "../../styles/Seetingshome.css";
import Loading from "./loading";

export default function HomePage() {
  // UI States
  const [showList, setShowList] = useState(false);
  const [addLink, setAddLink] = useState(false);
  const [profile, setProfile] = useState(false);
  const [deleteLink, setDeleteLink] = useState(false);

  // Post Progress States
  const [createPost, setCreatePost] = useState(false);
  const [selectImg, setSelectImg] = useState(false);
  const [recentPosts, setRecentPost] = useState(false);
  const [menu, setMenu] = useState(false);

  // Backend Integration States
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("title");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [isAd, setIsAd] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  // post array
  const [userPosts, setUserPosts] = useState([]);

  // loading states and error handling
  const [errorPost, setErrorPost] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const userIdOrEmail = localStorage.getItem("userId");
      const userToken = localStorage.getItem("token");

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

        const response = await fetch(
          "https://advertorial-backend.onrender.com/api/posts",
          {
            headers: {
              Authorization: ` ${userToken}`,
            },
          }
        );

        const userData = await res.json();
        const postsData = await response.json();

        setUser(userData);
        console.log(userData);
        if (!response.ok) {
          return console.error("Failed to fetch posts:", postsData);
        }

        const myPosts = postsData.filter(
          (post) => post.creatorId === userData.id
        );
        setUserPosts(myPosts);

        if (myPosts.length >= 1) {
          setRecentPost(true);
          setCreatePost(true);
        }
      } catch (error) {
        console.error("Error fetching user or posts:", error);
      }
    };

    if (typeof window !== "undefined") {
      getUser();
    }
  }, []);

  // Getting posts
  const getPosts = async () => {
    const userToken = localStorage.getItem("token");
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
        return console.error("Failed to fetch posts:", postsData);
      }

      const myPosts = postsData.filter((post) => post?.creatorId === user?.id);
      setUserPosts(myPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // submiting post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    setErrorPost(false);
    const userToken = localStorage.getItem("token");

    if (!user) return console.log("User not loaded yet.");
    if (!userToken) return console.log("No token found. Please log in again.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("isAd", isAd);
    formData.append("creatorId", user._id);
    formData.append("creatorEmail", user.email);

    images.slice(0, 5).forEach((image) => {
      formData.append("images", image);
    });

    if (video) {
      formData.append("video", video);
    }

    try {
      const res = await fetch(
        "https://advertorial-backend.onrender.com/api/posts",
        {
          method: "POST",
          headers: {
            Authorization: ` ${userToken}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        setRecentPost(true);
        console.log("Post created:", data);
        setCreateLoading(false);
        setErrorPost(false);
      } else {
        console.error("Error creating post:", data);
        setCreateLoading(false);
        setErrorPost(true);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setErrorPost(true);
      setCreateLoading(false);
    }
  };

  // switching from-to create/created post
  const handleSwitch = (e) => {
    e.preventDefault();

    if (e.target.id === "createpost") {
      setCreatePost(true);
      setRecentPost(false);
    } else if (e.target.id === "createdpost") {
      setCreatePost(true);
      setRecentPost(true);
    }

    if (e.target.id === "cancelCreatePost" && userPosts.length >= 1) {
      setRecentPost(true);
    } else if (e.target.id === "cancelCreatePost" && userPosts.length === 0) {
      setCreatePost(false);
    }
  };

  // handling delete post
  const handleDeletePost = async (postId) => {
    console.log(postId);
    const userToken = localStorage.getItem("token");
    console.log(userToken);

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

  // handle view post
  const handleViewPost = (e, postId) => {
    e.preventDefault();
    router.push(`/dashboard/posts/${postId}`);
  };

  // to handle post data on but clicks to get updated data, connection above
  useEffect(() => {
    getPosts();
  }, [handleSubmit, handleDeletePost]);

  return (
    <div>
      {!createPost ? (
        <div className="  page-container">
          <h1 className=" page-h-text">Home</h1>
          {/* container  */}
          <main className=" main-card">
            {/* setup */}
            <section className=" main-card ">
              <h4 className=" h4-text  ">Your quick start guide</h4>
              <div className="profile-updating-section ">
                <p className={` ${showList ? "listoff" : "liston"} `}>
                  Getting set up checklist{" "}
                  {showList ? (
                    <button type="button" onClick={() => setShowList(false)}>
                      Skip
                    </button>
                  ) : (
                    <span onClick={() => setShowList(true)} className=" cp">
                      3 steps left
                    </span>
                  )}
                </p>
                {showList && (
                  <ul>
                    <li className="dn">
                      <span>{icons.checkgreen}</span>Confirm your email address
                    </li>
                    <li onClick={() => setAddLink(true)}>
                      <span>{icons.checkgray}</span>Add a link to your profile
                    </li>
                    <li onClick={() => setProfile(true)}>
                      <span>{icons.checkgray}</span>Update your profile
                    </li>
                  </ul>
                )}
              </div>
            </section>
            {/* Recent Post / create post */}
            <section className=" main-card ">
              <h4 className=" h4-text  ">Recent Post</h4>
              <div className="create-post-card ">
                <section className="folder-selection-container">
                  {icons.file}
                  <p>
                    No Post Yet <span>All post would appear here </span>
                  </p>
                  <button type="button" id="createpost" onClick={handleSwitch}>
                    {icons.createpost}Create Post
                  </button>
                </section>
              </div>
            </section>
          </main>
          {/* addlink section  */}
          {addLink && (
            <section className="addLink-overlay">
              <div className="overlay-container">
                <h4 className=" overlay-header">
                  Add a link to your profile
                  <button
                    type="button"
                    className=" cp "
                    onClick={() => setAddLink(false)}
                  >
                    {icons.exit}
                  </button>
                </h4>
                <form action="" className="  overlay-form1">
                  <section className="  overlay-form2">
                    {/* selected url  */}
                    <div className="selected-url">
                      <p>
                        <span>{icons.selectedurl}</span> <span>Linkedin</span>
                      </p>
                      <p>
                        <span>{icons.editurl}</span>{" "}
                        <button
                          type="button"
                          onClick={() => setDeleteLink(true)}
                        >
                          {icons.deleteurl}
                        </button>
                      </p>
                    </div>
                    {/* new url  */}
                    <div className="  overlay-form3 ">
                      <label htmlFor="url" className=" overlay-link-label">
                        URL
                      </label>
                      <div className="overlay-link-input">
                        <p>https://</p>
                        <input
                          type="text"
                          placeholder="www.example.com"
                          name="url"
                          id=""
                        />
                      </div>
                    </div>
                    {/*add new url  */}
                    <div className="  overlay-form3 ">
                      <label htmlFor="urlname" className=" overlay-link-label">
                        URL name
                      </label>
                      <input
                        type="text"
                        className=" overlay-input "
                        name="urlname"
                        id=""
                      />
                    </div>
                    <button className=" add-another ">
                      <span>+</span> Add another
                    </button>
                  </section>

                  <div className=" link-buttons-container">
                    <button
                      className="overlay-link-cancel "
                      id="cancel"
                      onClick={() => setAddLink(false)}
                    >
                      Cancel
                    </button>{" "}
                    <button
                      className=" overlay-link-button "
                      id="save-link"
                      onClick={() => setAddLink(false)}
                    >
                      Save Link
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}

          {/* profile img  */}
          {profile && (
            <section className="addLink-overlay">
              <div className="overlay-container">
                <section className=" flex flex-col gap-[16px]">
                  <h4 className=" overlay-header">
                    Update your profile image
                    <button
                      type="button"
                      className=" cp "
                      onClick={() => setProfile(false)}
                    >
                      {icons.exit}
                    </button>
                  </h4>
                  <div
                    className="profile-container
              "
                  >
                    {/* Dummy would be replaced by an img tag later  */}
                    <span>{icons.avatardummy}</span>
                    <button className="overlay-profile-button ">
                      Upload profile photo
                    </button>{" "}
                  </div>
                </section>

                <div className=" link-buttons-container">
                  <button
                    className="overlay-link-cancel "
                    id="cancel"
                    onClick={() => setProfile(false)}
                  >
                    Cancel
                  </button>{" "}
                  <button
                    className=" overlay-link-button "
                    id="save-link"
                    onClick={() => setProfile(false)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* delete link  */}
          {deleteLink && (
            <section className="addLink-overlay">
              <div className="overlay-container">
                <section className=" flex flex-col gap-[16px]">
                  <h4 className=" overlay-header">
                    Delete Link
                    <button
                      type="button"
                      className=" cp "
                      onClick={() => setDeleteLink(false)}
                    >
                      {icons.exit}
                    </button>
                  </h4>
                  <p
                    htmlFor="code"
                    className=" text-[#525866] text-[16px] font-[400] leading-[20px]"
                  >
                    This link and its data will be permanently deleted.
                  </p>
                </section>

                <div className=" link-buttons-container">
                  <button
                    className="overlay-link-cancel "
                    id="cancel"
                    onClick={() => setDeleteLink(false)}
                  >
                    Cancel
                  </button>{" "}
                  <button
                    className=" overlay-deletelink-button"
                    id="delete-link"
                    onClick={() => setDeleteLink(false)}
                  >
                    Yes, delete
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="page-container">
          <section className="recentpost-header">
            <h1 className=" page-h-text">
              {recentPosts ? "Home" : "Create a post"}
            </h1>
            {/* show button when post has been made before  */}
            {recentPosts && (
              <button type="button" id="createpost" onClick={handleSwitch}>
                {icons.createpost}Create Post
              </button>
            )}
          </section>
          {/* container  */}
          {recentPosts ? (
            <main className="createpost-container">
              <h2 className="posth-text">Recent Post</h2>
              {userPosts.map((post) => (
                <section className=" recetpost-card" key={post.createdAt}>
                  {/* post information  */}
                  <div className=" recentpost-info">
                    <article>
                      <p className="avatar-dummy">
                        {user?.firstName.slice(0, 1) +
                          user?.lastName.slice(0, 1)}
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
                        onClick={() =>
                          setMenu(menu === post._id ? null : post._id)
                        }
                      >
                        {" "}
                        {icons.menu}
                      </span>
                      {menu === post._id && (
                        <ul>
                          <li onClick={() => handleSharePost(post._id)}>
                            Share Post
                          </li>
                          <li>Edit Post</li>
                          <li
                            className="d"
                            onClick={() => handleDeletePost(post._id)}
                          >
                            Delete Post
                          </li>
                        </ul>
                      )}
                    </p>
                  </div>
                  {/* post write up  */}
                  <p>{post.content}</p>
                  <div onClick={(e) => handleViewPost(e, post._id)}>
                    {/* post images  */}
                    <ImageSkeleton images={post.images} />
                  </div>

                  <span>View Insight</span>
                </section>
              ))}
            </main>
          ) : (
            <main className="createpost-container">
              <section className="createpost-card">
                <div className="createpost-subcard">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Tell a story"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  ></textarea>
                  <button type="button" onClick={() => setSelectImg(true)}>
                    <span>{icons.selectImg}</span>Add Image
                  </button>
                  {/* image preview  */}
                  {imagePreviews.length > 0 && (
                    <div className="imagepreviewcontainer">
                      {imagePreviews.map((src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt={`preview-${index}`}
                          className="imagepreview "
                        />
                      ))}
                    </div>
                  )}
                  {imagePreviews.length > 0 && (
                    <p className="imagepreviewcontainer">
                      Max: 5 images allowed for Business Plan and above, 1 for
                      Free Plan.
                    </p>
                  )}
                  {errorPost && (
                    <p className="error-message">
                      Couldn't Create Post, Please try again.
                    </p>
                  )}
                </div>

                {/* createpost buttons  */}
                <div className=" createpost-buttons-container">
                  <button
                    className="overlay-link-cancel "
                    id="cancelCreatePost"
                    onClick={handleSwitch}
                  >
                    Back
                  </button>{" "}
                  <button
                    className=" overlay-link-button "
                    id="createdpost"
                    onClick={handleSubmit}
                  >
                    {createLoading ? "Creating..." : "Create Post"}
                  </button>
                </div>
              </section>
            </main>
          )}
          {/*  img  select */}
          {selectImg && (
            <section className="addLink-overlay">
              <div className="overlay-container">
                <section className=" flex flex-col gap-[16px]">
                  <h4 className=" overlay-header">
                    Upload Image
                    <button
                      type="button"
                      className=" cp "
                      onClick={() => setSelectImg(false)}
                    >
                      {icons.exit}
                    </button>
                  </h4>
                  <div className="image-select-card">
                    {/* might be replaced later with selected img or just ::before dummy */}
                    <span>{icons.upload}</span>
                    {/* hidden input  */}
                    <input
                      type="file"
                      className="hidden"
                      name="imgselect"
                      id="imgselect"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files).slice(0, 5); // limit to first 5
                        setImages(files);

                        const previews = files.map((file) =>
                          URL.createObjectURL(file)
                        );
                        setImagePreviews(previews);
                      }}
                    />

                    <label for="imgselect">Select Image file</label>
                    <h5>Any JPG, JPEG, PNG, or GIF up to 512MB</h5>
                  </div>
                  <div className="overlay-link-input">
                    <span>{icons.link}</span>
                    <input
                      type="text"
                      placeholder="Type or paste image URL"
                      name="imgLink"
                    />
                  </div>
                </section>

                <div className=" link-buttons-container">
                  <button
                    className="overlay-link-cancel "
                    id="cancel"
                    onClick={() => setSelectImg(false)}
                  >
                    Cancel
                  </button>{" "}
                  <button
                    className=" overlay-link-button "
                    id="save-link"
                    onClick={() => setSelectImg(false)}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
      <footer className="dashFooter">
        <p>&copy; 2025 Advertorial Hub. All Rights Reserved.</p>
        <a href="/Policy">Privacy Policy</a> | <a href="/AboutUs">About Us</a>
      </footer>
    </div>
  );
}
