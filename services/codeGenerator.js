const fs = require("fs-extra");
const path = require("path");

const os = require("os");
const OUTPUT_DIR = process.env.VERCEL ? path.join(os.tmpdir(), "generated") : path.join(__dirname, "../../generated");

async function generateProjectFiles(project) {
  const projectDir = path.join(OUTPUT_DIR, project.slug);
  await fs.ensureDir(projectDir);
  await fs.emptyDir(projectDir);

  await generatePackageJson(projectDir);
  await generateNextConfig(projectDir);
  await generateTailwindConfig(projectDir, project.settings);
  await generateGlobalStyles(projectDir, project.settings);
  await generateLayout(projectDir, project);

  for (const page of project.pages) {
    await generatePage(projectDir, page, project.settings);
  }

  await generateComponents(projectDir);

  return projectDir;
}

async function generatePackageJson(dir) {
  const pkg = {
    name: "zaamedsolutions-live",
    version: "1.0.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
    },
    dependencies: {
      next: "14.0.0",
      react: "18.2.0",
      "react-dom": "18.2.0",
      "framer-motion": "10.16.0",
      "lucide-react": "0.294.0",
    },
    devDependencies: {
      tailwindcss: "3.3.0",
      postcss: "8.4.0",
      autoprefixer: "10.4.0",
    },
  };
  await fs.writeJson(path.join(dir, "package.json"), pkg, { spaces: 2 });
}

async function generateNextConfig(dir) {
  const config = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true
};
module.exports = nextConfig;`;
  await fs.writeFile(path.join(dir, "next.config.js"), config);
}

async function generateTailwindConfig(dir, settings) {
  const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '${settings.primaryColor || "#1ABC9C"}',
        'primary-dark': '${settings.darkColor || "#16A085"}',
        navy: '#1A1A2E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: []
};`;
  await fs.writeFile(path.join(dir, "tailwind.config.js"), config);
}

async function generateGlobalStyles(dir) {
  const css = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body {
    @apply antialiased text-gray-900;
    font-family: 'Inter', sans-serif;
  }
}`;

  await fs.ensureDir(path.join(dir, "app"));
  await fs.writeFile(path.join(dir, "app", "globals.css"), css);

  const postcss = `module.exports = {
  plugins: { tailwindcss: {}, autoprefixer: {} }
};`;
  await fs.writeFile(path.join(dir, "postcss.config.js"), postcss);
}

async function generateLayout(dir, project) {
  const { settings } = project;
  const layout = `"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        ${settings.ga4Id ? `
        <script async src="https://www.googletagmanager.com/gtag/js?id=${settings.ga4Id}" />
        <script dangerouslySetInnerHTML={{ __html: \`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${settings.ga4Id}');
        \` }} />` : ""}
        ${settings.gscCode ? `<meta name="google-site-verification" content="${settings.gscCode}" />` : ""}
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}`;

  await fs.writeFile(path.join(dir, "app", "layout.js"), layout);
}

async function generatePage(dir, page, settings) {
  const pageDir =
    page.slug === "/"
      ? path.join(dir, "app")
      : path.join(dir, "app", page.slug.replace(/^\//, ""));

  await fs.ensureDir(pageDir);

  const pageContent = `import SectionRenderer from "@/components/SectionRenderer";

export const metadata = {
  title: "${page.seo?.title || page.name} | ${settings.siteName}",
  description: "${page.seo?.description || ""}",
};

export default function ${page.name.replace(/\s/g, "")}Page() {
  return (
    <main>
      <SectionRenderer sections={${JSON.stringify(page.sections)}} />
    </main>
  );
}`;

  await fs.writeFile(path.join(pageDir, "page.js"), pageContent);
}

async function generateComponents(dir) {
  const componentsDir = path.join(dir, "components");
  await fs.ensureDir(componentsDir);

  const renderer = `"use client";
import HeroSection from "./HeroSection";
import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import ButtonBlock from "./ButtonBlock";
import CardBlock from "./CardBlock";
import FAQBlock from "./FAQBlock";
import TestimonialBlock from "./TestimonialBlock";
import StatsCounter from "./StatsCounter";
import ServiceGrid from "./ServiceGrid";
import ContactForm from "./ContactForm";

const componentMap = {
  hero: HeroSection,
  text: TextBlock,
  image: ImageBlock,
  button: ButtonBlock,
  card: CardBlock,
  faq: FAQBlock,
  testimonial: TestimonialBlock,
  stats: StatsCounter,
  serviceGrid: ServiceGrid,
  contactForm: ContactForm
};

export default function SectionRenderer({ sections }) {
  return (
    <>
      {sections?.map((section) => {
        const Component = componentMap[section.type];
        if (!Component) return null;
        return <Component key={section.id} {...section.props} />;
      })}
    </>
  );
}`;

  await fs.writeFile(
    path.join(componentsDir, "SectionRenderer.jsx"),
    renderer
  );

  await generateHeroSection(componentsDir);
  await generateTextBlock(componentsDir);
  await generateImageBlock(componentsDir);
  await generateButtonBlock(componentsDir);
  await generateCardBlock(componentsDir);
  await generateFAQBlock(componentsDir);
  await generateTestimonialBlock(componentsDir);
  await generateStatsCounter(componentsDir);
  await generateServiceGrid(componentsDir);
  await generateContactForm(componentsDir);
  await generateNavbar(componentsDir);
  await generateFooter(componentsDir);
}

async function generateHeroSection(dir) {
  const content = `"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection({ title, subtitle, buttonText, buttonLink, bgColor, bgGradient, textColor, alignment, showBadge, badgeText }) {
  return (
    <section
      style={{
        background: bgGradient || bgColor || "#F8F9FA",
        color: textColor || "#1A1A2E",
        textAlign: alignment || "left"
      }}
      className="py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showBadge && badgeText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            {badgeText}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl mb-8 max-w-2xl opacity-80"
          >
            {subtitle}
          </motion.p>
        )}
        {buttonText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href={buttonLink || "#"}
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              {buttonText}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}`;
  await fs.writeFile(path.join(dir, "HeroSection.jsx"), content);
}

async function generateTextBlock(dir) {
  const content = `"use client";
import { motion } from "framer-motion";

export default function TextBlock({ heading, paragraph, alignment, headingColor, textColor, bgColor, padding, maxWidth }) {
  return (
    <section style={{ background: bgColor || "#FFFFFF", padding: \`\${padding || 40}px 0\`, textAlign: alignment || "left" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: maxWidth || "100%" }}>
        {heading && (
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold mb-6" style={{ color: headingColor || "#1A1A2E" }}>
            {heading}
          </motion.h2>
        )}
        {paragraph && (
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg leading-relaxed" style={{ color: textColor || "#555555" }}>
            {paragraph}
          </motion.p>
        )}
      </div>
    </section>
  );
}`;
  await fs.writeFile(path.join(dir, "TextBlock.jsx"), content);
}

async function generateImageBlock(dir) {
  const content = `"use client";
import { motion } from "framer-motion";

export default function ImageBlock({ src, alt, width, height, borderRadius, objectFit, bgColor, padding }) {
  return (
    <section style={{ background: bgColor || "transparent", padding: \`\${padding || 0}px\` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          {src ? (
            <img src={src} alt={alt || ""} style={{ width: width || "100%", height: height || "auto", borderRadius: borderRadius || 0, objectFit: objectFit || "cover" }} className="w-full" />
          ) : (
            <div className="bg-gray-100 rounded-lg flex items-center justify-center" style={{ height: 400 }}>
              <span className="text-gray-400 text-lg">Image</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}`;
  await fs.writeFile(path.join(dir, "ImageBlock.jsx"), content);
}

async function generateButtonBlock(dir) {
  const content = `"use client";
import Link from "next/link";

export default function ButtonBlock({ text, link, bgColor, textColor, borderRadius, size, alignment, padding, fullWidth }) {
  const sizes = { small: "px-4 py-2 text-sm", medium: "px-6 py-3 text-base", large: "px-8 py-4 text-lg" };
  return (
    <section style={{ padding: \`\${padding || 20}px\`, textAlign: alignment || "center" }}>
      <Link href={link || "#"} className={\`inline-block font-semibold transition-opacity hover:opacity-90 \${sizes[size] || sizes.medium} \${fullWidth ? "w-full text-center" : ""}\`} style={{ background: bgColor || "#1ABC9C", color: textColor || "#FFFFFF", borderRadius: borderRadius || 8 }}>
        {text || "Click Me"}
      </Link>
    </section>
  );
}`;
  await fs.writeFile(path.join(dir, "ButtonBlock.jsx"), content);
}

async function generateCardBlock(dir) {
  const content = `"use client";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

export default function CardBlock({ icon, title, description, bgColor, borderColor, accentColor, borderRadius, padding, shadow }) {
  const Icon = LucideIcons[icon] || LucideIcons.Star;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl p-6" style={{ background: bgColor || "#FFFFFF", borderColor: borderColor || "#E5E7EB", borderWidth: 1, borderStyle: "solid", borderRadius: borderRadius || 12, padding: padding || 24, boxShadow: shadow ? "0 4px 6px -1px rgba(0,0,0,0.1)" : "none" }}>
      <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: \`\${accentColor || "#1ABC9C"}20\` }}>
        <Icon size={24} style={{ color: accentColor || "#1ABC9C" }} />
      </div>
      {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
      {description && <p className="text-gray-600">{description}</p>}
    </motion.div>
  );
}`;
  await fs.writeFile(path.join(dir, "CardBlock.jsx"), content);
}

async function generateFAQBlock(dir) {
  const content = `"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQBlock({ heading, subheading, items, bgColor, headingColor, accentColor, padding }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section style={{ background: bgColor || "#FFFFFF", padding: \`\${padding || 60}px 0\` }}>
      <div className="max-w-3xl mx-auto px-4">
        {heading && <h2 className="text-3xl font-bold text-center mb-4" style={{ color: headingColor || "#1A1A2E" }}>{heading}</h2>}
        {subheading && <p className="text-center text-gray-600 mb-12">{subheading}</p>}
        <div className="space-y-4">
          {items?.map((item, i) => (
            <div key={i} className="border rounded-lg" style={{ borderColor: \`\${accentColor || "#1ABC9C"}30\` }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left font-medium">
                <span>{item.question}</span>
                <ChevronDown className={\`transform transition-transform \${openIndex === i ? "rotate-180" : ""}\`} style={{ color: accentColor || "#1ABC9C" }} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-gray-600">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  await fs.writeFile(path.join(dir, "FAQBlock.jsx"), content);
}

async function generateTestimonialBlock(dir) {
  const content = `"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function TestimonialBlock({ heading, subheading, testimonials, bgColor, headingColor, accentColor, padding }) {
  return (
    <section style={{ background: bgColor || "#F8F9FA", padding: \`\${padding || 60}px 0\` }}>
      <div className="max-w-7xl mx-auto px-4">
        {heading && <h2 className="text-3xl font-bold text-center mb-4" style={{ color: headingColor || "#1A1A2E" }}>{heading}</h2>}
        {subheading && <p className="text-center text-gray-600 mb-12">{subheading}</p>}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials?.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating || 5)].map((_, j) => <Star key={j} size={18} fill={accentColor || "#1ABC9C"} style={{ color: accentColor || "#1ABC9C" }} />)}
              </div>
              <p className="text-gray-700 mb-4 italic">"{t.quote}"</p>
              <div>
                <p className="font-semibold">{t.author}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  await fs.writeFile(path.join(dir, "TestimonialBlock.jsx"), content);
}

async function generateStatsCounter(dir) {
  const content = `"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function StatItem({ number, label, suffix, duration, textColor }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = number;
    const increment = end / ((duration || 2) * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, number, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold" style={{ color: textColor || "#FFFFFF" }}>
        {count}{suffix || ""}
      </div>
      <p className="mt-2 text-sm md:text-base opacity-90" style={{ color: textColor || "#FFFFFF" }}>{label}</p>
    </div>
  );
}

export default function StatsCounter({ stats, bgColor, textColor, padding }) {
  return (
    <section style={{ background: bgColor || "#1ABC9C", padding: \`\${padding || 60}px 0\` }}>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats?.map((s, i) => (
          <StatItem key={i} {...s} textColor={textColor} />
        ))}
      </div>
    </section>
  );
}`;
  await fs.writeFile(path.join(dir, "StatsCounter.jsx"), content);
}

async function generateServiceGrid(dir) {
  const content = `"use client";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import Link from "next/link";

export default function ServiceGrid({ heading, subheading, services, bgColor, headingColor, cardBg, accentColor, padding }) {
  return (
    <section style={{ background: bgColor || "#FFFFFF", padding: \`\${padding || 60}px 0\` }}>
      <div className="max-w-7xl mx-auto px-4">
        {heading && <h2 className="text-3xl font-bold text-center mb-4" style={{ color: headingColor || "#1A1A2E" }}>{heading}</h2>}
        {subheading && <p className="text-center text-gray-600 mb-12">{subheading}</p>}
        <div className="grid md:grid-cols-3 gap-6">
          {services?.map((s, i) => {
            const Icon = LucideIcons[s.icon] || LucideIcons.Star;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-xl p-6 hover:shadow-lg transition-shadow" style={{ background: cardBg || "#F8F9FA" }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: \`\${accentColor || "#1ABC9C"}20\` }}>
                  <Icon size={24} style={{ color: accentColor || "#1ABC9C" }} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600 mb-4">{s.desc}</p>
                {s.link && <Link href={s.link} className="font-medium" style={{ color: accentColor || "#1ABC9C" }}>Learn more →</Link>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}`;
  await fs.writeFile(path.join(dir, "ServiceGrid.jsx"), content);
}

async function generateContactForm(dir) {
  const content = `"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactForm({ heading, subheading, submitText, bgColor, headingColor, accentColor, fields }) {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section style={{ background: bgColor || "#F8F9FA", padding: "60px 0" }}>
      <div className="max-w-2xl mx-auto px-4">
        {heading && <h2 className="text-3xl font-bold text-center mb-4" style={{ color: headingColor || "#1A1A2E" }}>{heading}</h2>}
        {subheading && <p className="text-center text-gray-600 mb-8">{subheading}</p>}
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: \`\${accentColor || "#1ABC9C"}20\` }}>
              <Send size={24} style={{ color: accentColor || "#1ABC9C" }} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
            <p className="text-gray-600">We will get back to you soon.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields?.map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium mb-1">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea name={f.name} required={f.required} placeholder={f.placeholder} onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" rows={4} />
                ) : (
                  <input type={f.type || "text"} name={f.name} required={f.required} placeholder={f.placeholder} onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                )}
              </div>
            ))}
            <button type="submit" className="w-full py-3 rounded-full font-semibold text-white transition-colors" style={{ background: accentColor || "#1ABC9C" }}>
              {submitText || "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}`;
  await fs.writeFile(path.join(dir, "ContactForm.jsx"), content);
}

async function generateNavbar(dir) {
  const content = `"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pages = [
    { name: "Home", slug: "home" },
    { name: "About", slug: "about" },
    { name: "Services", slug: "services" },
    { name: "Contact", slug: "contact" }
  ];

  return (
    <nav className={\`fixed top-0 left-0 right-0 z-50 transition-all \${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"}\`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-navy">
            ZAA Med <span className="text-primary">Solutions</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {pages.map((p) => (
              <Link key={p.slug} href={p.slug === "home" ? "/" : \`/\${p.slug}/\`} className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                {p.name}
              </Link>
            ))}
            <Link href="/contact/" className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
              Get Started
            </Link>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {pages.map((p) => (
                <Link key={p.slug} href={p.slug === "home" ? "/" : \`/\${p.slug}/\`} onClick={() => setIsOpen(false)} className="block py-2 text-gray-700 hover:text-primary">
                  {p.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}`;
  await fs.writeFile(path.join(dir, "Navbar.jsx"), content);
}

async function generateFooter(dir) {
  const content = `"use client";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white py-16">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-xl font-bold mb-4">
            ZAA Med <span className="text-primary">Solutions</span>
          </h3>
          <p className="text-gray-400 text-sm">
            Maximizing revenue for healthcare providers across the nation.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Medical Billing</li>
            <li>Revenue Cycle</li>
            <li>Compliance</li>
            <li>Analytics</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <div className="space-y-3 text-gray-400 text-sm">
            <div className="flex items-center gap-2"><MapPin size={16} /> New York, NY</div>
            <div className="flex items-center gap-2"><Phone size={16} /> +92 321 558 8718</div>
            <div className="flex items-center gap-2"><Mail size={16} /> info@zaamedsolutions.com</div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
        © 2026 ZAA Med Solutions. All rights reserved.
      </div>
    </footer>
  );
}`;
  await fs.writeFile(path.join(dir, "Footer.jsx"), content);
}

module.exports = { generateProjectFiles };
