import { motion } from 'framer-motion';
import AnimatedPoint from './AnimatedPoint';
import { useInView } from 'react-intersection-observer';
import { paragraphs, commitments, closingStatement } from './AboutConfig';
import { Color } from '../../colors';

export default function ExpertiseSection() {
  const { ref: bodyRef, inView: bodyInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: closingRef, inView: closingInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div style={{
      padding: '4rem 2rem',
      background: 'rgba(255, 255, 255, 0.05)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      color: '#f0f0f0',
      fontFamily: 'sans-serif',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      borderRadius: '16px'
    }}>

      {/* Body copy */}
      <motion.div
        ref={bodyRef}
        initial={{ opacity: 0, y: 30 }}
        animate={bodyInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ maxWidth: 900 }}
      >
        {paragraphs.map((para, index) => (
          <p
            key={index}
            style={{
              fontSize: index === 0 ? '1.3rem' : '1.1rem',
              fontWeight: index === 0 ? 400 : 300,
              color: index === 0 ? '#ffffff' : '#cfcfcf',
              lineHeight: 1.8,
              marginBottom: '1.75rem',
            }}
          >
            {para}
          </p>
        ))}
      </motion.div>

      {/* Our Commitment */}
      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        <span
          style={{
            borderBottom: `3px solid ${Color.blueGrey}`,
            paddingBottom: 2,
          }}
        >
          Our Commitment
        </span>
      </h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
        width: '100%',
        maxWidth: '900px',
        marginBottom: '2rem',
      }}>
        {commitments.map((item, index) => (
          <AnimatedPoint key={index} text={item} variant="pill" />
        ))}
      </div>

      {/* Closing statement */}
      <motion.div
        ref={closingRef}
        initial={{ opacity: 0, y: 40 }}
        animate={closingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          marginTop: '3rem',
          padding: '3rem 2rem',
          maxWidth: '900px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '20px',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#e0e0e0',
          fontSize: '1.1rem',
          lineHeight: '1.8',
          fontWeight: 300,
          textAlign: 'center',
          boxShadow: '0 0 40px rgba(255, 165, 0, 0.05)',
        }}
      >
        <p>
          {closingStatement}
        </p>
      </motion.div>
    </div>
  );
}