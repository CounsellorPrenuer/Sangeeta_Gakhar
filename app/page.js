import Image from "next/image";
import {createImageUrlBuilder} from "@sanity/image-url";
import ContactForm from "../components/ContactForm";
import PlansSection from "../components/PlansSection";
import {client} from "../sanity/lib/client";

const query = `*[_type == "homePage"][0]{
  ...,
  logo{asset->},
  customServices[]{
    ...,
    image{asset->}
  },
  founderImage{asset->}
}`;

function imageFor(source) {
  const builder = createImageUrlBuilder(client);
  return builder.image(source);
}



export default async function HomePage() {
  const data = await client.fetch(query);

  if (!data) {
    return (
      <main className="empty-state">
        <h1>No Sanity content found</h1>
        <p>Run `npm run seed` and refresh.</p>
      </main>
    );
  }

  const colors = data.theme || {};
  const navLinks = data.navLinks?.length
    ? data.navLinks
    : [
        {label: "Home", href: "#home"},
        {label: "About", href: "#about"},
        {label: "Plans", href: "#plans"},
        {label: "Services", href: "#services"},
        {label: "Testimonials", href: "#testimonials"},
        {label: "Contact", href: "#contact"},
      ];

  return (
    <main
      className="page"
      style={{
        "--navy": colors.navy,
        "--teal": colors.teal,
        "--sky": colors.sky,
        "--surface": colors.background,
        "--ink": colors.text,
        "--section": colors.section,
      }}
    >
      <header className="topbar">
        <div className="brand">
          {data.logo?.asset ? (
            <Image
              src={imageFor(data.logo).width(220).height(220).url()}
              alt={`${data.brandName} logo`}
              width={56}
              height={56}
              className="brand-logo"
            />
          ) : null}
          <div>
            <h1>{data.brandName}</h1>
            <p>{data.tagline}</p>
          </div>
        </div>
        <nav>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <section id="home" className="hero">
        <h2>{data.heroTitle}</h2>
        <p>{data.heroSubtitle}</p>
      </section>

      <section id="about" className="founder">
        <div>
          <h2>About</h2>
          <h3>{data.founderName}</h3>
          {data.founderBio?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {data.founderImage?.asset ? (
          <Image
            src={imageFor(data.founderImage).width(700).height(800).url()}
            alt={data.founderName}
            width={360}
            height={420}
          />
        ) : null}
      </section>

      <PlansSection 
        plans={data.plans} 
        customServices={data.customServices}
        customizeTitle={data.customizeTitle}
        customizeSubtitle={data.customizeSubtitle}
      />


      <section id="services" className="main-services">
        <h2>{data.servicesTitle}</h2>
        <div className="main-service-grid">
          {data.services?.map((service) => (
            <article key={service.name} className="main-service-card">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <strong>{service.whoFor}</strong>
              <ul>
                {service.highlights?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

      </section>

      <section id="testimonials" className="testimonials">
        <h2>{data.testimonialsTitle}</h2>
        <div className="testimonial-grid">
          {data.testimonials?.map((item) => (
            <article key={item.author}>
              <p>{item.quote}</p>
              <h4>{item.author}</h4>
              <small>{item.role}</small>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact" className="footer">
        <h2>{data.contactTitle}</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <p>{data.phone}</p>
            <p>{data.email}</p>
            <p>{data.officeLocation}</p>
            <div className="socials">
              {data.socialLinks?.map((social) => (
                <a key={social.platform} href={social.url} target="_blank" rel="noreferrer">
                  {social.platform}: {social.label}
                </a>
              ))}
            </div>
          </div>
          <ContactForm
            title={data.contactFormTitle}
            buttonLabel={data.contactFormButtonLabel}
          />
        </div>
      </footer>
    </main>
  );
}
