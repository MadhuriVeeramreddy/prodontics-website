// Central site data — edit here to change contact details, nav, services, team.

export const SITE = {
  url: "https://prodontics.in",
  name: "Prodontics Dental Specialities",
  phoneDisplay: "+91 949 055 6555",
  phoneTel: "+919490556555",
  whatsapp: "https://wa.me/919490556555",
  email: "smilewithprodontics@gmail.com",
  address: "Kokapet, Hyderabad",
  instagram: "https://www.instagram.com/smile_with_prodontics?utm_source=qr&igsh=MXVnZHplNzRtNmtoYw==",
  // The original site linked "Facebook" to a template LinkedIn profile; set the real page here.
  facebook: "",
  mapsPlace:
    "https://www.google.com/maps/place/PRODONTICS+DENTAL+SPECIALITIES/@17.3849745,78.334048,1091m/data=!3m1!1e3!4m8!3m7!1s0x3bcb95f0580b6365:0xf57c24b2b35141c7!8m2!3d17.3849745!4d78.3366229!9m1!1b1!16s%2Fg%2F11r_w26ynw?entry=ttu",
  mapsShort: "https://maps.app.goo.gl/UXWqk6bKvZsaJMwW9",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4065.361729585116!2d78.33404797544357!3d17.384974483501917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb95f0580b6365%3A0xf57c24b2b35141c7!2sPRODONTICS%20DENTAL%20SPECIALITIES!5e1!3m2!1sen!2sin!4v1758814666125!5m2!1sen!2sin",
  gaId: "G-2PV3ZCXLVZ",
  // Free form backend (https://web3forms.com). Put the access key in .env as NEXT_PUBLIC_WEB3FORMS_KEY.
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
} as const;

export type Service = {
  slug: string;
  title: string; // card title
  footer: string; // footer link label
  blurb: string;
  icon: IconName;
};

export type IconName =
  | "tooth" | "bandage" | "anchor" | "sparkle" | "waves" | "braces"
  | "kid" | "people" | "globe" | "wisdom";

export const SERVICES: Service[] = [
  { slug: "dental-surgery", title: "Dental Surgery", footer: "Dental Surgery", icon: "tooth",
    blurb: "Advanced dental surgery solutions to restore oral health and treat complex dental conditions with precision." },
  { slug: "root-canal", title: "Root Canal Therapy / RCT", footer: "Root Canal Therapy", icon: "bandage",
    blurb: "Pain-managed root canal treatment in Kokapet, Hyderabad to save and restore natural teeth." },
  { slug: "dental-implants", title: "Dental Implants", footer: "Dental Implants", icon: "anchor",
    blurb: "Natural-looking dental implants in Hyderabad for single, multiple, or full mouth tooth replacement." },
  { slug: "smile-design", title: "Smile Design", footer: "Smile Design", icon: "sparkle",
    blurb: "Transform your smile with cosmetic dentistry in Hyderabad, including teeth whitening, veneers, and zirconia crowns." },
  { slug: "aligners", title: "Aligners", footer: "Aligners", icon: "waves",
    blurb: "Customized braces and Invisalign in Hyderabad with transparent Invisalign cost and orthodontic options" },
  { slug: "braces", title: "Braces", footer: "Braces", icon: "braces",
    blurb: "Modern braces for perfectly aligned teeth and improved bite correction." },
  { slug: "kids-dentistry", title: "Kids Dentistry", footer: "Kids Dentistry", icon: "kid",
    blurb: "Gentle, child-friendly care to help little ones build healthy habits and overcome dental fears." },
  { slug: "community-outreach", title: "Community Outreach", footer: "Community Outreach", icon: "people",
    blurb: "Prodontics is dedicated to improving local oral health through dental camps and educational programs in communities." },
  { slug: "dental-tourism", title: "Dental Tourism", footer: "Dental Tourism", icon: "globe",
    blurb: "Experience affordable, world-class dental care at Prodontics, Kokapet, Hyderabad while exploring the culture of the city." },
];

export const NAV = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", dropdown: true },
  { href: "/blog", label: "Blog" },
  { href: "/vision", label: "Vision" },
  { href: "/contact", label: "Contact" },
] as const;

export const TEAM_LEADS = [
  { name: "Dr. SURYA TEJA . S", role: "IMPLANTOLOGY & GENERAL DENTISTRY", img: "/images/t6Z2YlyQENsa2o6inTbdXyzSnc.webp" },
  { name: "Dr. RAMYA. P", role: "B.D.S, MDHM (APOLLO)", img: "/images/73E7IxKH20le8K4f41fN5wF2X8.webp" },
];

export const TEAM = [
  { name: "Dr. Srujan Kumar", role: "MDS - Endodontist", img: "/images/zTmFPA7gI38GuZT3fnzDyaNzTNg.webp" },
  { name: "Dr. Rajasheker Embadi", role: "MDS - Oral Implantologist", img: "/images/SzaSDfzIoSVOacwcn8ejmFe1FEY.webp" },
  { name: "Dr. Narendra Seelam", role: "MDS - Periodontist", img: "/images/SGvfkBxDkTZjyW6xKxhvD08kQO8.webp" },
  { name: "Dr. Tejeshwar Sharma", role: "MDS - Endodontist", img: "/images/Z6Qdoyi8tys4IZ3AYQFx5mUVcw.webp" },
  { name: "Dr. Bharadwaj", role: "MDS - OMS", img: "/images/fJaDI2NIxx38PbYlFYjhjdesGxY.webp" },
];

export const TESTIMONIALS = [
  "\"Very good dental clinic in and around kokapet. Highly recommended dental clinic, very hygienic and pleasant. Dr. Surya is very good at identifying the root cause. He is very patient in explaining the issue and helped with my tooth pain. Very happy with the service. \" – Mattigunta Rishika",
  "\"I consulted Dr. Surya Teja for a small dental pain. He carefully examined everything step by step and explained the process clearly at each stage. His attention to detail and professional approach gave me a lot of confidence. The treatment was done with great care. Thank you so much, Dr. Surya Teja, for your excellent treatment.\" - Sanga Anil",
  "\"Excellent doctor.. has enquired all the conditions of patient beforing going ahead with process and extremly friendly and very supportive doctor Surya\" - Sree Kalyani",
  "\"Dr Surya is extremely patient and gentle. He understands your fears and inhibitions and makes all efforts to dissipate them. He has a very good hand, does his best always and is very proficient with what he does. Happy to have found a doctor like him.\" - Symantika Chelliah",
];

export const HOME_FAQ = [
  { q: "What dental services do you provide?",
    a: "We offer complete dental care, including general dentistry, cosmetic dentistry, pediatric dentistry, periodontal (gum) treatments, orthodontics, oral surgery, and emergency dental care." },
  { q: "What is the procedure for wisdom teeth removal?",
    a: "Wisdom teeth removal at Prodontics,Hyderabad is a painless dental procedure performed under local anesthesia. The dentist gently extracts the tooth, sometimes in sections, followed by stitches and healing guidance to ensure fast recovery." },
  { q: "Where is Prodontics Dental Clinic located?",
    a: "Our clinic is located in Kokapet, Hyderabad. You can find us easily via Google Maps https://maps.app.goo.gl/UXWqk6bKvZsaJMwW9" },
  { q: "What are the side effects of a root canal treatment?",
    a: "Root canal treatment is safe, but patients may experience mild swelling, temporary tooth sensitivity, or slight discomfort for a few days." },
];

export const HERO_IMAGES = [
  "fglK8Bfod4bM7tcrVCVNbABrJgk", "0rUXoaZFRyjwboNe2aYPu0XWOQ", "E3P9CrZRygt8fVIqKyw2uzHkUY",
  "tkcajrYwRKPjHiLD4fP4xd2OA", "BxyNkuFJWSbrUQLddFQpN9BjH4I", "l1exayCY6YJes5Id95vafijxrRU",
].map((id) => `/images/${id}.webp`);
