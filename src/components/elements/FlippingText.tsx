import { motion } from 'framer-motion';

const text = 'BICON'.split('');

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const letterVariants = {
  hidden: { rotateX: 90, opacity: 0 },
  visible: {
    rotateX: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export default function FlippingText() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex font-bold text-8xl md:text-9xl"
    >
      {text.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
