'use client';

import { useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import SpotlightCard from '@/components/SpotlightCard/SpotlightCard';
import { Mail, Send, CheckCircle2, AlertCircle, Clock, ShieldCheck, MessageSquare, User, Tag } from 'lucide-react';
import styles from './page.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null, message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || 'Failed to submit contact message.');
      }

      setStatus({
        loading: false,
        success: true,
        error: null,
        message: data.message || 'Message sent successfully!',
      });

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
      });
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.message,
        message: '',
      });
    }
  };

  return (
    <>
      <Header />

      <main className={styles.main}>
        <div className="eyebrow-container reveal">
          <div className="eyebrow-line" />
          <span className="eyebrow-label">GET IN TOUCH</span>
          <div className="eyebrow-line" />
        </div>

        <h1 className={`${styles.headline} reveal reveal-delay-1`}>Contact Us</h1>
        <p className={`${styles.subtext} reveal reveal-delay-2`}>
          Have a question, feedback, or feature request? Drop us a line below and we will get back to you promptly.
        </p>

        <div className={`${styles.container} reveal`}>
          {/* Main Contact Form */}
          <SpotlightCard spotlightColor="rgba(124, 106, 239, 0.22)" className={`${styles.formCard} glass-panel`}>
            {status.success && (
              <div className={styles.alertSuccess}>
                <CheckCircle2 size={20} />
                <span>{status.message}</span>
              </div>
            )}

            {status.error && (
              <div className={styles.alertError}>
                <AlertCircle size={20} />
                <span>{status.error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className={styles.rowInputs}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="name">
                    <User size={15} className={styles.labelIcon} />
                    <span>Your Name</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="email">
                    <Mail size={15} className={styles.labelIcon} />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="subject">
                  <Tag size={15} className={styles.labelIcon} />
                  <span>Subject Category</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Bug Report">Bug Report / Broken Link</option>
                  <option value="Partnerships & Business">Partnerships & Business</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="message">
                  <MessageSquare size={15} className={styles.labelIcon} />
                  <span>Message</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className={`btn-primary ${styles.submitBtn}`}
              >
                {status.loading ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </SpotlightCard>

          {/* Sidebar Information Cards */}
          <div className={styles.sidebar}>
            <SpotlightCard spotlightColor="rgba(168, 200, 238, 0.2)" className={`${styles.infoCard} glass-panel`}>
              <div className={styles.infoIcon}>
                <Clock size={20} />
              </div>
              <h3 className={styles.infoTitle}>Fast Response Time</h3>
              <p className={styles.infoDesc}>
                We review every incoming message and typically respond within 24 to 48 business hours.
              </p>
            </SpotlightCard>

            <SpotlightCard spotlightColor="rgba(124, 106, 239, 0.2)" className={`${styles.infoCard} glass-panel`}>
              <div className={styles.infoIcon}>
                <ShieldCheck size={20} />
              </div>
              <h3 className={styles.infoTitle}>Privacy Assured</h3>
              <p className={styles.infoDesc}>
                Your email address and information will never be shared, sold, or used for spam.
              </p>
            </SpotlightCard>

            <SpotlightCard spotlightColor="rgba(168, 200, 238, 0.2)" className={`${styles.infoCard} glass-panel`}>
              <div className={styles.infoIcon}>
                <MessageSquare size={20} />
              </div>
              <h3 className={styles.infoTitle}>Spreadsheet Logging</h3>
              <p className={styles.infoDesc}>
                Submissions are logged directly to our support sheet for instant email notifications.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
