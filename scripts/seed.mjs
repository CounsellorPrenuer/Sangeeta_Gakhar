import fs from "node:fs";
import path from "node:path";
import {createClient} from "@sanity/client";

const cwd = process.cwd();
const envPath = path.join(cwd, ".env.local");

if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const idx = line.indexOf("=");
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "w6jeuoaf",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_EDITOR_TOKEN,
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-01",
});

if (!process.env.SANITY_EDITOR_TOKEN) {
  throw new Error("Missing SANITY_EDITOR_TOKEN in .env.local");
}

async function uploadImage(fileName) {
  const filePath = path.join(cwd, "public", "media", fileName);
  const stream = fs.createReadStream(filePath);
  const asset = await client.assets.upload("image", stream, {
    filename: fileName,
  });
  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

async function run() {
  const images = {
    logo: await uploadImage("logo.svg"),
    cv: await uploadImage("cv.svg"),
    linkedin: await uploadImage("linkedin.svg"),
    job: await uploadImage("job.svg"),
    report: await uploadImage("report.svg"),
    knowledge: await uploadImage("knowledge.svg"),
    session: await uploadImage("session.svg"),
    overseas: await uploadImage("overseas.svg"),
    interview: await uploadImage("interview.svg"),
    founder: await uploadImage("founder.svg"),
  };

  const document = {
    _id: "homePage",
    _type: "homePage",
    brandName: "CareerWeaverz",
    tagline: "Clarity Before Choice",
    heroTitle: "CareerWeaverz",
    heroSubtitle:
      "Career Weaverz is a premier guidance ecosystem designed to transform academic uncertainty into a strategic roadmap for professional fulfillment.",
    navLinks: [
      {label: "Home", href: "#home"},
      {label: "About", href: "#about"},
      {label: "Plans", href: "#plans"},
      {label: "Services", href: "#services"},
      {label: "Testimonials", href: "#testimonials"},
      {label: "Contact", href: "#contact"},
    ],
    logo: images.logo,
    aboutParagraphs: [
      "Founded by behavioral expert Sangeeta Gakhar, CareerWeaverz is built on the philosophy of clarity before choice.",
      "By blending scientific psychometric assessments with personalized counseling, we help students move beyond marks-based decisions and discover their true potential.",
    ],
    theme: {
      navy: "#0F2A44",
      teal: "#1FA4A9",
      sky: "#7FD1D6",
      background: "#F7FBFC",
      text: "#1E2A32",
      section: "#E9F3F4",
    },
    plans: [
      {
        audience: "8-9 STUDENTS",
        standardPlan: {
          title: "Discover",
          price: "₹ 5,500",
          features: [
            {text: "Psychometric assessment to measure interests", included: true},
            {text: "1 career counselling session", included: true},
            {text: "Lifetime access to Knowledge Gateway", included: true},
            {text: "Invites to industry webinars", included: true},
            {text: "Customised reports after each session", included: false},
            {text: "Guidance on studying abroad", included: false},
            {text: "CV building during internships/graduation", included: false},
          ],
        },
        premiumPlan: {
          title: "Discover Plus+",
          price: "₹ 15,000",
          features: [
            {text: "Psychometric assessments for interests, personality and abilities", included: true},
            {text: "8 career counselling sessions till graduation", included: true},
            {text: "Lifetime access to Knowledge Gateway", included: true},
            {text: "Invites to industry webinars", included: true},
            {text: "Customised reports after each session", included: true},
            {text: "Guidance on studying abroad", included: true},
            {text: "CV building during internships/graduation", included: true},
          ],
        },
      },
      {
        audience: "10-12 STUDENTS",
        standardPlan: {
          title: "Achieve Online",
          price: "₹ 5,999",
          features: [
            {text: "Psychometric assessment for interests, personality and abilities", included: true},
            {text: "1 career counselling session", included: true},
            {text: "Lifetime access to Knowledge Gateway", included: true},
            {text: "Pre-recorded webinars by experts", included: true},
            {text: "Customised reports after each session", included: false},
            {text: "Guidance on studying abroad", included: false},
            {text: "CV reviews during internships/graduation", included: false},
          ],
        },
        premiumPlan: {
          title: "Achieve Plus+",
          price: "₹ 10,599",
          features: [
            {text: "Psychometric assessment for interests, personality and abilities", included: true},
            {text: "4 career counselling sessions", included: true},
            {text: "Lifetime access to Knowledge Gateway", included: true},
            {text: "Attend live webinars by experts", included: true},
            {text: "Customised reports after each session", included: true},
            {text: "Guidance on studying abroad", included: true},
            {text: "CV reviews during internships/graduation", included: true},
          ],
        },
      },
      {
        audience: "COLLEGE GRADUATES",
        standardPlan: {
          title: "Ascend Online",
          price: "₹ 6,499",
          features: [
            {text: "Psychometric assessment for interests, personality and abilities", included: true},
            {text: "1 career counselling session", included: true},
            {text: "Lifetime access to Knowledge Gateway", included: true},
            {text: "Pre-recorded webinars by experts", included: true},
            {text: "Customised reports with certificate/course information", included: false},
            {text: "Guidance on studying abroad", included: false},
            {text: "CV reviews for job application", included: false},
          ],
        },
        premiumPlan: {
          title: "Ascend Plus+",
          price: "₹ 10,599",
          features: [
            {text: "Psychometric assessment for interests, personality and abilities", included: true},
            {text: "3 career counselling sessions", included: true},
            {text: "Lifetime access to Knowledge Gateway", included: true},
            {text: "Attend live webinars by experts", included: true},
            {text: "Customised reports with certificate/course information", included: true},
            {text: "Guidance on studying abroad", included: true},
            {text: "CV reviews for job application", included: true},
          ],
        },
      },
      {
        audience: "WORKING PROFESSIONALS",
        standardPlan: {
          title: "Ascend Online",
          price: "₹ 6,499",
          features: [
            {text: "Psychometric assessment for interests, personality and abilities", included: true},
            {text: "1 career counselling session", included: true},
            {text: "Lifetime access to Knowledge Gateway", included: true},
            {text: "Pre-recorded webinars by experts", included: true},
            {text: "Customised reports with certificate/course information", included: false},
            {text: "Guidance on studying abroad", included: false},
            {text: "CV reviews for job application", included: false},
          ],
        },
        premiumPlan: {
          title: "Ascend Plus+",
          price: "₹ 10,599",
          features: [
            {text: "Psychometric assessment for interests, personality and abilities", included: true},
            {text: "3 career counselling sessions", included: true},
            {text: "Lifetime access to Knowledge Gateway", included: true},
            {text: "Attend live webinars by experts", included: true},
            {text: "Customised reports with certificate/course information", included: true},
            {text: "Guidance on studying abroad", included: true},
            {text: "CV reviews for job application", included: true},
          ],
        },
      },
    ],
    customizeTitle: "Want To Customise Your Mentorship Plan?",
    customizeSubtitle:
      "If you want to subscribe to specific services from CareerWeaverz, choose one or more modules below.",
    customServices: [
      {
        title: "CV Building",
        price: "₹2000",
        description:
          "Build a first-impression CV with HR-led recommendations that increase interview chances.",
        image: images.cv,
      },
      {
        title: "LinkedIn Profile Building",
        price: "₹2000",
        description:
          "Revamp your LinkedIn profile with recruiter-backed guidance to improve discoverability.",
        image: images.linkedin,
      },
      {
        title: "LinkedIn Profile + CV Building",
        price: "₹3500",
        description: "Get both profile and CV optimized together by HR/recruitment experts.",
        image: images.cv,
      },
      {
        title: "Job Application Strategy",
        price: "₹4000",
        description:
          "Get a customized pipeline for job applications with role and company targeting support.",
        image: images.job,
      },
      {
        title: "Career Report",
        price: "₹2500",
        description:
          "Receive a detailed psychometric report analyzing interests, personality and abilities.",
        image: images.report,
      },
      {
        title: "Career Report + Career Counselling",
        price: "₹4000",
        description:
          "Combine psychometric report insights with expert counseling for an actionable plan.",
        image: images.report,
      },
      {
        title: "Knowledge Gateway + Career Helpline Access",
        price: "₹250/month",
        description: "Get ongoing resources and direct expert support for timely career queries.",
        image: images.knowledge,
      },
      {
        title: "One-to-One Session with a Career Expert",
        price: "₹3500 per hour",
        description:
          "Resolve career doubts with a focused personal interaction guided by domain experts.",
        image: images.session,
      },
      {
        title: "Overseas Admission Planner",
        price: "₹3000",
        description:
          "Explore options across India and abroad with unbiased recommendations in one call.",
        image: images.overseas,
      },
      {
        title: "Overseas Admission: SOP Brainstorm",
        price: "₹3000",
        description:
          "Structure your SOP for stronger admissions outcomes through expert discussions.",
        image: images.overseas,
      },
      {
        title: "Overseas Admission: SOP Review",
        price: "₹2500",
        description:
          "Get your SOP reviewed by admissions experts before final submission.",
        image: images.overseas,
      },
      {
        title: "Interview Prep Session",
        price: "₹2000",
        description:
          "Prepare for interviews with practical coaching to improve confidence and conversions.",
        image: images.interview,
      },
    ],
    servicesTitle: "Core Services",
    services: [
      {
        name: "Strategic Career Assessment",
        description:
          "The foundation of every successful journey is self-awareness. We use data-driven insights to eliminate guesswork.",
        whoFor: "Who it is for: Grades 9-12",
        highlights: [
          "Comprehensive Psychometric Interest Analysis",
          "Clarity Session (Assessment + Counseling)",
        ],
      },
      {
        name: "Behavioral Excellence & Soft Skills",
        description:
          "Specialized training to master articulation, group discussions, body language, and confidence.",
        whoFor: "Who it is for: Grades 9-12 (Online)",
        highlights: [
          "Interview & Group Discussion (GD) Mastery",
          "Confidence & Presence Coaching",
        ],
      },
      {
        name: "Professional Branding & Profile Building",
        description:
          "Modern careers require a digital and paper footprint that commands attention.",
        whoFor: "Who it is for: Students, Graduates and Working Professionals",
        highlights: ["LinkedIn Professional Identity", "High-Impact Resume Building"],
      },
    ],
    founderName: "Sangeeta Gakhar",
    founderBio: [
      "Sangeeta Gakhar is a distinguished behavioral strategist and certified career counselor with nearly two decades of experience in human potential development.",
      "Her professional foundation was built in global leaders including HCL, British Telecom, Indigo, and Snapdeal, giving her deep insight into modern workforce expectations.",
      "Driven by the philosophy of clarity before choice, she founded CareerWeaverz to help learners move beyond marks-based confusion to confident, evidence-backed career decisions.",
    ],
    founderImage: images.founder,
    testimonialsTitle: "The Clarity Before Choice Experience",
    testimonials: [
      {
        quote:
          "Before meeting Sangeeta, we were overwhelmed by options and board-mark pressure. Her psychometric analysis and empathetic counseling gave my son clear direction.",
        author: "Vidhi Maheshwari",
        role: "Parent (Grade 11 Student)",
      },
      {
        quote:
          "Her corporate background with HCL and Indigo sets her apart. Body language and confidence coaching helped me clear interviews with poise.",
        author: "Rohan Mehta",
        role: "Engineering Graduate",
      },
      {
        quote:
          "I did not realize how important digital branding was until working with her. LinkedIn and resume guidance made my profile recruiter-ready.",
        author: "Anisha Taneja",
        role: "Economics Graduate",
      },
      {
        quote:
          "Stream selection in Grade 11 felt risky until CareerWeaverz. The structured assessment removed guesswork and aligned ability with interest.",
        author: "Nidhi Narang",
        role: "Parent",
      },
    ],
    contactTitle: "Contact CareerWeaverz",
    contactFormTitle: "Book a Career Clarity Call",
    contactFormButtonLabel: "Send Query",
    phone: "Phone / WhatsApp: Available on request",
    email: "mentoria.sangeeta@gmail.com",
    officeLocation: "Office location: None",
    socialLinks: [
      {
        platform: "Instagram",
        label: "@careerweaverz",
        url: "https://instagram.com/careerweaverz",
      },
      {
        platform: "LinkedIn",
        label: "sangeeta-gakhar-97201324",
        url: "https://www.linkedin.com/in/sangeeta-gakhar-97201324",
      },
      {
        platform: "YouTube",
        label: "@careerweaverz",
        url: "https://youtube.com/@careerweaverz",
      },
    ],
  };

  await client.createOrReplace(document);
  console.log("Sanity seed complete.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
