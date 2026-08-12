import { AnimatePresence, motion } from 'framer-motion';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import {
  useGetProjectsQuery,
  useGetSkillsQuery,
  useGetExperienceQuery,
} from '../../store/api/portfolioApi';
import Navbar from '../../components/public/Navbar';
import SectionHeader from '../../components/public/SectionHeader';
import ProjectCard from '../../components/public/ProjectCard';
import ContactForm from '../../components/public/ContactForm';
import Footer from '../../components/public/Footer';

const SECTIONS = ['hero', 'about', 'projects', 'experience', 'contact'];
const STACK = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'MongoDB',
  'Express',
  'Tailwind CSS',
  'Docker',
  'Redux',
  'PostgreSQL',
  'GraphQL',
  'AWS',
];
const SOCIALS = [
  { href: 'mailto:you@email.com', label: '✉ Email' },
  { href: 'https://github.com', label: '⌥ GitHub' },
  { href: 'https://linkedin.com', label: 'in LinkedIn' },
  { href: 'https://twitter.com', label: '𝕏 Twitter' },
];

const FV = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any };
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { ...FV, delay },
});
const scrollFade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { ...FV, delay },
});

export default function Home() {
  useScrollSpy(SECTIONS);
  const { data: projectsData, isLoading: pLoad } = useGetProjectsQuery({});
  const { data: skillsData, isLoading: sLoad } = useGetSkillsQuery();
  const { data: expData, isLoading: eLoad } = useGetExperienceQuery();

  return (
    <div className="bg-bg text-white font-body min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-end px-6 md:px-[60px] pb-16 md:pb-20 pt-24 relative overflow-hidden"
      >
        {/* Orbs */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 600,
            height: 600,
            background:
              'radial-gradient(circle,rgba(100,255,218,.08) 0%,transparent 70%)',
            filter: 'blur(80px)',
            top: -96,
            right: -96,
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 400,
            height: 400,
            background:
              'radial-gradient(circle,rgba(247,197,159,.06) 0%,transparent 70%)',
            filter: 'blur(80px)',
            bottom: 96,
            left: 192,
          }}
        />

        {/* Availability badge */}
        <motion.div
          {...fadeUp(0.1)}
          className="inline-flex items-center gap-2 border border-accent/20 bg-accent/5 px-4 py-2 font-mono text-[12px] text-accent mb-7 self-start"
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-accent inline-block"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          Available for opportunities
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          {...fadeUp(0.25)}
          className="font-mono text-[13px] text-accent tracking-[0.2em] uppercase mb-5"
        >
          Full-Stack Developer · MERN Stack
        </motion.p>

        {/* Heading */}
        <motion.h1
          className="font-display font-extrabold leading-[0.9] tracking-[-0.03em] mb-8"
          style={{ fontSize: 'clamp(64px, 10vw, 140px)' }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          Building
          <br />
          <span className="text-accent">Digital</span>
          <br />
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: '1px rgba(232,234,240,0.3)' }}
          >
            Experiences
          </span>
        </motion.h1>

        {/* Bottom row */}
        <motion.div
          {...fadeUp(0.7)}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        >
          <p className="max-w-sm text-muted text-[16px] leading-[1.7]">
            I craft{' '}
            <strong className="text-white font-medium">
              fast, scalable, and beautiful
            </strong>{' '}
            web applications — from pixel-perfect frontends to resilient backend
            systems. Based in <span className="text-accent2">India</span>,
            working globally.
          </p>
          <div className="flex gap-8 md:gap-12">
            {[
              ['4+', 'Years exp.'],
              ['30+', 'Projects'],
              ['15+', 'Clients'],
            ].map(([num, lbl], i) => (
              <motion.div
                key={lbl}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...FV, delay: 0.85 + i * 0.1 }}
                className="text-right"
              >
                <div className="font-display font-extrabold text-[42px] leading-none text-white">
                  {num}
                </div>
                <div className="font-mono text-[12px] text-muted uppercase tracking-[0.1em]">
                  {lbl}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div
        className="overflow-hidden border-y border-border/20 py-4"
        style={{ ['--tw-bg-opacity' as any]: 1 }}
        onMouseEnter={(e) =>
          (
            e.currentTarget.querySelector('.marquee-inner') as HTMLElement
          )?.style.setProperty('animation-play-state', 'paused')
        }
        onMouseLeave={(e) =>
          (
            e.currentTarget.querySelector('.marquee-inner') as HTMLElement
          )?.style.setProperty('animation-play-state', 'running')
        }
      >
        <div className="marquee-inner flex w-max animate-marquee">
          {[...STACK, ...STACK].map((s, i) => (
            <span
              key={i}
              className="font-display font-bold text-[13px] text-muted uppercase tracking-[0.2em] px-8 whitespace-nowrap"
            >
              <span className="text-accent mr-8">✦</span>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="py-[140px] px-6 md:px-[60px]">
        <SectionHeader number="01 /" title="About" dimText="Me" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div {...scrollFade(0)}>
            {[
              <>
                Hey, I'm{' '}
                <span className="text-white font-medium">Deepak Singh</span> — a
                full-stack developer with{' '}
                <span className="text-accent">4+ Project</span> of experience
                building web applications that balance technical performance
                with thoughtful UX.
              </>,
              <>
                I specialise in the{' '}
                <span className="text-white font-medium">
                  React / Node.js ecosystem
                </span>
                , and I love working at the intersection of design and
                engineering — writing clean, scalable code that also looks and
                feels great.
              </>,
              <>
                When I'm not coding, I contribute to open source, write
                technical articles, and obsess over typography.
              </>,
            ].map((txt, i) => (
              <motion.p
                key={i}
                className="text-[#8892b0] text-[17px] leading-[1.8] mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...FV, delay: i * 0.12 }}
              >
                {txt}
              </motion.p>
            ))}
            <motion.div
              className="flex gap-4 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector('#projects')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-accent text-bg font-mono text-[13px] font-semibold no-underline hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(100,255,218,1)] transition-all"
              >
                View Projects
              </a>
              <a
                href="/resume.pdf"
                className="px-8 py-3.5 border border-white/20 text-white font-mono text-[13px] no-underline hover:border-accent hover:text-accent transition-all"
              >
                Download CV
              </a>
            </motion.div>
          </motion.div>

          {/* Skills */}
          <div>
            {sLoad ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 bg-surface animate-pulse rounded"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {skillsData?.grouped &&
                  Object.entries(skillsData.grouped).map(
                    ([cat, skills], gi) => (
                      <motion.div
                        key={cat}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ ...FV, delay: gi * 0.1 }}
                      >
                        <div className="font-mono text-[11px] text-accent tracking-[0.2em] uppercase mb-3">
                          {cat}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(skills as any[]).map((s: any, si: number) => (
                            <motion.span
                              key={s._id}
                              className="px-3.5 py-1.5 bg-surface border border-border/20 text-muted font-mono text-[12px] hover:border-accent hover:text-accent transition-all cursor-default"
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: gi * 0.1 + si * 0.04 }}
                              whileHover={{ y: -2 }}
                            >
                              {s.name}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )
                  )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-[140px] px-6 md:px-[60px]">
        <SectionHeader number="02 /" title="Selected" dimText="Projects" />
        {pLoad ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 bg-surface animate-pulse rounded" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(projectsData?.data || []).map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-[140px] px-6 md:px-[60px]">
        <SectionHeader number="03 /" title="Work" dimText="Experience" />
        <div
          className="relative pl-10 ml-4"
          style={{ borderLeft: '1px solid rgba(100,255,218,0.15)' }}
        >
          {eLoad ? (
            <div className="space-y-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 bg-surface animate-pulse ml-10" />
              ))}
            </div>
          ) : (
            (expData?.data || []).map((exp, i) => (
              <motion.div
                key={exp._id}
                className="relative mb-16 last:mb-0 pl-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...FV, delay: i * 0.12 }}
              >
                {/* Dot */}
                <motion.div
                  className="absolute -left-[41px] top-2 w-2.5 h-2.5 rounded-full bg-accent"
                  style={{ boxShadow: '0 0 12px rgba(100,255,218,0.5)' }}
                  animate={
                    exp.current
                      ? { scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="font-mono text-[12px] text-accent tracking-[0.1em] mb-2">
                  {exp.period}
                </div>
                <h3 className="font-display text-[26px] font-bold mb-1">
                  {exp.role}
                </h3>
                <div className="text-[15px] text-muted mb-4">
                  @ <span className="text-accent2">{exp.company}</span>
                  {exp.location && `, ${exp.location}`}
                </div>
                <p className="text-[#6a7494] text-[14px] leading-[1.7] max-w-2xl">
                  {exp.description}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-[140px] px-6 md:px-[60px]">
        <SectionHeader number="04 /" title="Get In" dimText="Touch" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div {...scrollFade(0.1)}>
            <h2
              className="font-display font-extrabold leading-[0.9] tracking-[-0.03em] mb-6"
              style={{ fontSize: 'clamp(48px, 6vw, 96px)' }}
            >
              Let's
              <br />
              <span className="text-accent">Build</span>
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: '1px rgba(232,234,240,0.2)' }}
              >
                Together
              </span>
            </h2>
            <p className="text-muted text-[17px] leading-[1.7] mb-10">
              Open to freelance projects, full-time roles, and interesting
              collaborations. My inbox is always open.
            </p>
            <div className="flex flex-col gap-3">
              {SOCIALS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-[13px] text-muted no-underline flex items-center gap-2 px-6 py-3 border border-border/20 hover:text-accent hover:border-accent transition-all self-start"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...FV, delay: 0.1 + i * 0.07 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div {...scrollFade(0.2)}>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
