"use client";

import {useState} from "react";

export default function ContactForm({title, buttonLabel}) {
  const [form, setForm] = useState({name: "", email: "", phone: "", message: ""});
  const [status, setStatus] = useState({loading: false, error: "", success: ""});

  function onChange(event) {
    const {name, value} = event.target;
    setForm((prev) => ({...prev, [name]: value}));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setStatus({loading: true, error: "", success: ""});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not submit.");
      }

      setStatus({loading: false, error: "", success: "Thanks, your query was sent."});
      setForm({name: "", email: "", phone: "", message: ""});
    } catch (error) {
      setStatus({loading: false, error: error.message, success: ""});
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <h3>{title || "Send us your query"}</h3>
      <input
        name="name"
        placeholder="Your name"
        value={form.name}
        onChange={onChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Your email"
        value={form.email}
        onChange={onChange}
        required
      />
      <input
        name="phone"
        placeholder="Your phone (optional)"
        value={form.phone}
        onChange={onChange}
      />
      <textarea
        name="message"
        placeholder="Tell us what you need help with"
        value={form.message}
        onChange={onChange}
        required
      />
      <button type="submit" disabled={status.loading}>
        {status.loading ? "Submitting..." : buttonLabel || "Submit"}
      </button>
      {status.error ? <p className="form-error">{status.error}</p> : null}
      {status.success ? <p className="form-success">{status.success}</p> : null}
    </form>
  );
}
