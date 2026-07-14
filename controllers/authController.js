const User = require("../models/User");
const Project = require("../models/Project");
const jwt = require("jsonwebtoken");

const defaultProject = {
  name: "ZAA Med Solutions",
  slug: "zaa-med-solutions",
  pages: [
    {
      id: "home",
      name: "Home",
      slug: "/",
      sections: [
        {
          id: "hero-1",
          type: "hero",
          props: {
            title: "Medical Billing & Revenue Cycle Management",
            subtitle: "We increase collections for physicians, medical clinics, and small hospitals. Flat 2.8% billing rate. No gimmicks, just valuable medical billing excellence.",
            buttonText: "Get Started",
            buttonLink: "#contact",
            bgColor: "#1A1A2E",
            textColor: "#FFFFFF",
            buttonBgColor: "#1ABC9C",
            buttonTextColor: "#FFFFFF",
            alignment: "left",
            showBadge: true,
            badgeText: "HIPAA Compliant • SOC 2 • ISO 27001",
          },
        },
        {
          id: "stats-1",
          type: "stats",
          props: {
            bgColor: "#1A1A2E",
            textColor: "#FFFFFF",
            padding: 60,
            stats: [
              { number: 500, label: "Healthcare Professionals", suffix: "+", duration: 2 },
              { number: 150, label: "Partner Facilities", suffix: "+", duration: 2 },
              { number: 98, label: "Client Satisfaction", suffix: "%", duration: 2 },
              { number: 10, label: "Years Experience", suffix: "+", duration: 2 },
            ],
          },
        },
        {
          id: "text-1",
          type: "textBlock",
          props: {
            heading: "About ZAA Med Solutions",
            paragraph: "ZAA Med Solutions is a leading provider of comprehensive healthcare staffing and medical billing solutions, delivering qualified professionals and optimized revenue cycle management to medical facilities across the United States.",
            headingColor: "#1A1A2E",
            textColor: "#555555",
            bgColor: "#FFFFFF",
            alignment: "left",
            padding: 80,
            maxWidth: "800px",
          },
        },
        {
          id: "services-1",
          type: "serviceGrid",
          props: {
            heading: "Our Services",
            subheading: "Comprehensive healthcare solutions",
            bgColor: "#F8F9FA",
            headingColor: "#1A1A2E",
            cardBg: "#FFFFFF",
            accentColor: "#1ABC9C",
            padding: 80,
          },
        },
        {
          id: "testimonials-1",
          type: "testimonial",
          props: {
            heading: "What Our Clients Say",
            subheading: "Trusted by healthcare facilities",
            bgColor: "#FFFFFF",
            headingColor: "#1A1A2E",
            accentColor: "#1ABC9C",
            padding: 80,
            testimonials: [
              {
                quote: "ZAA Med Solutions provided exceptional nursing staff that integrated seamlessly with our team. Their professionalism is unmatched.",
                author: "Dr. Sarah Ahmed",
                role: "Hospital Director",
                rating: 5,
                image: "",
              },
              {
                quote: "Outstanding service quality and reliability. They understand the unique needs of healthcare facilities.",
                author: "Dr. Mohammad Khan",
                role: "Clinic Manager",
                rating: 5,
                image: "",
              },
            ],
          },
        },
        {
          id: "faq-1",
          type: "faq",
          props: {
            heading: "Frequently Asked Questions",
            subheading: "Find answers to common questions",
            bgColor: "#F8F9FA",
            headingColor: "#1A1A2E",
            accentColor: "#1ABC9C",
            padding: 80,
            items: [
              {
                question: "What services does ZAA Med Solutions provide?",
                answer: "We offer comprehensive healthcare staffing, medical billing, and revenue cycle management solutions for hospitals, clinics, and healthcare facilities.",
              },
              {
                question: "How do I get started with your services?",
                answer: "Simply contact us through our form or call our office. Our team will assess your needs and create a customized plan for your facility.",
              },
              {
                question: "What areas do you serve?",
                answer: "We serve medical facilities throughout the United States, with a focus on connecting quality healthcare professionals with institutions that need them most.",
              },
            ],
          },
        },
        {
          id: "contact-1",
          type: "contactForm",
          props: {
            heading: "Get In Touch",
            subheading: "Ready to improve your healthcare staffing?",
            bgColor: "#F8F9FA",
            headingColor: "#1A1A2E",
            accentColor: "#1ABC9C",
            padding: 80,
            submitText: "Send Message",
          },
        },
        {
          id: "footer-1",
          type: "footer",
          props: {
            companyName: "ZAA Med Solutions",
            tagline: "Professional healthcare staffing and medical billing solutions for modern facilities.",
            bgColor: "#1A1A2E",
            textColor: "#FFFFFF",
            accentColor: "#1ABC9C",
            padding: 60,
            copyright: "© 2024 ZAA Med Solutions. All rights reserved.",
          },
        },
      ],
      seo: {
        title: "ZAA Med Solutions | Medical Billing & Revenue Cycle Management",
        description: "Increase collections for physicians, medical clinics, and small hospitals. Get flat 2.8% billing rate. HIPAA compliant.",
        keywords: "medical billing, healthcare RCM, revenue cycle, USA",
      },
    },
    {
      id: "about",
      name: "About",
      slug: "/about",
      sections: [
        {
          id: "about-hero",
          type: "hero",
          props: {
            title: "About ZAA Med Solutions",
            subtitle: "Leading provider of comprehensive healthcare staffing and medical billing solutions.",
            buttonText: "Contact Us",
            buttonLink: "#contact",
            bgColor: "#1A1A2E",
            textColor: "#FFFFFF",
            buttonBgColor: "#1ABC9C",
            buttonTextColor: "#FFFFFF",
            alignment: "center",
            showBadge: false,
          },
        },
        {
          id: "about-text",
          type: "textBlock",
          props: {
            heading: "Our Story",
            paragraph: "Founded with a mission to revolutionize healthcare staffing and medical billing, ZAA Med Solutions has grown to become a trusted partner for medical facilities across the United States. We combine cutting-edge technology with deep industry expertise to deliver measurable results.",
            headingColor: "#1A1A2E",
            textColor: "#555555",
            bgColor: "#FFFFFF",
            alignment: "center",
            padding: 80,
            maxWidth: "800px",
          },
        },
      ],
      seo: {
        title: "About Us | ZAA Med Solutions",
        description: "Learn about ZAA Med Solutions - leading provider of healthcare staffing and medical billing.",
        keywords: "about ZAA Med, healthcare company",
      },
    },
    {
      id: "contact",
      name: "Contact",
      slug: "/contact",
      sections: [
        {
          id: "contact-hero",
          type: "hero",
          props: {
            title: "Contact Us",
            subtitle: "Ready to optimize your medical billing? Get in touch with our team.",
            buttonText: "Call Now",
            buttonLink: "tel:+923215588718",
            bgColor: "#1A1A2E",
            textColor: "#FFFFFF",
            buttonBgColor: "#1ABC9C",
            buttonTextColor: "#FFFFFF",
            alignment: "center",
            showBadge: false,
          },
        },
        {
          id: "contact-form",
          type: "contactForm",
          props: {
            heading: "Send Us a Message",
            subheading: "We'll get back to you within 24 hours",
            bgColor: "#F8F9FA",
            headingColor: "#1A1A2E",
            accentColor: "#1ABC9C",
            padding: 80,
            submitText: "Send Message",
          },
        },
      ],
      seo: {
        title: "Contact | ZAA Med Solutions",
        description: "Contact ZAA Med Solutions for healthcare staffing and medical billing services.",
        keywords: "contact ZAA Med, healthcare billing contact",
      },
    },
  ],
  settings: {
    siteName: "ZAA Med Solutions",
    phone: "+92 321 558 8718",
    email: "info@zaamedsolutions.com",
    address: "New York, NY 11377",
    primaryColor: "#1ABC9C",
    darkColor: "#1A1A2E",
  },
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const project = new Project({
      ...defaultProject,
      user: user._id,
    });
    await project.save();

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
