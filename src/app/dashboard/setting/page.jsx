"use client";
import { icons } from "@/lib/Icons";
import { useState } from "react";
import "../../styles/Settings.css";

export default function SettingsPage() {
  const [changePassword, setChangePassoword] = useState(false);
  const [secureAccount, setSecureAccount] = useState(false);
  const [code, setCode] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const [multiF, setMultiF] = useState(false);

  const [sms, setSms] = useState(false);
  const [call, setCall] = useState(false);

  // handling switing on account change
  const handleSwitch = (e) => {
    if (e.target.id === "savePasswordChange") {
      setChangePassoword(false);
      setSecureAccount(true);
      setCode(false);
    } else if (e.target.id === "secure") {
      setChangePassoword(false);
      setSecureAccount(false);
      setCode(true);
    }
  };

  // handling switching on mode of code recieval
  const handleSwitchFormat = (e) => {
    if (e.target.id === "sms") {
      setSms(true);
      setCall(false);
    } else if (e.target.id === "call") {
      setSms(false);
      setCall(true);
    }
  };

  return (
    <div>
      <h1 className="heading-text ">Settings</h1>
      {/* container  */}
      <main className=" setting-container">
        {/* my information  */}
        <section className=" my-information">
          <h4 className=" information-header  ">My Information</h4>
          <form className="settings-form">
            <section className=" settings-subform">
              <input
                type="text"
                className="input-name"
                name=""
                id=""
                placeholder="Name"
              />
              <div className=" subform">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  type="text"
                  className=" input-email"
                  name="email"
                  id=""
                  placeholder=""
                />
              </div>

              <p className="email-msg">
                Your email can’t be changed as you signed up using your Google
                account.
              </p>
            </section>
            <button className=" button-inactive">Save Changes</button>
          </form>
        </section>

        {/* security  */}
        <section className=" my-information">
          <h4 className=" information-header  ">Security</h4>
          <form className="settings-form">
            <section className=" settings-subform">
              <div className=" subform">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <article>
                  <input
                    type="text"
                    className=" input-password"
                    name="password"
                    id=""
                    placeholder="************"
                  />
                  <button
                    type="button"
                    className=" change-button"
                    onClick={() => setChangePassoword(true)}
                  >
                    Change
                  </button>
                </article>
              </div>

              <div className=" security-detail">
                <p className=" security-textc">
                  Multi-factor Authentication{" "}
                  <span>
                    Multi-factor Authentications adds a layer of security on
                    your account
                  </span>
                </p>
                <span onClick={() => setMultiF(!multiF)}>
                  {!multiF ? icons.click : icons.clickactive}
                </span>
              </div>
            </section>
            <button className={multiF ? " button-active" : " button-inactive"}>
              Save Changes
            </button>
          </form>
        </section>

        {/* management  */}
        <section className=" my-information">
          <h4 className=" information-header  ">Account Management</h4>
          <div className="management-container">
            <p className=" management-textc">
              Plan
              <span>Free</span>
            </p>

            <div className=" management-detail">
              <p className="management-t">
                Upgrade to Pro to enjoy more features
              </p>
              <button className="button-blue">Upgrade to Pro</button>
            </div>
          </div>
        </section>

        {/* delete account  */}
        <section className="management-container">
          <p className=" management-textc">
            Delete Account
            <span>Permanently delete your account</span>
          </p>

          <div className=" management-detail">
            <button
              type="button"
              onClick={() => setDeleteAccount(true)}
              className="delete-accountB"
            >
              Delete my account
            </button>
          </div>
        </section>
      </main>
      {/* change password  */}
      {changePassword && (
        <section className="settings-overlay">
          <div className="overlay-container">
            <h4 className=" overlay-header">
              Change Password{" "}
              <button
                type="button"
                className=" cursor-pointer "
                onClick={() => setChangePassoword(false)}
              >
                {icons.exit}
              </button>
            </h4>
            <form action="" className="  overlay-form1">
              <section className="  overlay-form2">
                {/* old password  */}
                <div className="  overlay-form3 ">
                  <label htmlFor="password" className=" overlay-label ">
                    Enter password
                  </label>
                  <input
                    type="text"
                    className=" overlay-input  "
                    name="password"
                    id=""
                  />
                </div>
                {/* new password  */}
                <div className="  overlay-form3 ">
                  <label htmlFor="password" className=" overlay-label">
                    Enter new password
                  </label>
                  <input
                    type="text"
                    className=" overlay-input "
                    name="password"
                    id=""
                  />
                </div>
                {/* new password  */}
                <div className="  overlay-form3 ">
                  <label htmlFor="password" className=" overlay-label">
                    Re-enter new password
                  </label>
                  <input
                    type="text"
                    className=" overlay-input "
                    name="password"
                    id=""
                  />
                </div>
              </section>
              <button
                className="button-blue overlay-button "
                id="savePasswordChange"
                onClick={handleSwitch}
              >
                Save Change
              </button>
            </form>
          </div>
        </section>
      )}

      {/* secure account  */}
      {secureAccount && (
        <section className="settings-overlay">
          <div className="overlay-container">
            <h4 className=" overlay-header">
              Secure Your Account
              <button
                type="button"
                className=" cursor-pointer "
                onClick={() => setSecureAccount(false)}
              >
                {icons.exit}
              </button>
            </h4>
            <form action="" className="  overlay-form1">
              <section className="  overlay-form2">
                <div className="  overlay-form3 ">
                  <label htmlFor="mobilenumber" className=" overlay-label">
                    Phone number
                  </label>
                  <input
                    type="number"
                    className=" overlay-input "
                    name="mobilenumber"
                    id=""
                  />
                </div>
                {/* code format  */}
                <div className="  overlay-form3 ">
                  <p className=" overlay-label">
                    How would you prefer to receive your code?
                  </p>
                  <div className=" code-container">
                    <button
                      type="button"
                      className={
                        sms ? " preference-active" : " preference-inactive"
                      }
                      onClick={handleSwitchFormat}
                      id="sms"
                    >
                      SMS
                    </button>
                    <button
                      type="button"
                      className={
                        call ? " preference-active" : " preference-inactive"
                      }
                      onClick={handleSwitchFormat}
                      id="call"
                    >
                      Voice Call
                    </button>
                  </div>
                </div>
              </section>
              <button
                className="button-blue overlay-button"
                type="button"
                onClick={handleSwitch}
                id="secure"
              >
                Continue
              </button>
            </form>
          </div>
        </section>
      )}
      {/* get code  */}
      {code && (
        <section className="settings-overlay">
          <div className="overlay-container">
            <h4 className=" overlay-header">
              Enter the Code
              <button
                type="button"
                className=" cursor-pointer "
                onClick={() => setCode(false)}
              >
                {icons.exit}
              </button>
            </h4>
            <form action="" className="  overlay-form1">
              <section className="  overlay-form2">
                {/* new password  */}
                <div className="  overlay-form3 ">
                  <label htmlFor="code" className=" overlay-label">
                    Enter the 6-digit code
                  </label>
                  <input
                    type="text"
                    className=" overlay-input "
                    name="code"
                    id=""
                  />
                </div>
              </section>
              <div className="new-passc">
                <button
                  className="button-blue  cursor-pointer"
                  type="button"
                  onClick={handleSwitch}
                  id="secure"
                >
                  Continue
                </button>
                <p className="sms-call">
                  Didn’t receive an SMS? <b>Resend</b> or <b>get a call</b>
                </p>
              </div>
            </form>
          </div>
        </section>
      )}
      {deleteAccount && (
        <section className="settings-overlay">
          <div className="overlay-container">
            <section className=" flex flex-col gap-[16px]">
              <h4 className=" overlay-header">
                Delete Your Account
                <button
                  type="button"
                  className=" cursor-pointer "
                  onClick={() => setDeleteAccount(false)}
                >
                  {icons.exit}
                </button>
              </h4>
              <p
                htmlFor="code"
                className=" text-[#525866] text-[16px] font-[400] leading-[20px]"
              >
                This action is permanent. Please be certain you want to delete
                this account, all your data will be permanently deleted and
                visitors will no longer be able to see your profile
              </p>
            </section>
            <section action="" className="  overlay-form1">
              <button className="overlay-delete-button" type="button">
                Delete my account
              </button>
            </section>
          </div>
        </section>
      )}
    </div>
  );
}
