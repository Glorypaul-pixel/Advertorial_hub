"use client";
import { useRef, useState } from "react";
import { icons } from "../../lib/Icons";
// import "../styles/Seetingshome.css";

export default function HomePage() {
  const [showList, setShowList] = useState(false);
  const [addLink, setAddLink] = useState(false);
  const [profile, setProfile] = useState(false);
  const [deleteLink, setDeleteLink] = useState(false);

  // post progress states
  const [createPost, setCreatePost] = useState(false);
  const [selectImg, setSelectImg] = useState(false);
  const [recentPosts, setRecentPost] = useState(false);
  const [menu, setMenu] = useState(false);

  // handling switch on post progress
  const handleSwitch = (e) => {
    e.preventDefault();
    if (e.target.id === "createpost") {
      setCreatePost(true);
      setRecentPost(false);
    } else if (e.target.id === "createdpost") {
      setCreatePost(true);
      setRecentPost(true);
    }
  };
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
                    <span
                      onClick={() => setShowList(true)}
                      className=" cursor-pointer"
                    >
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
                <section className="flex flex-col items-center justify-center gap-[20px]">
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
                    className=" cursor-pointer "
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
                      className=" cursor-pointer "
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
                      className=" cursor-pointer "
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
              <section className=" recetpost-card">
                <h2 className="posth-text">Recent Post</h2>
                {/* post information  */}
                <div className=" recentpost-info">
                  <article>
                    {/* would be replaced later to img  */}
                    <span>{icons.avatardummy2}</span>
                    <p>
                      Chudi Victor <span>Just now</span>
                    </p>
                  </article>
                  <p className="recentpost-menu">
                    <span onClick={() => setMenu(!menu)}> {icons.menu}</span>
                    {menu && (
                      <ul>
                        <li>Share Post</li>
                        <li>Edit Post</li>
                        <li className="d">Delete Post</li>
                      </ul>
                    )}
                  </p>
                </div>
                {/* post write up  */}
                <p>
                  Moo Deng- a purple-pink pygmy hippo born this summer at a zoo
                  in Thailand and whose name means “bouncing pig”- has taken the
                  internet by storm. That might have a lot of folks wondering,
                  what exactly is pygmy hippo, anyway? Find out more about these
                  fascinating creatures and what makes them so unique
                </p>

                {/* post images  */}
                <div className="post-image">
                  <img src="" alt="empty now" />
                  <img src="" alt="empty now" />
                </div>
                <span>View Insight</span>
              </section>
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
                  ></textarea>
                  <button type="button" onClick={() => setSelectImg(true)}>
                    <span>{icons.selectImg}</span>Add Image
                  </button>
                </div>

                {/* createpost buttons  */}
                <div className=" createpost-buttons-container">
                  <button
                    className="overlay-link-cancel "
                    id="cancel"
                    onClick={() => setCreatePost(false)}
                  >
                    Back
                  </button>{" "}
                  <button
                    className=" overlay-link-button "
                    id="createdpost"
                    onClick={handleSwitch}
                  >
                    Next
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
                      className=" cursor-pointer "
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
                      id=""
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
    </div>
  );
}
