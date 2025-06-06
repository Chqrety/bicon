import { Button, Textarea } from '@heroui/react';
import { motion } from 'framer-motion';
import FlippingText from '../../components/elements/FlippingText';
import { useState } from 'react';
import ModalVersion from '../../components/elements/ModalVersion';

export const types = [
  { key: 'binary', label: 'Binary', placeholder: 'e.g. 101010' },
  { key: 'decimal', label: 'Decimal', placeholder: 'e.g. 42' },
  { key: 'octal', label: 'Octal', placeholder: 'e.g. 52' },
  { key: 'hexadecimal', label: 'Hexadecimal', placeholder: 'e.g. 2A' },
  { key: 'text', label: 'Text', placeholder: 'e.g. Hello' },
];

function Steps() {
  const [active, setActive] = useState<string | null>('binary');
  const [target, setTarget] = useState<string | null>('decimal');
  const [inputValue, setInputValue] = useState('');

  // Fungsi utama untuk mengonversi angka
  const convertValue = (value: string, from: string, to: string) => {
    if (!value || from === to)
      return { result: value, steps: ['No conversion needed'] };

    let decimalValue: number;
    let steps: string[] = [];

    try {
      const cleanedInput = value.replace(/\s+/g, '');

      if (from === 'binary') {
        decimalValue = parseInt(cleanedInput, 2);
        if (!(to === 'text')) {
          const reversedBinary = cleanedInput.split('').reverse();
          let stepDetails: string[] = [];

          reversedBinary.forEach((bit, index) => {
            stepDetails.push(`(${bit}×2^${index})`);
          });
          steps.push(`${stepDetails.join(' + ')} = ${decimalValue}`);
          steps.push(`Binary to Decimal: ${cleanedInput} → ${decimalValue}`);
        } else {
          return {
            result:
              cleanedInput
                .match(/.{1,8}/g)
                ?.map((byte) => {
                  const char = String.fromCharCode(parseInt(byte, 2));
                  steps.push(`Binary ${byte} → ASCII '${char}'`);
                  return char;
                })
                .join('') || 'Invalid Binary',
            steps,
          };
        }
      } else if (from === 'decimal') {
        decimalValue = parseInt(value, 10);
        if (to === 'text') {
          return {
            result: value
              .split(/\s+/)
              .map((num) => {
                const char = String.fromCharCode(parseInt(num, 10));
                steps.push(`Decimal ${num} → ASCII '${char}'`);
                return char;
              })
              .join(''),
            steps,
          };
        }
      } else if (from === 'octal') {
        decimalValue = parseInt(cleanedInput, 8);
        if (!(to === 'text')) {
          const reversedOctal = cleanedInput.split('').reverse();
          let stepDetails: string[] = [];

          reversedOctal.forEach((digit, index) => {
            stepDetails.push(`(${digit} × 8^${index})`);
          });

          steps.push(`${stepDetails.join(' + ')} = ${decimalValue}`);
          steps.push(`Octal to Decimal: ${cleanedInput} → ${decimalValue}`);
        } else {
          return {
            result: value
              .split(/\s+/)
              .map((num) => {
                const char = String.fromCharCode(parseInt(num, 8));
                steps.push(`Decimal ${num} → ASCII '${char}'`);
                return char;
              })
              .join(''),
            steps,
          };
        }
      } else if (from === 'hexadecimal') {
        decimalValue = parseInt(cleanedInput, 16);
        if (!(to === 'text')) {
          const reversedHex = cleanedInput.split('').reverse();
          let stepDetails: string[] = [];
          let decimalResult = 0;

          reversedHex.forEach((digit, index) => {
            const decimalValue = parseInt(digit, 16);
            decimalResult += decimalValue * Math.pow(16, index);

            // Menampilkan huruf heksadesimal dalam bentuk aslinya (A-F tidak diubah)
            const displayDigit = /^[A-Fa-f]$/.test(digit)
              ? digit.toUpperCase()
              : digit;
            stepDetails.push(`(${displayDigit} × 16^${index})`);
          });

          steps.push(`${stepDetails.join(' + ')} = ${decimalResult}`);
          steps.push(
            `Hexadecimal to Decimal: ${cleanedInput} → ${decimalResult}`,
          );
        } else {
          return {
            result: value
              .split(/\s+/)
              .map((num) => {
                const char = String.fromCharCode(parseInt(num, 16));
                steps.push(`Decimal ${num} → ASCII '${char}'`);
                return char;
              })
              .join(''),
            steps,
          };
        }
      } else if (from === 'text') {
        steps.push(`Text: '${value}'`);
        const conversions = {
          binary: (char: string) =>
            char.charCodeAt(0).toString(2).padStart(8, '0'),
          decimal: (char: string) => char.charCodeAt(0).toString(10),
          octal: (char: string) => char.charCodeAt(0).toString(8),
          hexadecimal: (char: string) =>
            char.charCodeAt(0).toString(16).padStart(2, '0'),
        };
        return {
          result: value
            .split('')
            .map((char) => {
              const converted =
                conversions[to as keyof typeof conversions](char);
              steps.push(`'${char}' → ${to} ${converted}`);
              return converted;
            })
            .join(' '),
          steps,
        };
      } else {
        return { result: 'Invalid Input', steps };
      }

      const conversions = {
        binary: decimalValue.toString(2),
        decimal: decimalValue.toString(10),
        octal: decimalValue.toString(8),
        hexadecimal: decimalValue.toString(16),
      };

      if (
        (from === 'decimal' || from === 'octal' || from === 'hexadecimal') &&
        to === 'binary'
      ) {
        let quotient = decimalValue;
        let binarySteps: string[] = [];
        let binaryDigits: number[] = [];

        while (quotient > 0) {
          let remainder = quotient % 2;
          binaryDigits.push(remainder);

          if (quotient !== 1) {
            binarySteps.push(
              `(${quotient} ÷ 2 = ${Math.floor(
                quotient / 2,
              )}, remainder = ${remainder})`,
            );
          }

          quotient = Math.floor(quotient / 2);
        }

        let binaryResult = binaryDigits.reverse().join('');
        steps.push(...binarySteps);
        steps.push(`Decimal to Binary: ${decimalValue} → ${binaryResult}`);

        return { result: binaryResult, steps };
      }

      if (
        (from === 'binary' || from === 'decimal' || from === 'hexadecimal') &&
        to === 'octal'
      ) {
        let quotient = decimalValue;
        let octalSteps: string[] = [];
        let octalDigits: number[] = [];

        while (quotient > 0) {
          let remainder = quotient % 8;
          octalDigits.push(remainder);

          if (quotient >= 8) {
            octalSteps.push(
              `(${quotient} ÷ 8 = ${Math.floor(
                quotient / 8,
              )}, remainder = ${remainder})`,
            );
          }

          quotient = Math.floor(quotient / 8);
        }

        let octalResult = octalDigits.reverse().join('');
        steps.push(...octalSteps);
        steps.push(`Decimal to Octal: ${decimalValue} → ${octalResult}`);

        return { result: octalResult, steps };
      }

      if (
        (from === 'binary' || from === 'decimal' || from === 'octal') &&
        to === 'hexadecimal'
      ) {
        let quotient = decimalValue;
        let binarySteps: string[] = [];
        let binaryDigits: number[] = [];

        while (quotient > 1) {
          let remainder = quotient % 2;
          binaryDigits.push(remainder);
          binarySteps.push(
            `(${quotient} ÷ 2 = ${Math.floor(
              quotient / 2,
            )}, remainder = ${remainder})`,
          );
          quotient = Math.floor(quotient / 2);
        }

        binaryDigits.push(quotient);

        let binaryResult = binaryDigits.reverse().join('');
        steps.push(...binarySteps);
        steps.push(`Decimal to Binary: ${decimalValue} → ${binaryResult}`);

        return { result: binaryResult, steps };
      }
      if (
        !(
          (from === 'binary' || from === 'octal' || from === 'hexadecimal') &&
          to === 'decimal'
        )
      ) {
        steps.push(
          `Decimal to ${to}: ${decimalValue} → ${
            conversions[to as keyof typeof conversions]
          }`,
        );
      }

      return { result: conversions[to as keyof typeof conversions], steps };
    } catch (error) {
      return { result: 'Error', steps: ['An error occurred'] };
    }
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
  const conversion = convertValue(inputValue, active || '', target || '');

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-5 ">
        <div className="flex flex-col items-center gap-2 px-10 text-primary">
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
            className="text-sm text-center md:text-base"
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
        <div className="flex flex-col items-center justify-center w-full max-w-sm md:max-w-screen-xl py-20 bg-[#FBFBFB] rounded-xl">
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
                        ${
                          target === type.key ? 'text-primary' : 'text-gray-400'
                        }
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
                value={
                  convertValue(inputValue, active || '', target || '').result
                }
              />
              <ul className="w-64 mt-2 text-sm text-gray-500 lg:w-full lg:max-w-md">
                {conversion.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Steps;
