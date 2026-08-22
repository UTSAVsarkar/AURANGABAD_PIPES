import { motion } from 'framer-motion';
import AnimatedPoint from './AnimatedPoint';
import { useInView } from 'react-intersection-observer';
import { points } from './AboutConfig';
import { Color } from '../../colors';


export default function ExpertiseSection() {
  const { ref, inView } = useInView({
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
      <h2
        style={{
          fontSize: '2.2rem',
          marginBottom: '1rem',
          fontWeight: 700,
          lineHeight: 1.3,
        }}
      >
        <span
          style={{
            borderBottom: `3px solid ${Color.blueGrey}`,
            paddingBottom: 2,
          }}
        >
          25+ Years
        </span>{" "}
        of Manufacturing Excellence
      </h2>

      <p
        style={{
          maxWidth: 850,
          fontSize: "1.2rem",
          color: "#cfcfcf",
          lineHeight: 1.8,
          margin: "0 auto 3rem",
          fontWeight: 300,
        }}
      >
        Manufacturing premium seamless carbon steel and alloy steel pipes &
        tubes for boilers, oil & gas, power plants, automotive, and engineering
        industries.
      </p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: '900px'
      }}>
        {points.map((point, index) => (
          <AnimatedPoint key={index} text={point} />
        ))}
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          marginTop: '4rem',
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
        <p style={{ marginBottom: '1.5rem' }}>
          Our <strong style={{ color: Color.blueGrey }}>seamless carbon steel</strong> and{' '}
          <strong style={{ color: Color.blueGrey }}>alloy steel pipes & tubes</strong> are
          manufactured using advanced production processes and stringent quality
          control, ensuring exceptional strength, dimensional accuracy, and
          reliable performance in demanding industrial environments.
        </p>

        <p>
          <span style={{ fontWeight: 500, color: '#ffffff' }}>AURANGABAD PIPES</span>{' '}
          is committed to delivering products that meet{' '}
          <strong style={{ color: Color.blueGrey }}>international quality standards</strong>,
          serving the <strong style={{ color: Color.blueGrey }}>Boiler</strong>,{' '}
          <strong style={{ color: Color.blueGrey }}>Oil & Gas</strong>,{' '}
          <strong style={{ color: Color.blueGrey }}>Power</strong>,{' '}
          <strong style={{ color: Color.blueGrey }}>Automotive</strong>, and{' '}
          <strong style={{ color: Color.blueGrey }}>Engineering</strong> industries with
          dependable, high-performance piping solutions.
        </p>
      </motion.div>


    </div>
  );
}
