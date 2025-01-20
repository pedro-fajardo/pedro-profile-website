import React, { useState } from 'react';
import emailjs from 'emailjs-com';

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.firstName) formErrors.firstName = "First name is required";
        if (!formData.lastName) formErrors.lastName = "Last name is required";
        if (!formData.email) formErrors.email = "Email is required";
        if (!formData.message) formErrors.message = "Message is required";
        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();

        const serviceId = 'service_6fffpwv';
        const templateId = 'template_3uxm2fd';
        const userId = '43gKPNAqBCiNmW4el';

        if (Object.keys(formErrors).length === 0) {
            setIsSubmitting(true);
            emailjs
                .send(serviceId, templateId, formData, userId)
                .then(
                    () => {
                        setSuccessMessage('Message sent successfully!');
                        setFormData({
                            firstName: '',
                            lastName: '',
                            email: '',
                            phone: '',
                            message: '',
                        });
                        setIsSubmitting(false);
                        setErrors({});
                    },
                    () => {
                        setErrors({ submission: 'Failed to send message. Please try again later.' });
                        setIsSubmitting(false);
                    }
                );
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="bg-gradient-to-b from-zinc-800 via-red-90 to-red-700 py-16 font-sourceCode">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-4 text-white">
                <h2 className="text-4xl font-bold text-center pb-3">Let's talk!</h2>
                <p className="text-center pb-4">
                    Contact me if you want one of my services or just want to say hi :D
                </p>

                {(successMessage || Object.keys(errors).length > 0) && (
                    <div
                        className={`p-4 mb-4 rounded-md text-center ${successMessage
                            ? 'bg-green-600 text-white'
                            : 'bg-red-600 text-white'
                            }`}
                    >
                        {successMessage && <p>{successMessage}</p>}
                        {Object.keys(errors).length > 0 && (
                            <ul>
                                {Object.values(errors).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold">First name *</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="border-2 rounded-md p-2 text-zinc-800"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold">Last name *</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="border-2 rounded-md p-2 text-zinc-800"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold">Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border-2 rounded-md p-2 text-zinc-800"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold">Phone number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border-2 rounded-md p-2 text-zinc-800"
                        />
                    </div>

                    <div className="col-span-1 sm:col-span-2 flex flex-col">
                        <label className="text-sm font-semibold">Your message *</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="border-2 rounded-md p-2 text-zinc-800"
                            rows="4"
                        />
                    </div>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-red-600 hover:bg-red-700 shadow-lg text-white text-lg font-semibold px-4 py-2 mt-4 rounded-md"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
}
