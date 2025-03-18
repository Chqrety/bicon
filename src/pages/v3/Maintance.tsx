import { motion } from 'framer-motion';
import ModalVersion from '../../components/ModalVersion';

export default function Maintance() {
  const text1 = [...'Sabar Bos'];
  const text2 = [...'Lagi Dibikin!'];

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: (delay = 0) => ({
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: delay },
    }),
  };

  const letterVariants = {
    hidden: { rotateX: 90, opacity: 0 },
    visible: {
      rotateX: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-primary">
      <motion.div
        custom={0}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex text-5xl font-bold md:text-9xl"
      >
        {text1.map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className={`inline-block ${char === ' ' ? 'w-4 lg:w-6' : ''}`}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        custom={1}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex mb-10 text-5xl font-bold md:text-9xl"
      >
        {text2.map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className={`inline-block ${char === ' ' ? 'w-4 lg:w-6' : ''}`}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <ModalVersion />
      </motion.div>
    </div>
  );
}
