const initialProject = {
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
            image: "/medical_billing_dashboard.png",
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
          id: "home-quick-form",
          type: "quickForm",
          props: {},
        },
        {
          id: "home-logo-bar",
          type: "logoBar",
          props: {
            title: "Trusted by Healthcare Providers Across the USA",
            partners: [
              { name: "Medicare" },
              { name: "Medicaid" },
              { name: "Blue Cross Blue Shield" },
              { name: "UnitedHealthcare" },
              { name: "Aetna" },
              { name: "Cigna" },
              { name: "Humana" },
            ],
          },
        },
        {
          id: "home-about-dashboard",
          type: "aboutDashboard",
          props: {
            label: "Partner with Experts",
            heading: "Trusted Full-Service Medical Billing Company",
            paragraph1: "ZAA Med Solutions is a professional medical billing company offering the USA's most cost-effective and profitable billing services. We are a revenue cycle management company offering affordable billing solutions for the entire RCM life cycle – from Eligibility Verification to Denial Management.",
            paragraph2: "To make our services the best choice for your practice, we offer flexible and affordable medical billing services plans starting from as low as 2.8 percent.",
            features: [
              "Eligibility Verification",
              "Denial Management & Appeals",
              "Certified Specialty Coding",
              "Aggressive A/R Recovery",
            ],
            cleanClaimRate: "98.2%",
            billingFee: "2.8%",
            daysInAR: "24 Days",
            denialAppeals: "92.4%",
          },
        },
        {
          id: "home-benefits",
          type: "benefits",
          props: {
            label: "Proven Benefits",
            heading: "Benefits of Outsourcing to ZAA Med Solutions",
            cards: [
              { title: "Decrease in Costs", text: "Choose ZAA Med Solutions outsourced medical billing services for significant cost savings. Pay just 2.8% on your monthly collections and keep thousands of dollars in your pocket." },
              { title: "Enhanced Revenue", text: "A top medical billing company, ensures prompt and precise claims processing. Our expertise reduces rejections and denials, optimizing your billing cycle effectively." },
              { title: "Faster Payments", text: "Dependable medical billing with ERAs ensures swift, efficient processing across all carriers, ensuring reduced turnaround times, efficient processing across all carriers." }
            ],
            bottomHeading1: "Remove Billing and Compliance Errors with Our Professional Medical Billing Services",
            bottomHeading2: "Get a complete Medical Billing Audit of your Healthcare practice today!",
            bottomBtnText: "Get Free Audit Today",
          },
        },
        {
          id: "home-custom-solutions",
          type: "customSolutions",
          props: {
            title1: "Top Medical Billing Company Offering Custom Solutions",
            desc1: "ZAA Med Solutions has been a trusted billing partner offering medical billing services in the US for over two years. We are one of the best healthcare billing provider companies, empowering healthcare practices to achieve better financial outcomes and RCM. Our complete suite billing specialist services offer flexible scheduling, accurate reporting, and expert partner services.",
            title2: "Outsource to Affordable Third-Party Medical Billing Company",
            desc2: "ZAA Med Solutions is your trusted partner for top-tier medical billing services. We provide top-notch and quality services that make us stand out from the crowd. Our unwavering commitment to your success fuels exponential growth. As a reliable medical billing company, we prioritize your revenue cycle management (RCM), offering unmatched support. Experience RCM excellence with ZAA Med Solutions dedicated and unparalleled approach. Join us in elevating your success story today.",
          },
        },
        {
          id: "home-stats",
          type: "stats",
          props: {
            stats: [
              { number: 2.8, suffix: "%", label: "Flat Service Fee", sublabel: "Lowest Billing Rate in the USA" },
              { number: 500, suffix: "+", label: "Practices Managed", sublabel: "Serving Multi-specialty Clinics" },
              { number: 98, suffix: "%", label: "Clean Claim Rate", sublabel: "Industry-leading Coding Accuracy" },
              { number: 24, suffix: "/7", label: "Support Available", sublabel: "Dedicated Account Executives" },
            ],
          },
        },
        {
          id: "home-process",
          type: "processWorkflow",
          props: {
            label: "Proven Workflow",
            heading: "Your Revenue Cycle, Simplified",
            subdescription: "A seamless transition from patient registration to final insurance collections.",
            steps: [
              { number: '01', title: 'Eligibility Check', desc: 'Patient benefits are verified prior to the visit to ensure seamless coverage.' },
              { number: '02', title: 'Coding & Submission', desc: 'Coding audits are run to ensure compliant coding and instant electronic submission.' },
              { number: '03', title: 'Payment Posting', desc: 'ERAs and patient balances are posted, reconciled, and audited for accuracy.' },
              { number: '04', title: 'A/R Follow-up', desc: 'Unpaid claims are aggressively worked and re-submitted to secure every dollar.' }
            ],
          },
        },
        {
          id: "home-extension-staff",
          type: "extensionStaff",
          props: {
            label: "// Extension of Your Staff",
            heading: "ZAA Med Solutions Works as an Extension of Your Staff",
            leadText: "As a trusted medical billing company, we work alongside you as an extension of your staff. While we take care of your financial and revenue management, you get to focus on what's most important – your patients.",
            bodyText: "Your practice physicians, front-desk staff, nurses, and techs serve a purpose in your practice. That is to work together as a team and offer the absolute best care to patients – we help you do just that while taking your stress off financial matters.",
            subtitle: "What Makes Us Different and Best?",
            descParagraph1: "Your trusted partner for top-tier medical billing services. We provide top-notch and quality services that make us stand out from the crowd. Our unwavering commitment to your success fuels exponential growth.",
            descParagraph2: "As a reliable medical billing company, we prioritize your revenue cycle management (RCM), offering unmatched support. Experience RCM excellence with ZAA Med Solutions dedicated and unparalleled approach. Join us in elevating your success story today.",
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
          id: "home-compliance",
          type: "complianceSec",
          props: {
            label: "Data Security",
            heading: "Compliance You Can Trust",
            subdescription: "Patient health information and practices' financial data are safeguarded under strict security standards.",
          },
        },
        {
          id: "home-cta-banner",
          type: "ctaBannerSec",
          props: {
            heading: "Ready to Maximize Your Revenue?",
            subtitle: "Get a free billing audit and discover how much revenue you're leaving on the table.",
            buttonText: "Schedule Free Consultation",
          },
        },
        {
          id: "home-contact",
          type: "contactForm",
          props: {
            heading: "Find Your Revenue Leaks",
            subheading: "Fill out the form to request a free audit of your current billing accounts. A certified billing specialist will review your claims history, denial rates, and identify areas of collection losses.",
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
            columns: [
              { title: "Services", links: [{ text: "Medical Billing", url: "/services/medical-billing" }, { text: "Credentialing", url: "/services/credentialing" }] },
              { title: "Company", links: [{ text: "About Us", url: "/about" }, { text: "Contact", url: "/contact" }] }
            ],
            socialLinks: [
              { platform: "LinkedIn", url: "https://linkedin.com" }
            ]
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
      sections: [], // Empty sections will automatically fallback to the original beautiful static page!
      seo: {
        title: "About Us | ZAA Med Solutions - Medical Billing Partner",
        description: "Learn about ZAA Med Solutions, your trusted medical billing and revenue cycle partner since 2022.",
        keywords: "about us, medical billing agency, RCM team",
      },
    },
    {
      id: "services",
      name: "Our Services",
      slug: "/services",
      sections: [],
      seo: {
        title: "Our Services | ZAA Med Solutions - Medical Billing & Revenue Cycle Management",
        description: "Explore our comprehensive medical billing, provider credentialing, Accounts Receivable management, denial management, and RCM services.",
        keywords: "services, medical billing, credentialing, RCM",
      },
    },
    {
      id: "services-medical-billing",
      name: "Medical Billing",
      slug: "/services/medical-billing",
      sections: [],
      seo: {
        title: "Medical Billing Services | ZAA Med Solutions",
        description: "Professional Medical Billing Services services for healthcare providers. Starting at 2.8%. HIPAA compliant. Free consultation.",
        keywords: "medical billing, Medical Billing Services, RCM",
      },
    },
    {
      id: "services-credentialing",
      name: "Credentialing",
      slug: "/services/credentialing",
      sections: [],
      seo: {
        title: "Medical Credentialing Services | ZAA Med Solutions",
        description: "Quick provider credentialing and enrollment. Get paneled and in-network with key payers fast.",
        keywords: "credentialing, provider enrollment, paneled",
      },
    },
    {
      id: "services-ar-management",
      name: "A/R Management",
      slug: "/services/ar-management",
      sections: [],
      seo: {
        title: "Account Receivable Management | ZAA Med Solutions",
        description: "Trusted Accounts Receivable management services. Aggressive payer follow-ups, claim recovery, and clean claims.",
        keywords: "ar management, accounts receivable, collections",
      },
    },
    {
      id: "services-rcm",
      name: "Practice Management / RCM",
      slug: "/services/rcm",
      sections: [],
      seo: {
        title: "Revenue Cycle Management (RCM) | ZAA Med Solutions",
        description: "Optimize collections, medical coding, eligibility checks, claim validations, and denials management.",
        keywords: "rcm, revenue cycle, practice management",
      },
    },
    {
      id: "services-web-development",
      name: "Web Development",
      slug: "/services/web-development",
      sections: [],
      seo: {
        title: "Web Development Services | ZAA Med Solutions",
        description: "Custom medical office websites, behavioral health portals, headless CMS setups, and secure web application development.",
        keywords: "web development, healthcare website, patient portal",
      },
    },
    {
      id: "services-seo",
      name: "SEO",
      slug: "/services/seo",
      sections: [],
      seo: {
        title: "SEO & Digital Transformation | ZAA Med Solutions",
        description: "Rank organic keywords on Google first page. Search engine optimization, local search listings, and workflow automation.",
        keywords: "seo, healthcare marketing, digital transformation",
      },
    },
    {
      id: "contact",
      name: "Contact Us",
      slug: "/contact",
      sections: [],
      seo: {
        title: "Contact Us | ZAA Med Solutions",
        description: "Get in touch with our medical billing and credentialing experts. We are one call away.",
        keywords: "contact us, phone, email",
      },
    },
    {
      id: "blog",
      name: "Blog",
      slug: "/blog",
      sections: [],
      seo: {
        title: "Blog & Industry Insights | ZAA Med Solutions",
        description: "Latest industry insights, expert tips, and regulation updates in medical billing, credentialing, and revenue cycle management.",
        keywords: "blog, medical billing news, insights",
      },
    },
  ],
};

module.exports = initialProject;
