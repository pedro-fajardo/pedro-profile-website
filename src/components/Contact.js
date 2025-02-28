import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const schema = yup.object().shape({
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	phone: yup.string().test('is-valid-phone', 'Phone number is not valid', (value) => {
		if (!value) return true;
		const defaultCountry = 'PT';
		try {
			const phoneNumber = parsePhoneNumberFromString(value, defaultCountry);
			return phoneNumber ? phoneNumber.isValid() : false;
		} catch (error) {
			return false;
		}
	}),
	message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters')
});

export default function Contact() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		setError
	} = useForm({
		resolver: yupResolver(schema)
	});

	const [successMessage, setSuccessMessage] = useState('');

	const onSubmit = async (formData) => {
		try {
			const serviceId = 'service_6fffpwv';
			const templateId = 'template_3uxm2fd';
			const userId = '43gKPNAqBCiNmW4el';

			await emailjs.send(serviceId, templateId, formData, userId);
			setSuccessMessage('Message sent successfully!');
			reset();
		} catch (error) {
			setError('submission', {
				type: 'manual',
				message: 'Failed to send message. Please try again later.'
			});
		}
	};

	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			setSuccessMessage('');
		}
	}, [errors]);

	return (
		<div className="bg-gradient-to-b from-zinc-800 via-red-90 to-red-700 pt-16 pb-4 font-sourceCode">
			<form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 space-y-4 text-white">
				<h2 className="text-4xl font-bold text-center pb-3">Let's talk!</h2>
				<p className="text-center pb-4">
					Contact me if you want one of my services or just want to say hi :D
				</p>

				{(successMessage || Object.keys(errors).length > 0) && (
					<div
						className={`p-4 mb-4 rounded-md text-center ${successMessage ? 'bg-green-600' : 'bg-red-600'
							}`}
					>
						{successMessage && <p>{successMessage}</p>}
						{Object.keys(errors).length > 0 && (
							<ul>
								{Object.values(errors).map((error, index) => (
									<li key={index}>{error.message}</li>
								))}
							</ul>
						)}
					</div>
				)}

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="flex flex-col">
						<label className="text-sm font-semibold">First name *</label>
						<input
							{...register('firstName')}
							className="border-2 rounded-md p-2 text-zinc-800"
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-semibold">Last name *</label>
						<input
							{...register('lastName')}
							className="border-2 rounded-md p-2 text-zinc-800"
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-semibold">Email *</label>
						<input
							{...register('email')}
							className="border-2 rounded-md p-2 text-zinc-800"
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm font-semibold">Phone number</label>
						<input
							{...register('phone')}
							className="border-2 rounded-md p-2 text-zinc-800"
						/>
					</div>

					<div className="col-span-1 sm:col-span-2 flex flex-col">
						<label className="text-sm font-semibold">Your message *</label>
						<textarea
							{...register('message')}
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
			<div className='w-full text-center pt-4 space-x-4'>
				<a href={"https://github.com/pedro-fajardo"} target="_blank" rel="noopener noreferrer">
					<FontAwesomeIcon icon={faGithub} className='text-zinc-200 text-4xl'></FontAwesomeIcon>
				</a>
				<a href={"https://www.linkedin.com/in/pedro-fajardo-a54767161/"} target="_blank" rel="noopener noreferrer">
					<FontAwesomeIcon icon={faLinkedin} className='text-zinc-200 text-4xl'></FontAwesomeIcon>
				</a>
			</div>
		</div >
	);
}
