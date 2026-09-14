import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  text: string;
  variant?: 'list' | 'pill';
}

export default function AnimatedPoint({ text, variant = 'list' }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const pillStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    padding: '0.6rem 1.25rem',
    borderRadius: '999px',
    fontSize: '0.95rem',
    fontWeight: 500,
    color: '#f0f0f0',
    textAlign: 'center',
  };

  const listStyle: React.CSSProperties = {
    background: '#ffffff',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    fontSize: '1rem',
    textAlign: 'left',
    color: '#2c2c2c',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={variant === 'pill' ? pillStyle : listStyle}
    >
      {variant === 'list' ? `• ${text}` : text}
    </motion.div>
  );
}