import { motion } from 'framer-motion';
import {
  FlippingText,
  ModalVersion,
  ArithmeticSymbols,
} from '../../components';
import { Button } from '@heroui/button';
import { Select, SelectItem, Textarea } from '@heroui/react';
import { useEffect, useState } from 'react';
// import { SymbolKey } from '../../components/types/Shared';

type SymbolKey = 'addition' | 'subtraction' | 'multiplication' | 'division';

export const types = [
  { key: 'binary', label: 'Binary', placeholder: 'e.g. 101010' },
  { key: 'decimal', label: 'Decimal', placeholder: 'e.g. 42' },
  { key: 'octal', label: 'Octal', placeholder: 'e.g. 52' },
  { key: 'hexadecimal', label: 'Hexadecimal', placeholder: 'e.g. 2A' },
  { key: 'text', label: 'Text', placeholder: 'e.g. Hello' },
];

export const arithmetics = [
  { key: 'addition', label: 'Addition ( + )', symbol: '+' },
  { key: 'subtraction', label: 'Subtraction ( - )', symbol: '-' },
  { key: 'multiplication', label: 'Multiplication ( x )', symbol: 'x' },
  { key: 'division', label: 'Division ( / )', symbol: '/' },
];

export default function Page() {
  const [selectedType, setSelectedType] = useState<FormatType>('binary');
  const [operator, setOperator] = useState<SymbolKey>('addition');
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [result, setResult] = useState('');
  const [detail, setDetail] = useState('');

  const scrollToConvert = () => {
    const target = document.getElementById('convert');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  type FormatType = 'binary' | 'decimal' | 'octal' | 'hexadecimal';

  const parseInput = (value: string, type: FormatType): number => {
    switch (type) {
      case 'binary':
        return parseInt(value, 2);
      case 'octal':
        return parseInt(value, 8);
      case 'decimal':
        return parseInt(value, 10);
      case 'hexadecimal':
        return parseInt(value, 16);
      default:
        return NaN;
    }
  };

  const formatOutput = (value: number, type: FormatType): string => {
    switch (type) {
      case 'binary':
        return value.toString(2);
      case 'octal':
        return value.toString(8);
      case 'decimal':
        return value.toString(10);
      case 'hexadecimal':
        return value.toString(16).toUpperCase();
      default:
        return '';
    }
  };

  const calculate = (
    a: string,
    b: string,
    type: FormatType,
    operator: SymbolKey,
  ): { result: string; detail: string } => {
    const numA = parseInput(a, type);
    const numB = parseInput(b, type);
    let computed = 0;

    switch (operator) {
      case 'addition':
        computed = numA + numB;
        break;
      case 'subtraction':
        computed = numA - numB;
        break;
      case 'multiplication':
        computed = numA * numB;
        break;
      case 'division':
        computed = Math.floor(numA / numB); // bisa kamu sesuaikan
        break;
    }

    const symbolMap = {
      addition: '+',
      subtraction: '-',
      multiplication: '×',
      division: '÷',
    };

    const resultStr = formatOutput(computed, type);
    const aStr = a;
    const bStr = b;
    const maxLength = Math.max(aStr.length, bStr.length, resultStr.length);

    const paddedA = aStr.padStart(maxLength, ' ');
    const paddedB = bStr.padStart(maxLength, ' ');
    const paddedResult = resultStr.padStart(maxLength, ' ');
    const divider = ''.padStart(maxLength, '-');

    const detail = `${paddedA}\n${paddedB}\n${divider}${symbolMap[operator]}\n${paddedResult}`;

    const result = formatOutput(computed, type);

    return { result, detail };
  };

  const currentPlaceholder =
    types.find((t) => t.key === selectedType)?.placeholder || 'Enter value...';

  const validTypes: FormatType[] = [
    'binary',
    'decimal',
    'octal',
    'hexadecimal',
  ];

  const selectedTypeAsFormatType = validTypes.includes(
    selectedType as FormatType,
  )
    ? (selectedType as FormatType)
    : 'binary'; // Default ke 'binary' jika tidak valid

  const handleBinaryInputChange = (
    value: string,
    setValue: (val: string) => void,
  ) => {
    if (selectedType === 'binary') {
      const binaryOnly = value.replace(/[^01]/g, '');
      setValue(binaryOnly);
    } else {
      setValue(value);
    }
  };
  useEffect(() => {
    if (inputA && inputB) {
      const { result, detail } = calculate(
        inputA,
        inputB,
        selectedType,
        operator,
      );
      setResult(result);
      setDetail(detail); // bikin state detail juga ya
    } else {
      setResult('');
      setDetail('');
    }
  }, [inputA, inputB, selectedTypeAsFormatType, operator]);

  return (
    <main>
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
            What you want to calculate?
          </p>
          <div className="flex flex-col w-full px-10 gap-7">
            <div className="flex w-full gap-5">
              <Select
                className="w-full"
                variant="bordered"
                label="Select a type"
                selectedKeys={[selectedType]}
                onChange={(e) => setSelectedType(e.target.value as FormatType)}
              >
                {types.map((type) => (
                  <SelectItem key={type.key}>{type.label}</SelectItem>
                ))}
              </Select>
              <Select
                className="w-full"
                variant="bordered"
                label="Select a arithmetic"
                selectedKeys={[operator]}
                onChange={(e) => setOperator(e.target.value as SymbolKey)}
              >
                {arithmetics.map((arithmetic) => (
                  <SelectItem key={arithmetic.key}>
                    {arithmetic.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex items-center justify-between gap-5">
              <Textarea
                className=""
                placeholder={currentPlaceholder}
                variant="bordered"
                value={inputA}
                onChange={(e) =>
                  handleBinaryInputChange(e.target.value, setInputA)
                }
              />
              <div className="cursor-default">
                <ArithmeticSymbols symbol={operator} />
              </div>
              <Textarea
                className=""
                placeholder={currentPlaceholder}
                variant="bordered"
                value={inputB}
                onChange={(e) =>
                  handleBinaryInputChange(e.target.value, setInputB)
                }
              />
            </div>
            <div className="flex gap-12">
              <div className="flex items-center justify-center w-1/4 text-3xl font-bold border-2 border-neutral-300 bg-neutral-100 rounded-xl">
                {result}
              </div>

              <Textarea
                disabled
                variant="faded"
                className="w-3/4"
                placeholder="..."
                value={`${detail}`}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
