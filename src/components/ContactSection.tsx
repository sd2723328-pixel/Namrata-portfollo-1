import React, { useState } from 'react';
import { Mail, MapPin, Send, Phone, CheckCircle, AlertCircle, Github, Linkedin, MessageSquare, Clock } from 'lucide-react';
import { PersonalInfo } from '../types.js';
import { submitContact } from '../lib/api.js';

interface ContactSectionProps {
  personal: PersonalInfo;
  onShowToast: (msg: string, type: 'success' | 'error') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ personal, onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContact(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      onShowToast('Your message was sent successfully to Namrata!', 'success');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send message. Please try again.');
      onShowToast('Could not send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            Let's Connect & Collaborate
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Have an internship opening, a project idea, or a BCA study question? Drop me a message and I'll get back to you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <h3 className="font-display font-bold text-xl text-slate-900">
                Contact Information
              </h3>

              {/* Direct Email Card */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block">
                    Direct Email
                  </span>
                  <a
                    id="contact-direct-email-link"
                    href={`mailto:${personal.email}`}
                    className="text-sm sm:text-base font-semibold text-slate-900 hover:text-indigo-600 transition-colors break-all"
                  >
                    {personal.email}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Click to open your email client</p>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block">
                    Location
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-slate-900">
                    {personal.location || 'Kolkata, West Bengal, India'}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Open to on-site & remote opportunities</p>
                </div>
              </div>

              {/* Response Time Guarantee */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block">
                    Response Window
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">
                    Typically responds within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-xs">
              <h4 className="font-display font-bold text-base text-indigo-100 mb-3">
                Social & Coding Profiles
              </h4>
              <div className="flex flex-wrap gap-2.5">
                <a
                  id="contact-github-btn"
                  href={personal.socialLinks.github || 'https://github.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-800/80 hover:bg-indigo-700 text-xs font-semibold text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  id="contact-linkedin-btn"
                  href={personal.socialLinks.linkedin || 'https://linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-800/80 hover:bg-indigo-700 text-xs font-semibold text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  id="contact-email-btn"
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-800/80 hover:bg-indigo-700 text-xs font-semibold text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <h3 className="font-display font-bold text-xl text-slate-900 mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                <span>Send a Direct Message</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Your message is stored securely in the cloud database for Namrata.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-emerald-900">
                    Thank you! Your message was sent.
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                    Namrata has received your note in her admin dashboard and will reach out via your provided email.
                  </p>
                  <button
                    id="contact-send-another-btn"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priyanshu Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Internship Opportunity / BCA Collaboration"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message or inquiry here..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all resize-y"
                    />
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-xs transition-all focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
