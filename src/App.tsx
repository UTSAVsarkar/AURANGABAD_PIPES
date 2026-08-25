import React, { useEffect, useState } from 'react';
import Nav from "./components/Nav";
import Home from "./pages/Home";
import AboutUs from './pages/AboutUs/AboutUs';
import Services from './pages/Services/Services';
import ContactWrap from './pages/Contact/ContactWrap';
import Products from './pages/Projects/Products';
import Application from './pages/Application/Application';
import People from './pages/People/People';

const navItems = [
  'Home',
  'About Us',
  'People',
  'Services',
  'Application',
  'Products',
  'Contact'
];

function App() {

  const [activeNavItem, setActiveNavItem] = useState('Home');

  // Lead popup
  const [showLeadPopup, setShowLeadPopup] = useState(false);

  // Lead form loading state
  const [leadLoading, setLeadLoading] = useState(false);

  // =========================================
  // SHOW POPUP AFTER 4 SECONDS
  // =========================================

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowLeadPopup(true);
    }, 4000);

    return () => clearTimeout(timer);

  }, []);


  // =========================================
  // NAVIGATION
  // =========================================

  const handleNavChange = (item: string) => {

    setActiveNavItem(item);

  };


  // =========================================
  // LEAD FORM SUBMIT
  // =========================================

  const handleLeadSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    setLeadLoading(true);

    const form = event.currentTarget;

    const formData = new FormData(form);

    try {

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {

        // Clear the form
        form.reset();

        // Close popup
        setShowLeadPopup(false);

      } else {

        console.error(
          "Web3Forms error:",
          data
        );

        alert(
          data.message ||
          "Something went wrong. Please try again."
        );
      }

    } catch (error) {

      console.error(
        "Submission error:",
        error
      );

      alert(
        "Unable to send your enquiry. Please try again."
      );

    } finally {

      setLeadLoading(false);

    }
  };


  // =========================================
  // RENDER PAGE
  // =========================================

  const renderPage = () => {

    switch (activeNavItem) {

      case 'Home':
        return <Home onNavChange={handleNavChange} />;

      case 'About Us':
        return <AboutUs />;

      case 'People':
        return <People />;

      case 'Services':
        return <Services />;

      case 'Application':
        return <Application />;

      case 'Products':
        return <Products />;

      case 'Contact':
        return <ContactWrap />;

      default:
        return <Home onNavChange={handleNavChange} />;

    }

  };


  return (
    <>

      {/* =========================================
          NAVIGATION
      ========================================= */}

      <Nav
        navItems={navItems}
        activeItem={activeNavItem}
        onNavChange={handleNavChange}
      />


      {/* =========================================
          PAGE
      ========================================= */}

      {renderPage()}


      {/* ==================================================
          LEAD CAPTURE POPUP
      ================================================== */}

      {showLeadPopup && (

        <div className="lead-overlay">

          <div className="lead-popup">

            {/* CLOSE */}

            <button
              type="button"
              className="lead-close"
              onClick={() => setShowLeadPopup(false)}
              disabled={leadLoading}
            >
              ×
            </button>


            {/* ==================================================
                LEAD FORM
            ================================================== */}

            <form onSubmit={handleLeadSubmit}>

              {/* =========================================
                  WEB3FORMS ACCESS KEY
              ========================================= */}

              <input
                type="hidden"
                name="access_key"
                value="016adc29-c890-48ed-a8de-bf434a580123"
              />


              {/* =========================================
                  CONSTANT EMAIL SUBJECT
              ========================================= */}

              <input
                type="hidden"
                name="subject"
                value="New Website Enquiry"
              />


              {/* =========================================
                  BOT PROTECTION
              ========================================= */}

              <input
                type="checkbox"
                name="botcheck"
                style={{ display: "none" }}
              />


              {/* CONTENT */}

              <div className="lead-content">

                <div className="lead-eyebrow">
                  LET'S CONNECT
                </div>


                <h2>
                  Tell us about
                  <br />
                  <span>your project.</span>
                </h2>


                <p className="lead-description">
                  Share your details and we'll get back to you shortly.
                </p>


                {/* =========================================
                    FIRST + LAST NAME
                ========================================= */}

                <div className="lead-row">

                  <div className="lead-field">

                    <label>
                      FIRST NAME
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      required
                      disabled={leadLoading}
                    />

                  </div>


                  <div className="lead-field">

                    <label>
                      LAST NAME
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      required
                      disabled={leadLoading}
                    />

                  </div>

                </div>


                {/* =========================================
                    EMAIL
                ========================================= */}

                <div className="lead-field">

                  <label>
                    EMAIL
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    disabled={leadLoading}
                  />

                </div>


                {/* =========================================
                    PHONE
                ========================================= */}

                <div className="lead-field">

                  <label>
                    PHONE NUMBER
                  </label>

                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="+91 XXXXX XXXXX"
                    disabled={leadLoading}
                  />

                </div>


                {/* =========================================
                    MESSAGE
                ========================================= */}

                <div className="lead-field">

                  <label>
                    MESSAGE
                  </label>

                  <textarea
                    name="message"
                    placeholder="Tell us about your requirement..."
                    rows={3}
                    required
                    disabled={leadLoading}
                  />

                </div>


                {/* =========================================
                    SUBMIT
                ========================================= */}

                <button
                  type="submit"
                  className="lead-submit"
                  disabled={leadLoading}
                >

                  <span>
                    {leadLoading
                      ? "Sending..."
                      : "Send Enquiry"
                    }
                  </span>


                  {!leadLoading && (

                    <span className="lead-arrow">
                      ↗
                    </span>

                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* ==================================================
          STYLES
      ================================================== */}

      <style>
        {`

        /* =========================================
           OVERLAY
        ========================================= */

        .lead-overlay {

          position: fixed;

          inset: 0;

          z-index: 10000;

          display: flex;

          align-items: center;

          justify-content: center;

          padding: 20px;

          background:
            rgba(0, 0, 0, 0.65);

          backdrop-filter:
            blur(12px);

          -webkit-backdrop-filter:
            blur(12px);

          animation:
            leadOverlayIn
            0.4s ease forwards;

        }


        /* =========================================
           POPUP
        ========================================= */

        .lead-popup {

          position: relative;

          width: 100%;

          max-width: 480px;

          max-height: 90vh;

          overflow-y: auto;

          background:

            linear-gradient(
              145deg,
              rgba(28, 28, 28, 0.98),
              rgba(10, 10, 10, 0.98)
            );

          border:

            1px solid
            rgba(255, 255, 255, 0.12);

          border-radius: 22px;

          box-shadow:

            0 40px 120px
            rgba(0, 0, 0, 0.65);

          animation:

            leadPopupIn
            0.55s
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            )
            forwards;

        }


        /* =========================================
           CLOSE
        ========================================= */

        .lead-close {

          position: absolute;

          top: 18px;

          right: 18px;

          z-index: 2;

          width: 34px;

          height: 34px;

          display: flex;

          align-items: center;

          justify-content: center;

          border: none;

          border-radius: 50%;

          background:

            rgba(255,255,255,0.06);

          color:

            rgba(255,255,255,0.65);

          font-size: 22px;

          cursor: pointer;

          transition: 0.25s ease;

        }


        .lead-close:hover {

          background:

            rgba(255,255,255,0.12);

          color: white;

          transform:
            rotate(90deg);

        }


        .lead-close:disabled {

          cursor: not-allowed;

          opacity: 0.5;

        }


        /* =========================================
           CONTENT
        ========================================= */

        .lead-content {

          padding: 42px;

        }


        .lead-eyebrow {

          margin-bottom: 12px;

          font-size: 10px;

          font-weight: 500;

          letter-spacing: 3px;

          color:

            rgba(255,255,255,0.45);

        }


        .lead-content h2 {

          margin: 0;

          font-size: 34px;

          line-height: 1.08;

          font-weight: 500;

          letter-spacing: -1.5px;

          color: white;

        }


        .lead-content h2 span {

          color:

            rgba(255,255,255,0.42);

        }


        .lead-description {

          margin:

            16px 0 28px;

          max-width: 360px;

          font-size: 13px;

          line-height: 1.6;

          color:

            rgba(255,255,255,0.5);

        }


        /* =========================================
           FORM
        ========================================= */

        .lead-row {

          display: flex;

          gap: 14px;

        }


        .lead-row .lead-field {

          flex: 1;

          min-width: 0;

        }


        .lead-field {

          margin-bottom: 18px;

        }


        .lead-field label {

          display: block;

          margin-bottom: 7px;

          font-size: 9px;

          letter-spacing: 2px;

          color:

            rgba(255,255,255,0.4);

        }


        .lead-field input,
        .lead-field textarea {

          width: 100%;

          box-sizing: border-box;

          padding: 12px 13px;

          border:

            1px solid
            rgba(255,255,255,0.1);

          border-radius: 9px;

          outline: none;

          background:

            rgba(255,255,255,0.045);

          color: white;

          font-family: inherit;

          font-size: 13px;

          transition:
            border 0.25s ease,
            background 0.25s ease;

        }


        .lead-field textarea {

          resize: none;

        }


        .lead-field input::placeholder,
        .lead-field textarea::placeholder {

          color:

            rgba(255,255,255,0.25);

        }


        .lead-field input:focus,
        .lead-field textarea:focus {

          border-color:

            rgba(255,255,255,0.3);

          background:

            rgba(255,255,255,0.07);

        }


        .lead-field input:disabled,
        .lead-field textarea:disabled {

          opacity: 0.6;

          cursor: not-allowed;

        }


        /* =========================================
           SUBMIT
        ========================================= */

        .lead-submit {

          width: 100%;

          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-top: 8px;

          padding: 14px 16px;

          border: none;

          border-radius: 10px;

          background: white;

          color: black;

          font-size: 13px;

          font-weight: 500;

          cursor: pointer;

          transition: 0.25s ease;

        }


        .lead-submit:hover {

          transform:
            translateY(-2px);

          box-shadow:

            0 10px 30px
            rgba(255,255,255,0.12);

        }


        .lead-submit:disabled {

          cursor: not-allowed;

          opacity: 0.6;

          transform: none;

          box-shadow: none;

        }


        .lead-arrow {

          font-size: 18px;

          transition:
            transform 0.25s ease;

        }


        .lead-submit:hover
        .lead-arrow {

          transform:
            translate(3px,-3px);

        }


        /* =========================================
           ANIMATIONS
        ========================================= */

        @keyframes leadOverlayIn {

          from {

            opacity: 0;

          }

          to {

            opacity: 1;

          }

        }


        @keyframes leadPopupIn {

          from {

            opacity: 0;

            transform:
              translateY(35px)
              scale(0.94);

          }

          to {

            opacity: 1;

            transform:
              translateY(0)
              scale(1);

          }

        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 600px) {

          .lead-content {

            padding: 32px 24px;

          }


          .lead-content h2 {

            font-size: 29px;

          }


          .lead-popup {

            max-height: 92vh;

          }


          .lead-row {

            flex-direction: column;

            gap: 0;

          }

        }

        `}
      </style>

    </>
  );
}

export default App;