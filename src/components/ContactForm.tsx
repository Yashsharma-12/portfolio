"use client";

import { useState } from "react";

export default function ContactForm({ inverted }: { inverted: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Full-time role",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", projectType: "Full-time role", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col border-t ${inverted ? 'border-black' : 'border-[#0A0A0B]'}`}>
      <label className={`flex flex-col gap-2 py-5 border-b ${inverted ? 'border-black' : 'border-black/15'}`}>
        <span className={`font-mono text-[11px] tracking-[0.12em] uppercase ${inverted ? 'text-black' : 'text-[#0A0A0B]/50'}`}>Name</span>
        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your name" 
          className={`bg-transparent border-none outline-none font-sans text-xl font-medium py-1 tracking-tight ${inverted ? 'text-black placeholder:text-black/50' : 'text-[#0A0A0B] placeholder:text-black/30'}`} 
        />
      </label>
      <label className={`flex flex-col gap-2 py-5 border-b ${inverted ? 'border-black' : 'border-black/15'}`}>
        <span className={`font-mono text-[11px] tracking-[0.12em] uppercase ${inverted ? 'text-black' : 'text-[#0A0A0B]/50'}`}>Email</span>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="you@company.com" 
          className={`bg-transparent border-none outline-none font-sans text-xl font-medium py-1 tracking-tight ${inverted ? 'text-black placeholder:text-black/50' : 'text-[#0A0A0B] placeholder:text-black/30'}`} 
        />
      </label>
      <label className={`flex flex-col gap-2 py-5 border-b ${inverted ? 'border-black' : 'border-black/15'}`}>
        <span className={`font-mono text-[11px] tracking-[0.12em] uppercase ${inverted ? 'text-black' : 'text-[#0A0A0B]/50'}`}>Project type</span>
        <select 
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className={`bg-transparent border-none outline-none font-sans text-xl font-medium py-1 tracking-tight appearance-none cursor-pointer ${inverted ? 'text-black' : 'text-[#0A0A0B]'}`}
        >
          <option>Full-time role</option>
          <option>Internship</option>
          <option>Freelance / contract</option>
          <option>Just saying hi</option>
        </select>
      </label>
      <label className={`flex flex-col gap-2 py-5 border-b ${inverted ? 'border-black' : 'border-black/15'}`}>
        <span className={`font-mono text-[11px] tracking-[0.12em] uppercase ${inverted ? 'text-black' : 'text-[#0A0A0B]/50'}`}>Message</span>
        <textarea 
          rows={4} 
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Tell me about your team, product, and what success looks like." 
          className={`bg-transparent border-none outline-none font-sans text-[17px] font-normal py-1 resize-y leading-relaxed ${inverted ? 'text-black placeholder:text-black/50' : 'text-[#0A0A0B] placeholder:text-black/40'}`}
        ></textarea>
      </label>
      <div className="pt-8 flex justify-between items-center flex-wrap gap-4">
        <div className={`font-mono text-[11px] tracking-wider uppercase ${status === 'success' ? 'text-green-600' : status === 'error' ? 'text-red-500' : inverted ? 'text-black' : 'text-[#0A0A0B]/50'}`}>
          {status === 'success' ? 'Message sent successfully!' : status === 'error' ? 'Failed to send message.' : 'Available for new opportunities'}
        </div>
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className={`inline-flex items-center gap-3 px-8 py-5 font-sans font-medium text-[15px] tracking-wide transition-colors rounded-sm disabled:opacity-50 ${inverted ? 'bg-transparent border border-black text-black hover:bg-black/10' : 'bg-[#0A0A0B] text-[#F5F5F5] hover:bg-[#CD3232]'}`}
        >
          {status === 'loading' ? 'Sending...' : 'Send message'}
          <span>→</span>
        </button>
      </div>
    </form>
  );
}
