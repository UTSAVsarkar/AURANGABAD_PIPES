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

  // =========================================
  // SHOW POPUP AFTER 4 SECONDS
  // =========================================

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowLeadPopup(true);
    }, 4000);

    return () => clearTimeout(timer);

  }, []);


  const handleNavChange = (item: string) => {

    setActiveNavItem(item);

  };


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

      <Nav
        navItems={navItems}
        activeItem={activeNavItem}
        onNavChange={handleNavChange}
      />

      {renderPage()}


      {/* ==================================================
          LEAD CAPTURE POPUP
      ================================================== */}

      {showLeadPopup && (

        <div className="lead-overlay">

          <div className="lead-popup">

            {/* CLOSE */}

            <button
              className="lead-close"
              onClick={() => setShowLeadPopup(false)}
            >
              ×
            </button>


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

              {/* FIRST + LAST NAME */}

              <div className="lead-row">

                <div className="lead-field">
                  <label>FIRST NAME</label>

                  <input
                    type="text"
                    placeholder="First name"
                  />
                </div>

                <div className="lead-field">
                  <label>LAST NAME</label>

                  <input
                    type="text"
                    placeholder="Last name"
                  />
                </div>

              </div>


              {/* EMAIL */}

              <div className="lead-field">

                <label>EMAIL</label>

                <input
                  type="email"
                  placeholder="you@example.com"
                />

              </div>


              {/* PHONE */}

              <div className="lead-field">

                <label>PHONE NUMBER</label>

                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                />

              </div>


              {/* MESSAGE */}

              <div className="lead-field">

                <label>MESSAGE</label>

                <textarea
                  placeholder="Tell us about your requirement..."
                  rows={3}
                />

              </div>


              {/* SUBMIT */}

              <button
                className="lead-submit"
                onClick={() => {
                  // Submit form here
                  setShowLeadPopup(false);
                }}
              >
                <span>Send Enquiry</span>

                <span className="lead-arrow">
                  ↗
                </span>
              </button>

            </div>

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

        }

        `}
      </style>

    </>
  );
}

export default App;