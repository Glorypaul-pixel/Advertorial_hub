import { useState, useEffect } from "react";

export default function MakeAds({
  show,
  onClose,
  adPost,
  onSubmitAd,
  makeAdLoading,
  statesAndCapitals,
}) {
  const [adTarget, setAdTarget] = useState("");
  const [adMinAge, setAdMinAge] = useState("");
  const [adMaxAge, setAdMaxAge] = useState("");
  const [adLocation, setAdLocation] = useState("");
  const [adGender, setAdGender] = useState("");
  const [error, setError] = useState("");
  const [consoleError, setConsoleError] = useState("");

  // Reset form when modal closes
  const resetForm = () => {
    setAdTarget("");
    setAdMinAge("");
    setAdMaxAge("");
    setAdLocation("");
    setAdGender("");
    setError("");
    setConsoleError("");
  };

  // Handle modal close
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!adTarget || !adMinAge || !adMaxAge || !adLocation || !adGender) {
      setError("Please fill all ad targeting fields.");
      return;
    }
    if (parseInt(adMinAge) > parseInt(adMaxAge)) {
      setError("Minimum age cannot be greater than maximum age.");
      return;
    }

    setError(""); // Clear form validation errors on valid submission

    onSubmitAd({
      target: adTarget,
      minAge: adMinAge,
      maxAge: adMaxAge,
      location: adLocation,
      gender: adGender,
    });
  };

  // Override console.error to capture error messages
  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      originalConsoleError(...args);

      // Convert each argument to string or JSON pretty print if object
      const message = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
        )
        .join(" ");

      setConsoleError(message);
    };

    // Cleanup on unmount
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  if (!show) return null;

  return (
    <section className="addLink-overlay">
      <div
        className="overlay-container mild-zoom"
        data-aos="zoom-in"
        data-aos-delay="100"
        data-aos-duration="500"
      >
        <section>
          <p className="pc" onClick={handleClose}>
            ← Back
          </p>
          <h4 className="overlay-headerAds">
            Make Ads
            <button type="button" className="cp" onClick={handleClose}>
              ×
            </button>
          </h4>

          {/* ADS INFO CONTAINER */}
          {adPost && (
            <div className="ads-info-container">
              <h5>{adPost.title}</h5>
              <p>
                {new Date(adPost.createdAt)
                  .toLocaleString("en-US", {
                    day: "numeric",
                    month: "long",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(",", " at")}
              </p>
              <ul>
                <li>
                  👁️ <span>{adPost.views?.length || 0}</span>
                </li>
                <li>
                  👍 <span>{adPost.likes || 0}</span>
                </li>
                <li>
                  👎 <span>{adPost.dislikes || 0}</span>
                </li>
              </ul>
            </div>
          )}

          {/* ADS DROPDOWN CONTAINER */}
          <div className="ads-dropdown-container">
            <div>
              <label htmlFor="target">Target</label>
              <select
                value={adTarget}
                onChange={(e) => setAdTarget(e.target.value)}
              >
                <option value="">Select a Target</option>
                <option value="students">Students</option>
                <option value="professionals">Professionals</option>
              </select>
            </div>

            <section>
              <div>
                <label>Minimum Age</label>
                <select
                  value={adMinAge}
                  onChange={(e) => setAdMinAge(e.target.value)}
                >
                  <option value="">Select min age</option>
                  {[...Array(100)].map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Maximum Age</label>
                <select
                  value={adMaxAge}
                  onChange={(e) => setAdMaxAge(e.target.value)}
                >
                  <option value="">Select max age</option>
                  {[...Array(100)].map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            <div>
              <label>Location</label>
              <select
                value={adLocation}
                onChange={(e) => setAdLocation(e.target.value)}
              >
                <option value="">Select a location</option>
                {statesAndCapitals.map(({ state }) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Gender</label>
              <select
                value={adGender}
                onChange={(e) => setAdGender(e.target.value)}
              >
                <option value="">Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>
        </section>

        {/* ERROR MESSAGE */}
        {(error || consoleError) && (
          <p
            className="error-message"
            role="alert"
            aria-live="assertive"
            style={{ whiteSpace: "pre-wrap" }} // to preserve JSON formatting
          >
            {error || consoleError}
          </p>
        )}

        {/* SHOW BUTTONS ONLY IF NO CONSOLE ERROR */}
        {!consoleError && (
          <div className="link-buttons-container">
            <button className="overlay-link-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button
              className="overlay-link-button"
              onClick={handleSubmit}
              disabled={makeAdLoading}
            >
              {makeAdLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .addLink-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .overlay-container {
          background: white;
          border-radius: 8px;
          padding: 20px 25px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        .overlay-headerAds {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 700;
          font-size: 1.5rem;
          margin-bottom: 15px;
        }
        .overlay-headerAds button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          line-height: 1;
        }
        .ads-info-container h5 {
          margin: 0;
          margin-bottom: 5px;
        }
        .ads-info-container p {
          margin: 0;
          margin-bottom: 10px;
          color: #555;
        }
        .ads-info-container ul {
          list-style: none;
          padding-left: 0;
          display: flex;
          gap: 15px;
          margin: 0;
        }
        .ads-info-container ul li {
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .ads-dropdown-container > div,
        .ads-dropdown-container section > div {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
        }
        select {
          width: 100%;
          padding: 6px 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        section > section {
          display: flex;
          gap: 15px;
        }
        .link-buttons-container {
          margin-top: 15px;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .overlay-link-cancel,
        .overlay-link-button {
          padding: 10px 20px;
          font-weight: 600;
          border-radius: 5px;
          border: none;
          cursor: pointer;
        }
        .overlay-link-cancel {
          background-color: #ccc;
          color: #333;
        }
        .overlay-link-button {
          background-color: #0070f3;
          color: white;
          transition: background-color 0.2s ease;
        }
        .overlay-link-button:hover:not(:disabled) {
          background-color: #005bb5;
        }
        .overlay-link-button:disabled {
          background-color: #8ab4f8;
          cursor: not-allowed;
        }
        .pc {
          cursor: pointer;
          color: #0070f3;
          margin-bottom: 10px;
          user-select: none;
        }
        /* ERROR MESSAGE STYLE */
        .error-message {
          color: #b00020;
          font-weight: 700;
          margin: 15px 0 0 0;
          padding: 10px;
          border: 1px solid #b00020;
          background-color: #fddede;
          border-radius: 5px;
          text-align: center;
          white-space: pre-wrap;
        }
      `}</style>
    </section>
  );
}
