"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import ContactForm from "@/components/ContactForm";
import CustomCursor from "@/components/CustomCursor";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

const accentColor = "#CD3232";

// --- Portfolio Data ---
const stats = [
  { label: 'Specialty', value: 'Full', unit: 'Stack', caption: 'Frontend, Backend & Mobile Applications.' },
  { label: 'Projects Delivered', value: '15', unit: '+', caption: 'From real-time platforms to AI tools.' },
  { label: 'Degree', value: 'B.Tech', unit: ' IT', caption: 'Manipal University Jaipur.' },
  { label: 'Core Stack', value: '7', unit: '+', caption: 'Next.js, Flutter, Node, MongoDB & Firebase.' },
];

const skills = [
  { num: '01', category: 'Languages', tools: 'JavaScript (ES6+), TypeScript, Python, Java, HTML5, CSS3' },
  { num: '02', category: 'Frontend & Mobile', tools: 'React.js, Next.js, Flutter, React Native, Tailwind CSS, Material UI' },
  { num: '03', category: 'Backend & Databases', tools: 'Node.js, Firebase, Supabase, MySQL, REST API design, GraphQL' },
  { num: '04', category: 'Testing & DevOps', tools: 'Jest, Cypress, CI/CD (GitHub Actions), Docker (basic), Git/GitHub' },
  { num: '05', category: 'AI-Assisted Dev', tools: 'Cursor, Claude CLI, LLM Prompt Engineering, Gemini API' },
  { num: '06', category: 'Professional', tools: 'MVP Rapid Prototyping, SEO Optimization, UI/UX Design, Agile Workflows, Client Communication' },
];

const familiar = ['Vercel AI SDK', 'Gemini API', 'WebSockets', 'GSAP', 'Figma'];

const roles = [
  {
    range: 'Jan 2026 — Present',
    duration: 'Current',
    role: 'Frontend Developer Intern',
    company: 'Endorphins Entertainment',
    location: 'Noida, India',
    mode: 'Internship',
    bullets: [
      'Develop and maintain production web platforms with React.js and Next.js, sustaining 99%+ uptime and Lighthouse scores above 90; reduced load latency 30% via component modularization.',
      'Cut time-to-market by 40% by embedding Claude CLI and Cursor into daily development workflows.',
      "Beep Bop Boop (STEM Fest): Built official website for India's premier kids' STEM festival (beepbopboopfest.com) with secure payment gateway and event registration modules.",
      'Preschool Platform: Sole developer; built scheduling and content management features with an SEO strategy that grew organic traffic from zero.',
      'Endorphins Corporate: Rebuilt company website using Next.js and Tailwind CSS — sub-second load times, modern design system.',
      'My Temple (Flutter): Developed all frontend UI screens and components for a cross-platform community app, integrating real-time data feeds and localized push notifications.'
    ],
    tags: ['React.js', 'Next.js', 'Flutter', 'Tailwind CSS', 'SEO'],
  }
];

const projectThumbs = ['#1A1C21', '#151519', accentColor, '#1F2227'];
const projects = [
  { num: '01', year: '2026', title: 'SnapBrief (AI Document Intelligence)', mark: 'S', desc: 'Built an AI-powered SaaS tool that processes large PDFs and Word files into context-aware, actionable summaries in under 5 seconds. Designed the backend architecture to securely handle document uploads and interface with the Gemini 2.5 API for rapid data extraction and processing.', tech: ['Next.js', 'Node.js', 'TypeScript', 'Gemini API'], href: 'https://snapbrief-phi.vercel.app/' },
  { num: '02', year: '2026', title: 'The Armoury (Arsenal Fan Platform)', mark: 'A', desc: 'Engineered a high-fidelity mobile application architecture utilizing Flutter for the cross-platform UI and Node.js for custom backend services. Aggregated live match statistics and club news by integrating external REST APIs, leveraging Firebase to manage real-time data synchronization and secure user authentication.', tech: ['Flutter', 'Node.js', 'Firebase', 'REST APIs'], href: 'https://github.com/Yashsharma-12/the-armoury-flutter' },
  { num: '03', year: '2026', title: 'Portfolio', mark: 'P', desc: 'Personal developer portfolio with project showcases, case studies, and live demo links — optimized for performance and SEO.', tech: ['Next.js', 'TypeScript', 'Tailwind CSS'], href: '#' },
].map((p, i) => ({ ...p, thumbBg: projectThumbs[i % projectThumbs.length] }));


const PageContent = ({
  inverted = false,
  onDotClick,
  openSkillIdx,
  onToggleSkill,
  isMaskLayer = false
}: {
  inverted?: boolean,
  onDotClick?: () => void,
  openSkillIdx?: number | null,
  onToggleSkill?: (idx: number) => void,
  isMaskLayer?: boolean
}) => {

  return (
    <>
      {/* --- TOP NAV --- */}
      <nav className={`fixed top-0 inset-x-0 z-50 px-10 py-5 flex items-center justify-between backdrop-blur-md ${inverted ? 'bg-transparent' : 'bg-gradient-to-b from-[#0A0A0B]/90 via-[#0A0A0B]/60 to-transparent'}`}>
        <a href="#top" className={`flex items-center gap-2.5 font-mono text-[13px] font-semibold tracking-wide ${inverted ? 'text-black' : 'text-[#F5F5F5]'}`}>
          <span className={`inline-block w-2.5 h-2.5 rounded-[1px] ${inverted ? 'bg-black' : 'bg-[#CD3232]'}`}></span>
          <span>YASH SHARMA</span>
          <span className={`${inverted ? 'text-black' : 'text-[#F5F5F5]/40'} font-normal`}>/ portfolio</span>
        </a>
        <div className="flex items-center gap-8 font-mono text-xs tracking-widest uppercase hidden md:flex">
          <a href="#about" className={`${inverted ? 'text-black' : 'text-[#F5F5F5]/60 hover:text-[#CD3232]'} transition-colors`}>About</a>
          <a href="#skills" className={`${inverted ? 'text-black' : 'text-[#F5F5F5]/60 hover:text-[#CD3232]'} transition-colors`}>Skills</a>
          <a href="#experience" className={`${inverted ? 'text-black' : 'text-[#F5F5F5]/60 hover:text-[#CD3232]'} transition-colors`}>Work</a>
          <a href="#projects" className={`${inverted ? 'text-black' : 'text-[#F5F5F5]/60 hover:text-[#CD3232]'} transition-colors`}>Projects</a>
          <a href="https://drive.google.com/file/d/1vaZBF1HJIHY6UlvtesnqOxpB0GuhWVZP/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2.5 border transition-all ${inverted ? 'border-black text-black' : 'border-[#CD3232] text-[#CD3232] hover:bg-[#CD3232] hover:text-white'}`}>
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse"></span>
            Resume
          </a>
          <a href="#contact" className={`inline-flex items-center gap-2 px-4 py-2.5 border transition-all ${inverted ? 'border-black text-black' : 'border-[#CD3232] text-[#CD3232] hover:bg-[#CD3232] hover:text-white'}`}>
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse"></span>
            Get in touch
          </a>
        </div>
      </nav>

      {/* --- 01 · HERO --- */}
      <section id="top" className={`min-h-screen px-10 pt-[140px] pb-20 relative flex flex-col justify-between border-b ${inverted ? 'bg-transparent border-black' : 'bg-[#0A0A0B] border-white/10'}`}>
        <div className={`absolute top-[100px] right-10 font-mono text-[11px] tracking-widest text-right leading-loose hidden sm:block ${inverted ? 'text-black' : 'text-[#F5F5F5]/40'} z-10`}>
          <div>LAT 28.6139° N</div>
          <div>LON 77.2088° E</div>
          <div className={`mt-2 ${inverted ? 'text-black' : 'text-[#CD3232]'}`}>AVAILABLE — 2026</div>
        </div>

        {/* Subtle grid backdrop */}
        <div aria-hidden="true" className={`absolute inset-0 bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_30%_40%,black_20%,transparent_70%)] pointer-events-none ${inverted ? 'bg-[linear-gradient(rgba(0,0,0,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.4)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]'}`}></div>

        <div className={`flex items-center gap-4 font-mono text-xs tracking-widest relative z-10 gsap-fade-up ${inverted ? 'text-black' : 'text-[#F5F5F5]/50'}`}>
          <span className={`w-8 h-[1px] ${inverted ? 'bg-black' : 'bg-[#CD3232]'}`}></span>
          <span className={inverted ? 'text-black' : 'text-[#CD3232]'}>/</span>
          <span>INDEX / 00 — INTRODUCTION</span>
        </div>

        <div className="mt-auto relative z-10 max-w-[1600px] gsap-fade-up">
          <div className={`font-mono text-xs tracking-[0.2em] uppercase mb-8 ${inverted ? 'text-black' : 'text-[#F5F5F5]/50'}`}>
            <span className={`mr-2 ${inverted ? 'text-black' : 'text-[#CD3232]'}`}>●</span> Portfolio · 2026 edition
          </div>

          <h1 className={`font-sans font-black text-[clamp(56px,11vw,200px)] leading-[0.88] tracking-tight m-0 ${inverted ? 'text-black' : 'bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent'}`}>
            YASH<br />
            <span className={inverted ? 'text-black' : 'text-[#F5F5F5]/35'}>SHARMA</span><span id={onDotClick ? "easter-egg-dot" : undefined} onClick={onDotClick} className={`relative inline-block cursor-pointer ${inverted ? 'text-black' : 'text-[#CD3232]'}`}>.
              {isMaskLayer && (
                <div
                  className={`absolute bottom-[15%] left-full ml-4 pointer-events-none z-[100] font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 rounded-sm whitespace-nowrap transition-opacity duration-300 bg-black text-white`}
                >
                  Click me
                  <div className={`absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[8px] border-t-transparent border-b-transparent border-r-black`}></div>
                </div>
              )}
            </span>
          </h1>

          <div className="flex flex-wrap gap-16 mt-14 items-end justify-between">
            <div className="max-w-[560px]">
              <div className={`font-mono text-[13px] tracking-widest uppercase mb-4 ${inverted ? 'text-black' : 'text-[#CD3232]'}`}>
                Full-Stack × Mobile Application Engineer
              </div>
              <p className={`font-sans text-[22px] leading-relaxed font-normal m-0 tracking-tight ${inverted ? 'text-black' : 'text-[#F5F5F5]/75'}`}>
                Engineering scalable web platforms and cross-platform mobile experiences with a focus on modern frameworks, clean architecture, and performance.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a href="#projects" className={`inline-flex items-center gap-3 px-7 py-5 font-sans font-medium text-[15px] tracking-wide hover:-translate-y-1 transition-transform ${inverted ? 'border border-black text-black' : 'bg-[#CD3232] text-white'}`}>
                View selected work →
              </a>
              <a href="#contact" className={`inline-flex items-center gap-3 px-7 py-5 bg-transparent border font-sans font-medium text-[15px] tracking-wide transition-colors ${inverted ? 'text-black border-black hover:bg-black/5' : 'text-[#F5F5F5] border-white/25 hover:bg-white/5'}`}>
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className={`mt-20 pt-6 border-t flex items-center justify-between font-mono text-[11px] tracking-widest relative z-10 gsap-fade-up ${inverted ? 'border-black text-black' : 'border-white/10 text-[#F5F5F5]/40'}`}>
          <div className="flex items-center gap-2.5">
            <span className={`inline-block w-[1px] h-6 ${inverted ? 'bg-black' : 'bg-white/30'}`}></span>
            Scroll to explore
          </div>
          <div className="flex gap-8 hidden sm:flex">
            <span>v.2026.07</span>
            <span>© YASH SHARMA</span>
          </div>
        </div>
      </section>

      {/* --- 02 · ABOUT --- */}
      <section id="about" className={`px-10 py-[120px] relative border-b overflow-hidden ${inverted ? 'bg-transparent text-black border-black' : 'bg-[#F1EFEB] text-[#0A0A0B] border-black/10'}`}>
        {inverted && (
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[size:16px_16px] bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]"></div>
        )}
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className={`flex items-baseline gap-8 mb-20 pb-8 border-b flex-wrap gsap-fade-up ${inverted ? 'border-black' : 'border-black/10'}`}>
            <div className={`font-mono text-[56px] font-medium tracking-tight leading-none ${inverted ? 'text-black' : 'text-[#CD3232]'}`}>01</div>
            <div className="flex-1 min-w-[240px]">
              <div className="font-mono text-xs tracking-[0.15em] uppercase mb-3">/ About</div>
              <h2 className="font-sans font-black text-[clamp(40px,6vw,88px)] leading-[0.95] tracking-tight m-0 text-balance">
                A brief on how<br />I think &amp; work<span className={inverted ? 'text-black' : 'text-[#CD3232]'}>.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-[120px] items-start gsap-fade-up">
            <div className="max-w-[720px]">
              <div className="relative mb-8">
                <p className={`invisible font-sans text-[24px] leading-[1.55] font-normal tracking-tight text-pretty`}>
                  I am an Information Technology student and software developer bridging the gap between robust backend architectures and engaging frontend interfaces.
                </p>
                <p className={`absolute top-0 left-0 w-full font-sans text-[24px] leading-[1.55] font-normal tracking-tight text-pretty`}>
                  <span className="about-typewriter-1" data-text="I am an Information Technology student and software developer bridging the gap between robust backend architectures and engaging frontend interfaces."></span>
                  <span className={`about-cursor-1 opacity-0 ml-[2px] ${inverted ? 'text-black' : 'text-[#CD3232]'}`}>_</span>
                </p>
              </div>

              <div className="relative mb-6">
                <p className={`invisible font-sans text-[17px] leading-relaxed font-normal`}>
                  Whether I'm building real-time WebSocket auction platforms or cross-platform Flutter applications for Arsenal fans, I focus heavily on the underlying systems. A beautiful UI only matters if the data flows securely, rapidly, and predictably beneath it.
                </p>
                <p className={`absolute top-0 left-0 w-full font-sans text-[17px] leading-relaxed font-normal ${inverted ? 'text-black' : 'text-[#3A3A3D]'}`}>
                  <span className="about-typewriter-2" data-text="Whether I'm building real-time WebSocket auction platforms or cross-platform Flutter applications for Arsenal fans, I focus heavily on the underlying systems. A beautiful UI only matters if the data flows securely, rapidly, and predictably beneath it."></span>
                  <span className={`about-cursor-2 opacity-0 ml-[2px] ${inverted ? 'text-black' : 'text-[#CD3232]'}`}>_</span>
                </p>
              </div>

              <div className="relative m-0">
                <p className={`invisible font-sans text-[17px] leading-relaxed font-normal`}>
                  Currently pursuing my B.Tech at Manipal University Jaipur while taking on complex development challenges and internships. I thrive in environments that require resource-heavy compilation, simulation, and modern web toolchains.
                </p>
                <p className={`absolute top-0 left-0 w-full font-sans text-[17px] leading-relaxed font-normal ${inverted ? 'text-black' : 'text-[#3A3A3D]'}`}>
                  <span className="about-typewriter-3" data-text="Currently pursuing my B.Tech at Manipal University Jaipur while taking on complex development challenges and internships. I thrive in environments that require resource-heavy compilation, simulation, and modern web toolchains."></span>
                  <span className={`about-cursor-3 opacity-0 ml-[2px] ${inverted ? 'text-black' : 'text-[#CD3232]'}`}>_</span>
                </p>
              </div>
            </div>

            <aside className={`font-mono text-xs tracking-wider border-t pt-6 ${inverted ? 'border-black text-black' : 'border-[#0A0A0B] text-[#0A0A0B]'}`}>
              <div className={`flex justify-between py-3.5 border-b ${inverted ? 'border-black' : 'border-black/10'}`}>
                <span className={`${inverted ? 'text-black' : 'text-[#0A0A0B]/50'} uppercase`}>Based in</span>
                <span>Delhi, India</span>
              </div>
              <div className={`flex justify-between py-3.5 border-b ${inverted ? 'border-black' : 'border-black/10'}`}>
                <span className={`${inverted ? 'text-black' : 'text-[#0A0A0B]/50'} uppercase`}>Degree</span>
                <span>B.Tech IT</span>
              </div>
              <div className={`flex justify-between py-3.5 border-b ${inverted ? 'border-black' : 'border-black/10'}`}>
                <span className={`${inverted ? 'text-black' : 'text-[#0A0A0B]/50'} uppercase`}>University</span>
                <span>Manipal University Jaipur</span>
              </div>
              <div className={`flex justify-between py-3.5 border-b ${inverted ? 'border-black' : 'border-black/10'}`}>
                <span className={`${inverted ? 'text-black' : 'text-[#0A0A0B]/50'} uppercase`}>Status</span>
                <span className={inverted ? 'text-black' : 'text-[#CD3232]'}>● Open to roles</span>
              </div>
            </aside>
          </div>

          <div className={`mt-[120px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] gsap-fade-up ${inverted ? 'bg-transparent' : 'border bg-black/15 border-black/15'}`}>
            {stats.map((s, idx) => (
              <div key={idx} className={`p-8 lg:p-10 flex flex-col gap-3 ${inverted ? 'bg-transparent border border-black' : 'bg-[#F1EFEB]'}`}>
                <div className={`font-mono text-[11px] tracking-[0.12em] uppercase ${inverted ? 'text-black' : 'text-[#0A0A0B]/50'}`}>{s.label}</div>
                <div className="font-sans font-black text-6xl lg:text-7xl leading-none tracking-tight">
                  {s.value}<span className={`text-3xl align-top ml-1 ${inverted ? 'text-black' : 'text-[#CD3232]'}`}>{s.unit}</span>
                </div>
                <div className={`font-sans text-sm leading-relaxed max-w-[200px] ${inverted ? 'text-black' : 'text-[#3A3A3D]'}`}>{s.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 03 · SKILLS --- */}
      <section id="skills" className={`px-10 py-[120px] border-b relative ${inverted ? 'bg-transparent text-black border-black' : 'bg-[#0A0A0B] text-[#F5F5F5] border-white/10'}`}>
        <div className="max-w-[1400px] mx-auto">
          <div className={`flex items-baseline gap-8 mb-16 pb-8 border-b flex-wrap gsap-fade-up ${inverted ? 'border-black' : 'border-white/10'}`}>
            <div className={`font-mono text-[56px] font-medium tracking-tight leading-none ${inverted ? 'text-black' : 'text-[#CD3232]'}`}>02</div>
            <div className="flex-1 min-w-[240px]">
              <div className={`font-mono text-xs tracking-[0.15em] uppercase mb-3 ${inverted ? 'text-black' : 'text-[#F5F5F5]/70'}`}>/ Skills · Stack</div>
              <h2 className="font-sans font-black text-[clamp(40px,6vw,88px)] leading-[0.95] tracking-tight m-0">
                Tools I reach for<br />on the daily<span className={inverted ? 'text-black' : 'text-[#CD3232]'}>.</span>
              </h2>
            </div>
            <p className={`font-sans text-[15px] leading-relaxed max-w-[280px] m-0 hidden md:block ${inverted ? 'text-black' : 'text-[#F5F5F5]/55'}`}>
              A comprehensive toolkit spanning robust backend services to highly interactive frontend frameworks.
            </p>
          </div>

          <div className="mt-8 border-t gsap-fade-up" style={{ borderColor: inverted ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' }}>
            {skills.map((k, idx) => {
              const isOpen = openSkillIdx === idx;
              const toolsList = k.tools.split(', ');

              return (
                <div
                  key={idx}
                  className={`relative group border-b ${inverted ? 'border-black/10' : 'border-white/10'}`}
                  onMouseEnter={() => { if (!isOpen) onToggleSkill?.(idx); }}
                  onMouseLeave={() => { if (isOpen) onToggleSkill?.(idx); }}
                >
                  {/* Accordion Header (Subheading Bar) */}
                  <button
                    onClick={() => onToggleSkill?.(idx)}
                    className={`w-full py-8 flex items-center justify-between font-sans text-2xl md:text-3xl font-bold tracking-tight transition-colors cursor-pointer ${inverted ? 'text-black hover:bg-black/5' : 'text-[#F5F5F5] hover:bg-white/5'}`}
                  >
                    <div className="flex items-center gap-6 md:gap-12 text-left">
                      <span className={`font-mono text-sm font-normal ${inverted ? 'text-black/50' : 'text-white/40'}`}>{k.num}</span>
                      {k.category}
                    </div>
                    <span className={`font-mono text-xl font-normal transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>

                  {/* Animated overlay underline (for entry animation) */}
                  <div
                    className={`skill-overlay-bar skill-overlay-bar-${idx} absolute bottom-0 left-0 w-full h-[2px] origin-left scale-x-0 ${inverted ? 'bg-black' : 'bg-white'}`}
                  ></div>

                  {/* Accordion Content (Table) */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]`}
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <div className={`pb-8 pt-2 px-4 md:px-12`}>
                        <div className={`grid grid-cols-[40px_1fr] md:grid-cols-[60px_1fr] gap-6 py-4 font-mono text-[11px] tracking-[0.12em] uppercase border-b ${inverted ? 'text-black border-black/10' : 'text-[#F5F5F5]/40 border-white/10'}`}>
                          <div>#</div>
                          <div>Skill</div>
                        </div>
                        {toolsList.map((skill, sIdx) => (
                          <div key={sIdx} className={`grid grid-cols-[40px_1fr] md:grid-cols-[60px_1fr] gap-6 py-4 border-b last:border-0 items-center transition-colors ${inverted ? 'border-black/10 hover:bg-black/5 text-black' : 'border-white/10 hover:bg-white/5 text-[#F5F5F5]'}`}>
                            <div className={`font-mono text-[13px] ${inverted ? 'text-black/50' : 'text-[#F5F5F5]/40'}`}>{(sIdx + 1).toString().padStart(2, '0')}</div>
                            <div className="font-sans text-[17px] font-medium tracking-tight">{skill}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`mt-16 pt-8 border-t gsap-fade-up ${inverted ? 'border-black' : 'border-white/10'}`}>
            <div className={`font-mono text-[11px] tracking-[0.12em] uppercase mb-5 ${inverted ? 'text-black' : 'text-[#F5F5F5]/40'}`}>/ Familiar with — comfortable but not primary</div>
            <div className="flex flex-wrap gap-2">
              {familiar.map((tag, idx) => (
                <span key={idx} className={`px-3.5 py-2 border font-mono text-xs tracking-wide rounded-sm ${inverted ? 'border-black text-black' : 'border-white/15 text-[#F5F5F5]/75'}`}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 04 · EXPERIENCE --- */}
      <section id="experience" className={`px-10 py-[120px] border-b ${inverted ? 'bg-transparent text-black border-black' : 'bg-[#0A0A0B] text-[#F5F5F5] border-white/10'}`}>
        <div className="max-w-[1400px] mx-auto">
          <div className={`flex items-baseline gap-8 mb-20 pb-8 border-b flex-wrap gsap-fade-up ${inverted ? 'border-black' : 'border-white/10'}`}>
            <div className={`font-mono text-[56px] font-medium tracking-tight leading-none ${inverted ? 'text-black' : 'text-[#CD3232]'}`}>03</div>
            <div className="flex-1 min-w-[240px]">
              <div className={`font-mono text-xs tracking-[0.15em] uppercase mb-3 ${inverted ? 'text-black' : 'text-[#F5F5F5]/70'}`}>/ Experience · Timeline</div>
              <h2 className="font-sans font-black text-[clamp(40px,6vw,88px)] leading-[0.95] tracking-tight m-0">
                Where I've<br />done the work<span className={inverted ? 'text-black' : 'text-[#CD3232]'}>.</span>
              </h2>
            </div>
          </div>

          <div className="relative">
            {roles.map((r, idx) => (
              <div key={idx} className={`grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16 py-12 border-t items-start gsap-fade-up ${inverted ? 'border-black' : 'border-white/10'}`}>
                <div>
                  <div className={`font-mono text-xs tracking-[0.12em] uppercase mb-2 ${inverted ? 'text-black' : 'text-[#CD3232]'}`}>{r.range}</div>
                  <div className={`font-mono text-[11px] tracking-wider uppercase ${inverted ? 'text-black' : 'text-[#F5F5F5]/40'}`}>{r.duration}</div>
                </div>

                <div>
                  <div className="flex items-baseline gap-4 flex-wrap mb-2">
                    <h3 className="font-sans font-bold text-3xl tracking-tight m-0">{r.role}</h3>
                    <span className={`font-sans font-normal text-lg ${inverted ? 'text-black' : 'text-[#F5F5F5]/50'}`}>@ {r.company}</span>
                  </div>
                  <div className={`font-mono text-xs tracking-wider uppercase mb-6 ${inverted ? 'text-black' : 'text-[#F5F5F5]/40'}`}>
                    {r.location} · {r.mode}
                  </div>
                  <ul className="list-none p-0 m-0 flex flex-col gap-3.5 max-w-[720px]">
                    {r.bullets.map((b, bIdx) => (
                      <li key={bIdx} className={`grid grid-cols-[24px_1fr] gap-4 font-sans text-base leading-[1.55] ${inverted ? 'text-black' : 'text-[#F5F5F5]/80'}`}>
                        <span className={`font-mono text-xs pt-1 ${inverted ? 'text-black' : 'text-[#CD3232]'}`}>→</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {r.tags.map((t, tIdx) => (
                      <span key={tIdx} className={`px-2.5 py-1 border font-mono text-[11px] tracking-wide rounded-sm ${inverted ? 'bg-transparent border-black text-black' : 'bg-white/5 border-white/10 text-[#F5F5F5]/60'}`}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 05 · PROJECTS --- */}
      <section id="projects" className={`px-10 py-[120px] border-b ${inverted ? 'bg-transparent text-black border-black' : 'bg-[#0A0A0B] text-[#F5F5F5] border-white/10'}`}>
        <div className="max-w-[1400px] mx-auto">
          <div className={`flex items-baseline gap-8 mb-20 pb-8 border-b flex-wrap gsap-fade-up ${inverted ? 'border-black' : 'border-white/10'}`}>
            <div className={`font-mono text-[56px] font-medium tracking-tight leading-none ${inverted ? 'text-black' : 'text-[#CD3232]'}`}>04</div>
            <div className="flex-1 min-w-[240px]">
              <div className={`font-mono text-xs tracking-[0.15em] uppercase mb-3 ${inverted ? 'text-black' : 'text-[#F5F5F5]/70'}`}>/ Projects · Selected</div>
              <h2 className="font-sans font-black text-[clamp(40px,6vw,88px)] leading-[0.95] tracking-tight m-0">
                Recent shipments<br />and side quests<span className={inverted ? 'text-black' : 'text-[#CD3232]'}>.</span>
              </h2>
            </div>
            <a href="#" className={`font-mono text-xs tracking-wider uppercase pb-1 border-b transition-colors ${inverted ? 'text-black border-black hover:text-black/50' : 'text-[#F5F5F5]/60 border-white/30 hover:text-white'}`}>Full archive →</a>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-[1px] gsap-fade-up ${inverted ? 'bg-transparent' : 'border bg-white/10 border-white/10'}`}>
            {projects.map((p, idx) => (
              <a key={idx} href={p.href} className={`p-8 lg:p-10 flex flex-col gap-6 transition-colors duration-300 min-h-[400px] group ${inverted ? 'bg-transparent border border-black hover:bg-black/5' : 'bg-[#0A0A0B] hover:bg-[#111214]'}`}>
                <div className="flex justify-between items-center">
                  <span className={`font-mono text-[11px] tracking-[0.12em] uppercase ${inverted ? 'text-black' : 'text-[#F5F5F5]/40'}`}>Case {p.num} / {p.year}</span>
                  <span className={`font-sans text-xl transition-colors ${inverted ? 'text-black' : 'text-[#F5F5F5]/40 group-hover:text-white'}`}>↗</span>
                </div>

                <div className={`aspect-video relative overflow-hidden flex items-center justify-center rounded-sm`} style={{ background: inverted ? 'transparent' : p.thumbBg }}>
                  {inverted && <div className="absolute inset-0 border border-black"></div>}
                  <div aria-hidden="true" className={`absolute inset-0 bg-[size:32px_32px] ${inverted ? 'bg-[linear-gradient(rgba(0,0,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.2)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]'}`}></div>
                  <div className={`relative z-10 font-sans font-black text-7xl lg:text-[96px] tracking-tighter text-center leading-none ${inverted ? 'text-black' : 'text-white/90 drop-shadow-lg'}`}>
                    {p.mark}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-sans font-bold text-2xl lg:text-[28px] leading-[1.15] tracking-tight mb-3 ${inverted ? 'text-black' : 'text-[#F5F5F5]'}`}>{p.title}</h3>
                    <p className={`font-sans text-[15px] leading-relaxed m-0 ${inverted ? 'text-black' : 'text-[#F5F5F5]/60'}`}>{p.desc}</p>
                  </div>

                  <div className={`flex flex-wrap gap-1.5 pt-5 mt-5 border-t ${inverted ? 'border-black' : 'border-white/10'}`}>
                    {p.tech.map((t, tIdx) => (
                      <span key={tIdx} className={`px-2.5 py-1 font-mono text-[11px] tracking-wide rounded-sm ${inverted ? 'border border-black text-black' : 'bg-white/5 text-[#F5F5F5]/70'}`}>{t}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}

            <div className={`p-8 lg:p-10 flex flex-col gap-6 min-h-[400px] transition-colors duration-300 ${inverted ? 'bg-transparent border border-black' : 'bg-[#0A0A0B]'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`font-sans font-black text-3xl lg:text-4xl tracking-tight ${inverted ? 'text-black' : 'text-[#F5F5F5]'}`}>Professional Work<span className={inverted ? 'text-black' : 'text-[#CD3232]'}>.</span></h3>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-8">
                <a href="https://innocentkidsvalley.in/" target="_blank" rel="noopener noreferrer" className={`group flex flex-col gap-2 ${inverted ? 'text-black' : 'text-[#F5F5F5]'}`}>
                  <h3 className="font-sans font-bold text-xl md:text-2xl tracking-tight group-hover:text-[#CD3232] transition-colors">Innocent Kids Valley School ↗</h3>
                  <p className={`font-sans text-[15px] leading-relaxed m-0 ${inverted ? 'text-black/60' : 'text-[#F5F5F5]/60'}`}>Official preschool platform with scheduling & CMS.</p>
                </a>

                <a href="https://endorphinsentertainment.endorphinstech.com/" target="_blank" rel="noopener noreferrer" className={`group flex flex-col gap-2 ${inverted ? 'text-black' : 'text-[#F5F5F5]'}`}>
                  <h3 className="font-sans font-bold text-xl md:text-2xl tracking-tight group-hover:text-[#CD3232] transition-colors">Endorphins Entertainment ↗</h3>
                  <p className={`font-sans text-[15px] leading-relaxed m-0 ${inverted ? 'text-black/60' : 'text-[#F5F5F5]/60'}`}>Corporate website rebuild with Next.js & Tailwind CSS.</p>
                </a>

                <a href="https://www.beepbopboopfest.com/" target="_blank" rel="noopener noreferrer" className={`group flex flex-col gap-2 ${inverted ? 'text-black' : 'text-[#F5F5F5]'}`}>
                  <h3 className="font-sans font-bold text-xl md:text-2xl tracking-tight group-hover:text-[#CD3232] transition-colors">Beep Bop Boop ↗</h3>
                  <p className={`font-sans text-[15px] leading-relaxed m-0 ${inverted ? 'text-black/60' : 'text-[#F5F5F5]/60'}`}>India's premier kids' STEM festival platform.</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 06 · CONTACT --- */}
      <section id="contact" className={`px-10 py-[140px] relative ${inverted ? 'bg-transparent text-black border-b border-black' : 'bg-[#F1EFEB] text-[#0A0A0B]'}`}>
        <div className="max-w-[1400px] mx-auto">
          <div className={`flex items-baseline gap-8 mb-20 pb-8 border-b flex-wrap gsap-fade-up ${inverted ? 'border-black' : 'border-black/15'}`}>
            <div className={`font-mono text-[56px] font-medium tracking-tight leading-none ${inverted ? 'text-black' : 'text-[#CD3232]'}`}>05</div>
            <div className="flex-1 min-w-[240px]">
              <div className="font-mono text-xs tracking-[0.15em] uppercase mb-3">/ Contact</div>
              <h2 className="font-sans font-black text-[clamp(40px,6vw,88px)] leading-[0.95] tracking-tight m-0 text-[#0A0A0B]">
                Let's build<br />something good<span className={inverted ? 'text-black' : 'text-[#CD3232]'}>.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start gsap-fade-up">
            <div>
              <p className="font-sans text-[20px] leading-[1.55] mb-12 tracking-tight text-pretty">
                Open for engineering roles, internship opportunities, and engaging freelance projects. Reach out if you need robust architecture paired with smooth client experiences.
              </p>

              <div className={`flex flex-col border-t ${inverted ? 'border-black' : 'border-black/15'}`}>
                <div className={`flex items-center justify-between py-5 border-b ${inverted ? 'border-black' : 'border-black/15'}`}>
                  <span className={`font-mono text-[11px] tracking-[0.12em] uppercase ${inverted ? 'text-black' : 'text-[#0A0A0B]/50'}`}>Email</span>
                  <a href="mailto:yashsharma2044@gmail.com" className={`font-sans text-lg font-medium tracking-tight transition-colors ${inverted ? 'text-black' : 'text-[#0A0A0B] hover:text-[#CD3232]'}`}>yashsharma2044@gmail.com</a>
                </div>
                <div className={`flex items-center justify-between py-5 border-b ${inverted ? 'border-black' : 'border-black/15'}`}>
                  <span className={`font-mono text-[11px] tracking-[0.12em] uppercase ${inverted ? 'text-black' : 'text-[#0A0A0B]/50'}`}>Phone</span>
                  <a href="tel:+917818074437" className={`font-sans text-lg font-medium tracking-tight transition-colors ${inverted ? 'text-black' : 'text-[#0A0A0B] hover:text-[#CD3232]'}`}>+91 7818074437</a>
                </div>
                <div className={`flex items-center justify-between py-5 border-b ${inverted ? 'border-black' : 'border-black/15'}`}>
                  <span className={`font-mono text-[11px] tracking-[0.12em] uppercase ${inverted ? 'text-black' : 'text-[#0A0A0B]/50'}`}>Current Location</span>
                  <span className="font-sans text-lg font-medium tracking-tight">NCR</span>
                </div>
                <div className={`flex items-center justify-between py-5 border-b ${inverted ? 'border-black' : 'border-black/15'}`}>
                  <span className={`font-mono text-[11px] tracking-[0.12em] uppercase ${inverted ? 'text-black' : 'text-[#0A0A0B]/50'}`}>Response time</span>
                  <span className="font-sans text-lg font-medium tracking-tight">Within 24 hours</span>
                </div>
              </div>
            </div>

            <ContactForm inverted={inverted} />
          </div>
        </div>
      </section>

      {/* --- 07 · FOOTER --- */}
      <footer className={`px-10 pt-20 pb-10 relative ${inverted ? 'bg-transparent text-black' : 'bg-[#060707] text-[#F5F5F5]'}`}>
        <div className="max-w-[1400px] mx-auto">
          <div className={`border-b pb-12 mb-8 gsap-fade-up ${inverted ? 'border-black' : 'border-white/10'}`}>
            <div className={`font-mono text-[11px] tracking-[0.12em] uppercase mb-6 ${inverted ? 'text-black' : 'text-[#F5F5F5]/40'}`}>/ End of transmission</div>
            <div className="font-sans font-black text-[clamp(48px,12vw,180px)] leading-[0.9] tracking-tighter">
              YASH SHARMA<span className={inverted ? 'text-black' : 'text-[#CD3232]'}>.</span>
            </div>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-16 pb-16 border-b gsap-fade-up ${inverted ? 'border-black' : 'border-white/10'}`}>
            <div>
              <div className={`font-mono text-[11px] tracking-[0.12em] uppercase mb-4 ${inverted ? 'text-black' : 'text-[#F5F5F5]/40'}`}>Get in touch</div>
              <a href="mailto:yashsharma2044@gmail.com" className={`block font-sans text-2xl font-medium tracking-tight transition-colors mb-2 ${inverted ? 'text-black hover:text-black/50' : 'text-[#F5F5F5] hover:text-[#CD3232]'}`}>yashsharma2044@gmail.com</a>
              <a href="tel:+917818074437" className={`block font-sans text-2xl font-medium tracking-tight transition-colors ${inverted ? 'text-black hover:text-black/50' : 'text-[#F5F5F5] hover:text-[#CD3232]'}`}>+91 7818074437</a>
              <p className={`font-sans text-sm leading-relaxed mt-4 max-w-[360px] ${inverted ? 'text-black' : 'text-[#F5F5F5]/50'}`}>
                Currently based in India. Open to global remote roles and exciting local opportunities.
              </p>
            </div>
            <div>
              <div className={`font-mono text-[11px] tracking-[0.12em] uppercase mb-4 ${inverted ? 'text-black' : 'text-[#F5F5F5]/40'}`}>Sitemap</div>
              <div className={`flex flex-col gap-2.5 font-sans text-[15px] ${inverted ? 'text-black' : 'text-[#F5F5F5]/75'}`}>
                <a href="#top" className={inverted ? 'hover:text-black/50' : 'hover:text-white'}>Index</a>
                <a href="#about" className={inverted ? 'hover:text-black/50' : 'hover:text-white'}>About</a>
                <a href="#skills" className={inverted ? 'hover:text-black/50' : 'hover:text-white'}>Skills</a>
                <a href="#experience" className={inverted ? 'hover:text-black/50' : 'hover:text-white'}>Experience</a>
                <a href="#projects" className={inverted ? 'hover:text-black/50' : 'hover:text-white'}>Projects</a>
                <a href="#contact" className={inverted ? 'hover:text-black/50' : 'hover:text-white'}>Contact</a>
              </div>
            </div>
            <div>
              <div className={`font-mono text-[11px] tracking-[0.12em] uppercase mb-4 ${inverted ? 'text-black' : 'text-[#F5F5F5]/40'}`}>Elsewhere</div>
              <div className={`flex flex-col gap-2.5 font-sans text-[15px] ${inverted ? 'text-black' : 'text-[#F5F5F5]/75'}`}>
                <a href="https://github.com/Yashsharma-12" target="_blank" rel="noopener noreferrer" className={inverted ? 'hover:text-black/50' : 'hover:text-white'}>GitHub ↗</a>
                <a href="https://www.linkedin.com/in/yash-sharma-2004d" target="_blank" rel="noopener noreferrer" className={inverted ? 'hover:text-black/50' : 'hover:text-white'}>LinkedIn ↗</a>
                <a href="https://www.instagram.com/yaaaash.12/" target="_blank" rel="noopener noreferrer" className={inverted ? 'hover:text-black/50' : 'hover:text-white'}>Instagram ↗</a>
              </div>
            </div>
            <div>
              <div className={`font-mono text-[11px] tracking-[0.12em] uppercase mb-4 ${inverted ? 'text-black' : 'text-[#F5F5F5]/40'}`}>Resources</div>
              <div className={`flex flex-col gap-2.5 font-sans text-[15px] ${inverted ? 'text-black' : 'text-[#F5F5F5]/75'}`}>
                <a href="#" className={inverted ? 'hover:text-black/50' : 'hover:text-white'}>CV / Resume ↗</a>
              </div>
            </div>
          </div>

          <div className={`flex justify-between items-center flex-wrap gap-4 font-mono text-[11px] tracking-wider uppercase mt-8 gsap-fade-up ${inverted ? 'text-black' : 'text-[#F5F5F5]/40'}`}>
            <div>© 2026 Yash Sharma — All rights reserved</div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="inline-flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${inverted ? 'bg-black' : 'bg-[#CD3232]'}`}></span>
                System operational
              </span>
              <span className="hidden sm:inline">Built in India</span>
              <span className="hidden sm:inline">v.2026.07</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [globalInverted, setGlobalInverted] = useState(false);

  // Store the viewport coordinates to handle scroll updates
  const mousePos = useRef({ clientX: 0, clientY: 0 });
  const posProxy = useRef({ x: 0, y: 0 });
  const dotPosCache = useRef({ x: 0, y: 0 });

  // Cache dot position to avoid layout thrashing (getBoundingClientRect) on every mouse move
  useEffect(() => {
    const updateDotCache = () => {
      const dot = document.getElementById('easter-egg-dot');
      if (dot) {
        const rect = dot.getBoundingClientRect();
        dotPosCache.current = {
          x: rect.left + window.scrollX + rect.width / 2,
          y: rect.top + window.scrollY + rect.height / 2
        };
      }
    };

    updateDotCache();
    window.addEventListener('resize', updateDotCache);
    const timer = setTimeout(updateDotCache, 500); // Fallback for late font loading

    return () => {
      window.removeEventListener('resize', updateDotCache);
      clearTimeout(timer);
    };
  }, [globalInverted]); // Re-cache when mode changes

  const updateMaskPosition = () => {
    if (!containerRef.current) return;

    const targetX = mousePos.current.clientX;
    const targetY = mousePos.current.clientY + window.scrollY;

    // Tween a proxy object to prevent GSAP from reading computed styles (which causes lag/jank)
    gsap.to(posProxy.current, {
      x: targetX,
      y: targetY,
      duration: 1.0,
      ease: "elastic.out(1.2, 0.2)",
      overwrite: "auto",
      onUpdate: () => {
        containerRef.current?.style.setProperty('--x', `${posProxy.current.x}px`);
        containerRef.current?.style.setProperty('--y', `${posProxy.current.y}px`);
      }
    });

    const contactEl = document.getElementById('contact');
    if (contactEl && maskRef.current) {
      const targets = outlineRef.current ? [maskRef.current, outlineRef.current] : maskRef.current;
      if (targetY >= contactEl.offsetTop - 20) {
        gsap.to(targets, { opacity: 0, duration: 0.3, overwrite: "auto" });
      } else {
        gsap.to(targets, { opacity: 1, duration: 0.3, overwrite: "auto" });
      }
    }

  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mousePos.current = { clientX: e.clientX, clientY: e.clientY };
    updateMaskPosition();
  };

  useEffect(() => {
    const handleScroll = () => {
      updateMaskPosition();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    const contactEl = document.getElementById('contact');
    const targetY = mousePos.current.clientY + window.scrollY;
    if (contactEl && targetY >= contactEl.offsetTop - 20) return;
    if (maskRef.current) {
      const targets = outlineRef.current ? [maskRef.current, outlineRef.current] : maskRef.current;
      gsap.to(targets, { opacity: 1, duration: 0.3, overwrite: "auto" });
    }
  };

  const handleMouseLeave = () => {
    if (maskRef.current) {
      const targets = outlineRef.current ? [maskRef.current, outlineRef.current] : maskRef.current;
      gsap.to(targets, { opacity: 0, duration: 0.3, overwrite: "auto" });
    }
  };

  // Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05, // Lower value increases momentum and makes scrolling heavier/smoother (default is ~0.1)
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  // GSAP Scroll Animations
  useGSAP(() => {
    gsap.utils.toArray('.gsap-fade-up').forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });

    // About Section Typing Effect (Time-based, sequential)
    gsap.to(['.about-cursor-1', '.about-cursor-2', '.about-cursor-3'], {
      opacity: 0,
      ease: "steps(1)",
      repeat: -1,
      duration: 0.5
    });

    gsap.set(['.about-typewriter-1', '.about-typewriter-2', '.about-typewriter-3'], { text: "" });
    gsap.set(['.about-cursor-1', '.about-cursor-2', '.about-cursor-3'], { display: 'none' });

    ScrollTrigger.create({
      trigger: '#about',
      start: 'top 70%', // Trigger when section scrolls into view
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();

        // Paragraph 1
        const p1 = document.querySelector('.about-typewriter-1') as HTMLElement;
        const text1 = p1?.getAttribute('data-text') || "";
        tl.set('.about-cursor-1', { display: 'inline' })
          .to('.about-typewriter-1', {
            text: text1,
            duration: text1.length * 0.01, // 10ms per char
            ease: "none"
          })
          .set('.about-cursor-1', { display: 'none' });

        // Paragraph 2
        const p2 = document.querySelector('.about-typewriter-2') as HTMLElement;
        const text2 = p2?.getAttribute('data-text') || "";
        tl.set('.about-cursor-2', { display: 'inline' })
          .to('.about-typewriter-2', {
            text: text2,
            duration: text2.length * 0.01,
            ease: "none"
          })
          .set('.about-cursor-2', { display: 'none' });

        // Paragraph 3
        const p3 = document.querySelector('.about-typewriter-3') as HTMLElement;
        const text3 = p3?.getAttribute('data-text') || "";
        tl.set('.about-cursor-3', { display: 'inline' })
          .to('.about-typewriter-3', {
            text: text3,
            duration: text3.length * 0.01,
            ease: "none"
          });
        // Cursor 3 remains visible forever
      }
    });

    // Skill Bars Wave Animation
    ScrollTrigger.create({
      trigger: '#skills',
      start: 'top 65%',
      onEnter: () => {
        skills.forEach((_, idx) => {
          gsap.to(`.skill-overlay-bar-${idx}`, {
            scaleX: 1,
            duration: 1.2,
            delay: idx * 0.1,
            ease: 'expo.out',
            overwrite: true
          });
        });
      },
      onLeave: () => {
        gsap.to('.skill-overlay-bar', {
          scaleX: 0,
          duration: 0.15,
          ease: 'power3.out',
          overwrite: true
        });
      },
      onEnterBack: () => {
        skills.forEach((_, idx) => {
          gsap.to(`.skill-overlay-bar-${idx}`, {
            scaleX: 1,
            duration: 1.2,
            delay: idx * 0.1,
            ease: 'expo.out',
            overwrite: true
          });
        });
      },
      onLeaveBack: () => {
        gsap.to('.skill-overlay-bar', {
          scaleX: 0,
          duration: 0.15,
          ease: 'power3.out',
          overwrite: true
        });
      }
    });
  }, { scope: containerRef });
  const [openSkillIdx, setOpenSkillIdx] = useState<number | null>(null);

  return (
    <div
      ref={containerRef}
      className={`font-sans min-h-screen relative selection:bg-[#CD3232] selection:text-white ${globalInverted ? 'bg-[#F1EFEB] text-[#0A0A0B]' : 'bg-[#0A0A0B] text-[#F5F5F5]'}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CustomCursor inverted={globalInverted} />

      {/* Bottom Layer: Default Theme */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        <PageContent
          inverted={globalInverted}
          onDotClick={() => setGlobalInverted(!globalInverted)}
          openSkillIdx={openSkillIdx}
          onToggleSkill={(idx) => setOpenSkillIdx(openSkillIdx === idx ? null : idx)}
        />
      </div>

      {/* Circle Outline */}
      <div
        ref={outlineRef}
        className={`pointer-events-none absolute z-[25] transition-opacity duration-300 w-[300px] h-[300px] border-[1px] rounded-full -translate-x-1/2 -translate-y-1/2 ${globalInverted ? 'border-[#0A0A0B]/30' : 'border-black/50'}`}
        style={{
          opacity: 0,
          left: 'var(--x, 50%)',
          top: 'var(--y, 50%)'
        }}
      ></div>

      {/* Top Layer: Inverted Theme (Masked) */}
      <div
        ref={maskRef}
        className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 w-full h-full ${globalInverted ? 'bg-[#0A0A0B]' : 'bg-[#CD3232]'}`}
        style={{
          opacity: 0,
          maskImage: 'radial-gradient(circle 150px at var(--x, 50%) var(--y, 50%), black 100%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle 150px at var(--x, 50%) var(--y, 50%), black 100%, transparent 100%)',
        }}
      >
        <PageContent
          inverted={!globalInverted}
          openSkillIdx={openSkillIdx}
          onToggleSkill={(idx) => setOpenSkillIdx(openSkillIdx === idx ? null : idx)}
          isMaskLayer={true}
        />
      </div>
    </div>
  );
}