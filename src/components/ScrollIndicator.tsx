// components/ScrollIndicator.tsx
import * as React from "react";
import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <>
      <style>
        {`
          .scroll-indicator-wrapper {
            position: absolute;
            bottom: 36px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 3;
          }

          .scroll-indicator {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            color: #ffffff;
            cursor: pointer;
          }

          .scroll-indicator-text {
            font-size: 0.7rem;
            font-weight: 500;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            opacity: 0.75;
            transition: opacity 0.3s ease;
          }

          .scroll-indicator:hover .scroll-indicator-text {
            opacity: 1;
          }

          .scroll-mouse {
            width: 24px;
            height: 38px;
            border: 1.5px solid rgba(255, 255, 255, 0.55);
            border-radius: 13px;
            display: flex;
            justify-content: center;
            padding-top: 6px;
            background: rgba(255, 255, 255, 0.04);
            backdrop-filter: blur(2px);
            box-shadow: 0 0 12px rgba(255, 255, 255, 0.08);
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }

          .scroll-indicator:hover .scroll-mouse {
            border-color: rgba(255, 255, 255, 0.85);
            box-shadow: 0 0 18px rgba(255, 255, 255, 0.18);
          }

          .scroll-dot {
            width: 3.5px;
            height: 7px;
            background: #ffffff;
            border-radius: 2px;
            box-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
          }

          .scroll-chevrons {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
          }

          .scroll-chevron {
            width: 8px;
            height: 8px;
            border-right: 1.5px solid rgba(255, 255, 255, 0.6);
            border-bottom: 1.5px solid rgba(255, 255, 255, 0.6);
            transform: rotate(45deg);
          }

          @media (max-width: 768px) {
            .scroll-indicator-wrapper {
              bottom: 22px;
            }
          }
        `}
      </style>

      <div className="scroll-indicator-wrapper">
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <span className="scroll-indicator-text">Scroll</span>

          <div className="scroll-mouse">
            <motion.div
              className="scroll-dot"
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: [0.45, 0, 0.55, 1],
              }}
            />
          </div>

          <div className="scroll-chevrons">
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="scroll-chevron"
                animate={{ opacity: [0.15, 0.9, 0.15] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}