"use client";

import { useState } from "react";
import Image from "next/image";
import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "../sanity/lib/client";

function imageFor(source) {
  const builder = createImageUrlBuilder(client);
  return builder.image(source);
}

function FeatureItem(feature) {
  return (
    <li key={feature.text} className={feature.included ? "feature yes" : "feature no"}>
      <span>{feature.included ? "+" : "-"}</span>
      <p>{feature.text}</p>
    </li>
  );
}

export default function PlansSection({ plans, customServices, customizeTitle, customizeSubtitle }) {
  const [activeTab, setActiveTab] = useState("mentoria"); // "mentoria" or "customise"
  const [selectedAudienceIndex, setSelectedAudienceIndex] = useState(0);

  const activePlan = plans?.[selectedAudienceIndex];

  return (
    <>
      <section id="plans" className="plans">
        <div className="segmented-head">
          <button 
            className={activeTab === "mentoria" ? "active" : ""} 
            onClick={() => setActiveTab("mentoria")}
          >
            Mentoria&apos;s Plans
          </button>
          <button 
            className={activeTab === "customise" ? "active" : ""} 
            onClick={() => setActiveTab("customise")}
          >
            Customise Your Mentorship Plan
          </button>
        </div>

        {activeTab === "mentoria" && (
          <>
            <div className="audience-tabs">
              {plans?.map((plan, idx) => (
                <button 
                  key={plan.audience} 
                  className={selectedAudienceIndex === idx ? "tab active" : "tab"}
                  onClick={() => setSelectedAudienceIndex(idx)}
                >
                  {plan.audience}
                </button>
              ))}
            </div>

            {activePlan ? (
              <div className="plan-grid">
                <article className="plan-card">
                  <small>STANDARD</small>
                  <h3>{activePlan.standardPlan?.title}</h3>
                  <h4>{activePlan.standardPlan?.price}</h4>
                  <ul>{activePlan.standardPlan?.features?.map((f, i) => <FeatureItem key={i} {...f} />)}</ul>
                  <button>BUY NOW</button>
                </article>
                <article className="plan-card premium">
                  <small>PREMIUM</small>
                  <h3>{activePlan.premiumPlan?.title}</h3>
                  <h4>{activePlan.premiumPlan?.price}</h4>
                  <ul>{activePlan.premiumPlan?.features?.map((f, i) => <FeatureItem key={i} {...f} />)}</ul>
                  <button>BUY NOW</button>
                </article>
              </div>
            ) : null}
          </>
        )}

        {activeTab === "customise" && (
          <div className="custom-services" style={{ marginTop: "2rem" }}>
            <h2>{customizeTitle}</h2>
            <p>{customizeSubtitle}</p>
            <div className="service-card-grid">
              {customServices?.map((service) => (
                <article key={service.title} className="service-card">
                  {service.image?.asset ? (
                    <Image
                      src={imageFor(service.image).width(180).height(180).url()}
                      alt={service.title}
                      width={120}
                      height={120}
                    />
                  ) : null}
                  <h3>{service.title}</h3>
                  <h4>{service.price}</h4>
                  <p>{service.description}</p>
                  <button>BUY NOW</button>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
