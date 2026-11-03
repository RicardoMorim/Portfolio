'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Contact } from "@/language/config"
import { useTranslation } from '@/context/LanguageContext';
import { burst } from './story/stage/store';

type Status = 'idle' | 'sending' | 'sent' | 'failed';
type Field = 'name' | 'email' | 'subject' | 'message';

const EMPTY_FORM: Record<Field, string> = { name: '', email: '', subject: '', message: '' };
const EMAIL = 'ricardomorim05@gmail.com';

export default function ContactSection(contact: Contact) {
	const { getStory } = useTranslation();
	const [formData, setFormData] = useState(EMPTY_FORM);
	const [status, setStatus] = useState<Status>('idle');

	const update = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
		setFormData((prev) => ({ ...prev, [field]: e.target.value }));

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus('sending');
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});
			if (!res.ok) throw new Error(`Contact request failed with ${res.status}`);
			setStatus('sent');
			burst();
			setFormData(EMPTY_FORM);
		} catch (err) {
			console.error('Contact form error:', err);
			setStatus('failed');
		}
	};

	const fields: { id: Field; label: string; type: string }[] = [
		{ id: 'name', label: contact.form.name, type: 'text' },
		{ id: 'email', label: contact.form.email, type: 'email' },
		{ id: 'subject', label: contact.form.subject, type: 'text' },
	];

	return (
		<section className="section contact" id="contact" data-scene="9" aria-labelledby="contact-title">
			<div className="shell contact-grid">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<p className="kicker"><span className="kicker-dot" /> {getStory().contactKicker}</p>
					<h2 id="contact-title" className="contact-title">{contact.subtitle}</h2>
					<p className="section-lead">{contact.description}</p>
					<dl className="contact-details">
						<div>
							<dt>{contact.email}</dt>
							<dd><a href={`mailto:${EMAIL}`} className="contact-email">{EMAIL}</a></dd>
						</div>
						<div>
							<dt>{contact.location}</dt>
							<dd>Porto, Portugal</dd>
						</div>
					</dl>
				</motion.div>

				<form className="contact-form" onSubmit={handleSubmit}>
					{fields.map((field) => (
						<label key={field.id} className="field">
							<span>{field.label}</span>
							<input
								type={field.type}
								name={field.id}
								autoComplete={field.id === 'subject' ? 'off' : field.id}
								required
								value={formData[field.id]}
								onChange={update(field.id)}
							/>
						</label>
					))}
					<label className="field">
						<span>{contact.form.message}</span>
						<textarea name="message" rows={5} required value={formData.message} onChange={update('message')} />
					</label>
					<button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
						{status === 'sending' ? contact.form.sending : contact.form.send} <span aria-hidden="true">→</span>
					</button>
					<p className="form-status" role="status" aria-live="polite">
						{status === 'sent' && <span className="is-ok">{contact.form.success}</span>}
						{status === 'failed' && <span className="is-error">{contact.form.error}</span>}
					</p>
				</form>
			</div>
		</section>
	);
}
