import React, { useState } from 'react';
import { api } from '../../lib/api';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export const ContactSection = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await api.post('/contact', form);
      setForm(initialForm);
      setStatus({
        type: 'success',
        message: response.data?.message || 'Message sent successfully.',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error?.response?.data?.message ||
          'Unable to send your message right now. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="contact-big reveal">
        Let&apos;s
        <br />
        <span>Build</span>
        <br />
        <span className="outline">Together</span>
      </div>
      <p className="contact-sub reveal">
        Open to freelance projects, full-time roles, and interesting collaborations.
        Send a message and I&apos;ll get back to you.
      </p>
      <div className="contact-links reveal">
        <a href="mailto:you@email.com" className="contact-link">
          <span>Email</span> you@email.com
        </a>
        <a href="#" className="contact-link">
          <span>in</span> LinkedIn
        </a>
        <a href="#" className="contact-link">
          <span>gh</span> GitHub
        </a>
        <a href="#" className="contact-link">
          <span>x</span> Twitter
        </a>
      </div>

      <form
        onSubmit={handleSubmit}
        className="reveal"
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          textAlign: 'left',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          padding: '32px',
        }}
      >
        <div className="form-grid" style={{ marginBottom: '20px' }}>
          <div className="field">
            <label className="field-label">Name</label>
            <input
              className="field-input"
              value={form.name}
              onChange={updateField('name')}
              placeholder="Your name"
              required
            />
          </div>
          <div className="field">
            <label className="field-label">Email</label>
            <input
              className="field-input"
              type="email"
              value={form.email}
              onChange={updateField('email')}
              placeholder="you@example.com"
              required
            />
          </div>
        </div>
        <div className="form-grid full" style={{ marginBottom: '20px' }}>
          <div className="field">
            <label className="field-label">Subject</label>
            <input
              className="field-input"
              value={form.subject}
              onChange={updateField('subject')}
              placeholder="What would you like to discuss?"
              required
            />
          </div>
        </div>
        <div className="form-grid full" style={{ marginBottom: '20px' }}>
          <div className="field">
            <label className="field-label">Message</label>
            <textarea
              className="field-input field-textarea"
              value={form.message}
              onChange={updateField('message')}
              placeholder="Tell me about your project, role, or idea..."
              required
            />
          </div>
        </div>
        {status.message ? (
          <div
            style={{
              marginBottom: '16px',
              color: status.type === 'error' ? '#ff6b6b' : 'var(--accent)',
              fontSize: '13px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {status.message}
          </div>
        ) : null}
        <button
          type="submit"
          className="btn-primary"
          style={{ fontSize: '14px', padding: '16px 48px' }}
          disabled={submitting}
        >
          {submitting ? 'Sending...' : 'Send Message ->'}
        </button>
      </form>
    </>
  );
};

export default ContactSection;
