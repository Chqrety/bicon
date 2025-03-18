// import React from 'react'
import { motion } from 'framer-motion';
import FlippingText from '../../components/FlippingText';
import ModalVersion from '../../components/ModalVersion';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 ">
      <div className="flex flex-col items-center gap-2 text-primary">
        <FlippingText />
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-2xl italic"
        >
          Binary Converter
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-xs text-center lg:text-base"
        >
          is a simple website to convert between Binary, Decimal, Octal,
          Hexadecimal, and Text
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ModalVersion />
      </motion.div>
    </div>
  );
}
