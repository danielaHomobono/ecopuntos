'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TextoAnimado({ frases }) {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % frases.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, [frases.length]);

  return (
    <div className="relative h-20 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={indice}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute text-center text-lg font-medium text-[#4caf50] px-4"
        >
          {frases[indice]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
