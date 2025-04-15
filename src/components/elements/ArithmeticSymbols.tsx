import { motion, AnimatePresence } from 'framer-motion';

type SymbolKey = 'addition' | 'subtraction' | 'multiplication' | 'division';

interface Props {
  symbol: SymbolKey;
}

export default function ArithmeticSymbol({ symbol }: Props) {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="black"
      stroke="black"
      strokeWidth="8"
    >
      <AnimatePresence mode="wait">
        {symbol === 'addition' && (
          <>
            <motion.rect
              key="vert"
              x="45"
              y="20"
              width="10"
              height="60"
              rx="2"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.rect
              key="hor"
              x="20"
              y="45"
              width="60"
              height="10"
              rx="2"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.3 }}
            />
          </>
        )}

        {symbol === 'subtraction' && (
          <motion.rect
            key="sub"
            x="20"
            y="45"
            width="60"
            height="10"
            rx="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {symbol === 'multiplication' && (
          <>
            <motion.line
              key="diag1"
              x1="25"
              y1="25"
              x2="75"
              y2="75"
              stroke="black"
              strokeWidth="15"
              strokeLinecap="round"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: 'center' }}
            />
            <motion.line
              key="diag2"
              x1="75"
              y1="25"
              x2="25"
              y2="75"
              stroke="black"
              strokeWidth="15"
              strokeLinecap="round"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: 'center' }}
            />
          </>
        )}

        {symbol === 'division' && (
          <>
            <motion.circle
              key="dot1"
              cx="50"
              cy="25"
              r="5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.rect
              key="div-line"
              x="20"
              y="45"
              width="60"
              height="10"
              rx="2"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.circle
              key="dot2"
              cx="50"
              cy="75"
              r="5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </>
        )}
      </AnimatePresence>
    </svg>
  );
}
