import { Button, Textarea } from '@heroui/react';
import { motion } from 'framer-motion';
import FlippingText from '../../components/FlippingText';
import { useState } from 'react';
import ModalVersion from '../../components/ModalVersion';

export const types = [
  { key: 'binary', label: 'Binary', placeholder: 'e.g. 101010' },
  { key: 'decimal', label: 'Decimal', placeholder: 'e.g. 42' },
  { key: 'octal', label: 'Octal', placeholder: 'e.g. 52' },
  { key: 'hexadecimal', label: 'Hexadecimal', placeholder: 'e.g. 2A' },
  { key: 'text', label: 'Text', placeholder: 'e.g. Hello' },
];
function App() {
  const [active, setActive] = useState<string | null>('binary');
  const [target, setTarget] = useState<string | null>('decimal');
  const [inputValue, setInputValue] = useState('');

  // Fungsi utama untuk mengonversi angka
  const convertValue = (value: string, from: string, to: string): string => {
    if (!value || from === to) return value;

    let decimalValue: number;

    try {
      const cleanedInput = value.replace(/\s+/g, ''); // Hapus semua spasi
      if (from === 'binary') {
        if (to === 'text') {
          return (
            cleanedInput
              .match(/.{1,8}/g) // Pecah menjadi 8-bit
              ?.map((byte) => String.fromCharCode(parseInt(byte, 2))) // Konversi ke karakter ASCII
              .join('') || 'Invalid Binary'
          );
        }
        decimalValue = parseInt(cleanedInput, 2);
      } else if (from === 'decimal') {
        if (to === 'text') {
          return value
            .split(/\s+/) // Pisah angka jika lebih dari satu
            .map((num) => String.fromCharCode(parseInt(num, 10))) // Konversi ke ASCII
            .join('');
        }
        decimalValue = parseInt(value, 10);
      } else if (from === 'octal') {
        if (to === 'text') {
          return value
            .split(/\s+/)
            .map((num) => String.fromCharCode(parseInt(num, 8)))
            .join('');
        }
        decimalValue = parseInt(value, 8);
      } else if (from === 'hexadecimal') {
        if (to === 'text') {
          return (
            cleanedInput
              .match(/.{1,2}/g) // Pecah menjadi dua karakter per byte
              ?.map((hex) => String.fromCharCode(parseInt(hex, 16)))
              .join('') || 'Invalid Hexadecimal'
          );
        }
        decimalValue = parseInt(cleanedInput, 16);
      } else if (from === 'text') {
        return to === 'binary'
          ? value
              .split('')
              .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
              .join(' ')
          : to === 'decimal'
          ? value
              .split('')
              .map((char) => char.charCodeAt(0).toString(10))
              .join(' ')
          : to === 'octal'
          ? value
              .split('')
              .map((char) => char.charCodeAt(0).toString(8))
              .join(' ')
          : to === 'hexadecimal'
          ? value
              .split('')
              .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
              .join(' ')
          : value;
      } else {
        return 'Invalid Input';
      }

      if (to === 'binary') return decimalValue.toString(2);
      if (to === 'decimal') return decimalValue.toString(10);
      if (to === 'octal') return decimalValue.toString(8);
      if (to === 'hexadecimal') return decimalValue.toString(16);
    } catch (error) {
      return 'Error';
    }

    return 'Invalid Conversion';
  };

  const scrollToConvert = () => {
    const target = document.getElementById('convert');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const InvertValue = () => {
    setActive(target);
    setTarget(active);
  };

  const activeType = types.find((type) => type.key === active);

  return (
    <>
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
          className="flex gap-2"
        >
          <ModalVersion />
          <Button color="primary" onPress={scrollToConvert}>
            Let's Calculate
          </Button>
        </motion.div>
      </div>
      <div className="flex flex-col min-h-[70vh] items-center" id="convert">
        <div className="flex flex-col items-center justify-center w-full max-w-screen-xl py-20 bg-white rounded-xl">
          <p className="mb-10 text-lg font-semibold text-center">
            What you want to convert?
          </p>
          <div className="flex flex-col items-start gap-5 md:flex-row">
            <div className="flex flex-col">
              <div className="grid grid-cols-2 mx-3 md:flex md:grid-cols-0">
                {types.map((type) => (
                  <div key={type.key} className="relative">
                    <p
                      onClick={() => setActive(type.key)}
                      className={`px-5 py-2 transition-all rounded-t w-full text-center md:w-fit cursor-pointer
              ${active === type.key ? 'text-primary' : 'text-gray-400'}
              hover:bg-primary/20`}
                    >
                      {type.label}
                    </p>
                    {active === type.key && (
                      <motion.div
                        layoutId="active-border"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Textarea
                className="max-w-lg"
                placeholder={activeType?.placeholder || 'Enter value...'}
                variant="bordered"
                value={inputValue}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (active === 'binary' && /[^01\s]/.test(newValue)) return;
                  setInputValue(newValue);
                }}
              />
            </div>
            {/* swap icon */}
            <div className="flex justify-center w-full md:block md:w-fit">
              <div
                className="p-3 transition-all rounded-full cursor-pointer hover:bg-gray-300 h-fit"
                onClick={() => InvertValue()}
              >
                <img
                  width={20}
                  className="rotate-90"
                  src="/swap.svg"
                  alt="img"
                />
              </div>
            </div>
            {/* gap */}
            <div className="flex flex-col">
              <div className="grid grid-cols-2 mx-3 md:flex md:grid-cols-0">
                {types.map((type) => (
                  <div key={type.key} className="relative">
                    <p
                      onClick={() => setTarget(type.key)}
                      className={`px-5 py-2 transition-all rounded-t w-full text-center md:w-fit cursor-pointer
              ${target === type.key ? 'text-primary' : 'text-gray-400'}
              hover:bg-primary/20`}
                    >
                      {type.label}
                    </p>
                    {target === type.key && (
                      <motion.div
                        layoutId="target-border"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Textarea
                disabled
                variant="flat"
                className="max-w-lg"
                placeholder="..."
                value={convertValue(inputValue, active || '', target || '')}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
