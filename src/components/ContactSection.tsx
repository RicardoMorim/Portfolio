'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Contact } from "@/language/config"

export default function ContactSection(contact: Contact) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (res.ok) {
				setSubmitted(true);
				setFormData({ name: '', email: '', subject: '', message: '' });
			}
		} catch (err) {
			console.error('Error:', err);
		}

		setLoading(false);
	};

	return (
		<section className="contact-section" id="contact">
			<div className="contact-container">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					className="contact-title"
				>
					{contact.subtitle}
				</motion.h2>

				<div className="contact-content">
					<motion.div
						className="contact-info"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
					>
						<p>{contact.description}</p>
						<div className="contact-details">
							<div className="contact-item">
								<span>{contact.email}:</span>
								<a href="mailto:ricardomorim05@gmail.com">ricardomorim05@gmail.com</a>
							</div>
							<div className="contact-item">
								<span>{contact.location}:</span>
								<p>Porto, Portugal</p>
							</div>
						</div>
					</motion.div>

					<motion.form
						className="contact-form"
						onSubmit={handleSubmit}
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
					>
						<div className="form-group">
							<input
								type="text"
								placeholder={contact.form.name}
								required
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							/>
						</div>
						<div className="form-group">
							<input
								type="email"
								placeholder={contact.form.email}
								required
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							/>
						</div>
						<div className="form-group">
							<input
								type="text"
								placeholder={contact.form.subject}
								required
								value={formData.subject}
								onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
							/>
						</div>
						<div className="form-group">
							<textarea
								placeholder={contact.form.message}
								required
								value={formData.message}
								onChange={(e) => setFormData({ ...formData, message: e.target.value })}
							/>
						</div>
						<button
							type="submit"
							className="submit-btn"
							disabled={loading}
						>
							{loading ? contact.form.sending : contact.form.send}
						</button>
						{submitted && (
							<p className="success-message">{contact.form.success}</p>
						)}
					</motion.form>
				</div>
			</div>
		</section>
	);
}