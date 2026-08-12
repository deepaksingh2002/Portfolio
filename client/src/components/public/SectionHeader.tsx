import { motion } from 'framer-motion';

interface Props {
  number: string;
  title: string;
  dimText: string;
}

export default function SectionHeader({ number, title, dimText }: Props) {
  return (
    <motion.div
      className="flex items-end gap-6 mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="font-mono text-[13px] text-accent mb-1 flex-shrink-0">
        {number}
      </span>
      <h2
        className="font-display font-extrabold leading-[0.95] tracking-[-0.02em] flex-shrink-0"
        style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
      >
        {title}
        <br />
        <span
          className="text-transparent"
          style={{ WebkitTextStroke: '1px rgba(232,234,240,0.15)' }}
        >
          {dimText}
        </span>
      </h2>
      <motion.div
        className="flex-1 h-px bg-border/20 mb-3 ml-4"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
}
