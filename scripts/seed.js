const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

dotenv.config({ path: path.join(__dirname, "../.env") });

const User = require("../models/User");
const Project = require("../models/Project");

const defaultProjectData = {
  name: "ZAA Med Solutions",
  slug: "zaa-med-solutions",
  settings: {
    siteName: "ZAA Med Solutions",
    phone: "+92 321 558 8718",
    email: "info@zaamedsolutions.com",
    address: "New York, NY 11377",
    primaryColor: "#1ABC9C",
    darkColor: "#1A1A2E",
  },
  pages: [
    {
      id: "home",
      name: "Home",
      slug: "/",
      sections: [
        {
          id: "home-hero",
          type: "hero",
          props: {
            title: "Increasing Collectibles For Physicians, Medical Clinics, And Small Hospitals",
            subtitle: "Enjoy competitive medical billing rates at 2.8% without promotional schemes. We work as an extension of your staff to deliver medical billing excellence.",
            buttonText: "Get Free Audit",
            buttonLink: "#contact",
            bgColor: "#ffffff",
            bgGradient: "linear-gradient(180deg, #ffffff 0%, #f1faf8 100%)",
            textColor: "#1A1A2E",
            buttonBgColor: "#1ABC9C",
            buttonTextColor: "#ffffff",
            alignment: "left",
            showBadge: true,
            badgeText: "2.8% Flat Rate — No gimmicks",
          },
        },
        {
          id: "home-stats",
          type: "stats",
          props: {
            bgColor: "#1ABC9C",
            textColor: "#ffffff",
            padding: 60,
            stats: [
              { number: 98, label: "Clean Claim Rate", suffix: "%", duration: 2 },
              { number: 2, label: "Flat Billing Fee", suffix: ".8%", duration: 2 },
              { number: 24, label: "Average Days in A/R", suffix: "", duration: 2 },
              { number: 92, label: "Denial Appeals Recovery", suffix: "%", duration: 2 },
            ],
          },
        },
        {
          id: "home-about",
          type: "text",
          props: {
            heading: "Trusted Full-Service Medical Billing Company",
            paragraph: "ZAA Med Solutions is a professional medical billing company offering the USA's most cost-effective and profitable billing services. We offer flexible and affordable medical billing services plans starting from as low as 2.8 percent.\n\nWe are a revenue cycle management company offering affordable billing solutions for the entire RCM life cycle – from Eligibility Verification to Denial Management.",
            headingColor: "#1A1A2E",
            textColor: "#5A5D7A",
            bgColor: "#ffffff",
            alignment: "left",
            padding: 80,
            maxWidth: "800px",
          },
        },
        {
          id: "home-services",
          type: "serviceGrid",
          props: {
            heading: "Our Services",
            subheading: "Comprehensive healthcare solutions tailored to your practice",
            cardBg: "#ffffff",
            bgColor: "#F8F9FA",
            accentColor: "#1ABC9C",
            headingColor: "#1A1A2E",
            padding: 80,
            services: [
              { icon: "FileText", title: "Medical Billing", desc: "Expert billers trained in specialty-specific medical coding. Accurate, swift, and clean claim submissions.", link: "/services/medical-billing" },
              { icon: "Users", title: "Medical Credentialing", desc: "Quick MD/provider credentialing and enrollment. Get paneled and in-network with key payers fast.", link: "/services/credentialing" },
              { icon: "TrendingUp", title: "Accounts Receivable", desc: "Dedicated A/R recovery and denial tracking. Higher collections with minimal outstanding aging balances.", link: "/services/ar-management" },
              { icon: "Heart", title: "Practice Management", desc: "Operational streamlining. We optimize workflows to balance provider schedules and clinical revenue cycles.", link: "/services/rcm" },
              { icon: "Shield", title: "Denial Management", desc: "Actionable root-cause denial analysis. Appeal and remedy rejected claims with high recovery success.", link: "/services/medical-billing" },
              { icon: "CheckCircle", title: "Eligibility Verification", desc: "Instant, pre-visit insurance verification. Verify copays, deductibles, and benefits to avoid front-desk write-offs.", link: "/services/medical-billing" },
            ],
          },
        },
        {
          id: "home-testimonials",
          type: "testimonial",
          props: {
            heading: "What Our Clients Say",
            subheading: "Trusted by healthcare facilities across the USA",
            bgColor: "#ffffff",
            headingColor: "#1A1A2E",
            accentColor: "#1ABC9C",
            padding: 80,
            testimonials: [
              {
                quote: "ZAA Med Solutions has been an absolute game changer. Outsource billing was scary, but our collections increased by 18% in the first quarter alone, and we pay exactly 2.8%. No hidden fees.",
                author: "Dr. Amanda Ross, MD",
                role: "Ross Family Medicine, NY",
                rating: 5,
              },
              {
                quote: "Getting credentialed with Blue Cross and Aetna used to take us months of endless paperwork. Their credentialing team completed everything in weeks. Excellent communication throughout.",
                author: "Sarah Jenkins",
                role: "Practice Manager, Metro Pediatric Clinic, TX",
                rating: 5,
              },
              {
                quote: "Their A/R clean-up service is outstanding. They recovered over $45,000 in aging claims that our previous billers had written off as uncollectible. Highly recommend their 2.8% model.",
                author: "Dr. Tariq Al-Sayed, FACP",
                role: "Midwood Nephrology Center, NJ",
                rating: 5,
              },
            ],
          },
        },
        {
          id: "home-contact",
          type: "contactForm",
          props: {
            heading: "Find Your Revenue Leaks",
            subheading: "Fill out the form to request a free audit of your current billing accounts. A certified billing specialist will review your claims history, denial rates, and identify areas of collection losses.",
            bgColor: "#F8F9FA",
            headingColor: "#1A1A2E",
            accentColor: "#1ABC9C",
            submitText: "Schedule Free Consultation",
          },
        },
        {
          id: "home-footer",
          type: "footer",
          props: {
            companyName: "ZAA Med Solutions",
            tagline: "Maximizing revenue for healthcare providers across the nation.",
            bgColor: "#1A1A2E",
            textColor: "#ffffff",
            accentColor: "#1ABC9C",
            padding: 60,
            copyright: "© 2026 ZAA Med Solutions. All rights reserved.",
          },
        },
      ],
      seo: {
        title: "ZAA Med Solutions | Professional Medical Billing & RCM Services",
        description: "Increase collectibles for physicians and medical clinics. Flat 2.8% billing rate. Prompt & precise claims processing. HIPAA & SOC 2 compliant.",
        keywords: "medical billing, RCM solutions, credentialing, A/R recovery",
      },
    },
    {
      id: "about",
      name: "About Us",
      slug: "/about",
      sections: [
        {
          id: "about-hero",
          type: "hero",
          props: {
            title: "About ZAA Med Solutions",
            subtitle: "Your trusted medical billing and revenue cycle partner since 2022.",
            buttonText: "Request Consultation",
            buttonLink: "/contact",
            bgColor: "#1A1A2E",
            textColor: "#ffffff",
            buttonBgColor: "#1ABC9C",
            buttonTextColor: "#ffffff",
            alignment: "center",
            showBadge: true,
            badgeText: "Partner with Experts",
          },
        },
        {
          id: "about-story",
          type: "text",
          props: {
            heading: "Our Journey & Commitment",
            paragraph: "Founded with a mission to revolutionize practice administration, ZAA Med Solutions has grown to become a leading RCM partner for medical facilities across the United States. We combine billing precision with a flat 2.8% pricing structure to offer our clients complete fee transparency and optimal cash flows.\n\nOur billing specialists, certified professional coders, and A/R follow-up team work as a dedicated extension of your practice.",
            headingColor: "#1A1A2E",
            textColor: "#5A5D7A",
            bgColor: "#ffffff",
            alignment: "center",
            padding: 80,
            maxWidth: "800px",
          },
        },
      ],
      seo: {
        title: "About Us | ZAA Med Solutions - Medical Billing Partner",
        description: "Learn about ZAA Med Solutions, your trusted medical billing and revenue cycle partner since 2022. Meet our RCM experts and achievements.",
        keywords: "about us, medical billing agency, RCM team",
      },
    },
  ],
};

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    console.log("Connecting to MongoDB...");
    try {
      await mongoose.connect(process.env.MONGODB_URI);
    } catch (srvErr) {
      console.warn("SRV connection failed, trying direct replica set connection...", srvErr.message);
      const directUri = "mongodb://officialusamano1_db_user:n0fuSlFpHGCGIooT@ac-rgae3vp-shard-00-00.jdoswuk.mongodb.net:27017,ac-rgae3vp-shard-00-01.jdoswuk.mongodb.net:27017,ac-rgae3vp-shard-00-02.jdoswuk.mongodb.net:27017/zaa-builder?ssl=true&replicaSet=atlas-m18uoz-shard-0&authSource=admin&retryWrites=true&w=majority";
      await mongoose.connect(directUri);
    }
    console.log("Connected to MongoDB successfully.");

    // Find the user admin@zaamedsolutions.com
    const user = await User.findOne({ email: "admin@zaamedsolutions.com" });
    if (!user) {
      console.log("User admin@zaamedsolutions.com not found. Seeding skipped.");
      process.exit(1);
    }

    console.log("Found user:", user.email, "(_id:", user._id, ")");

    // Delete existing project with slug "zaa-med-solutions" for this user
    await Project.deleteOne({ slug: "zaa-med-solutions" });
    console.log("Deleted old project.");

    // Create new project with actual pages
    const project = new Project({
      ...defaultProjectData,
      user: user._id,
    });

    await project.save();
    console.log("Seeded project with actual ZAA Med Solutions website sections successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
