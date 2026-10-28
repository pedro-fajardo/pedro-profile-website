// All site content lives here, so updating the CV never means touching layout code.

export const PROFILE = {
	// canonical origin: production serves www (the apex redirects to it)
	url: 'https://www.pedrofajardodev.com/',
	name: 'Pedro Fajardo',
	fullName: 'Pedro Miguel Oliveira Fajardo',
	role: 'Frontend & GenAI developer',
	summary:
		'Frontend and GenAI developer in Portugal building React and TypeScript applications and migrating OutSystems apps to React and .NET.',
	email: 'pedro.fajardo.dev@gmail.com',
	location: 'Figueira da Foz, Portugal',
	timeZone: 'Europe/Lisbon',
	careerStart: 2020,
	photo: '/images/PedroFajardo-480.webp',
	links: {
		github: 'https://github.com/pedro-fajardo',
		linkedin: 'https://www.linkedin.com/in/pedro-fajardo-a54767161/',
	},
};

// Rendered as profile.json in the About section (the v1 info cards).
export const FACTS = [
	{ key: 'fullName', value: 'Pedro Miguel Oliveira Fajardo' },
	{ key: 'born', value: '1998-08-27, Figueira da Foz' },
	{ key: 'location', value: 'Figueira da Foz, Portugal' },
	{ key: 'education', value: "Bachelor's in Computer Science, Universidade de Aveiro" },
	{ key: 'languages', value: ['Portuguese (native)', 'English (fluent)'] },
	{ key: 'workPreference', value: 'Remote / Hybrid' },
	{ key: 'timezone', value: 'GMT/UTC (Lisbon)' },
];

// Newest first. `end: null` means current role.
export const EXPERIENCE = [
	{
		id: 'itglee',
		company: 'itGlee',
		logo: '/images/company/itGlee-128.webp',
		roles: [
			{
				id: 'itglee-genai',
				title: 'Frontend / GenAI Developer',
				start: '2025-10',
				end: null,
				client: 'Deloitte',
				summary:
					'Converting OutSystems applications to a React and .NET stack with a GenAI-based conversion asset.',
				highlights: [
					'Learned how GenAI can be applied to converting large projects.',
					'Analysed OutSystems-generated code and reviewed the code produced by the asset.',
					'Refined the generated code by hand where the asset fell short.',
					'Integrated Python with AI frameworks such as LangChain.',
					'Set up Git on Azure DevOps and built and fixed CI/CD pipelines.',
				],
				stack: ['React', 'JavaScript', '.NET', 'Python', 'LangChain', 'Azure DevOps', 'CI/CD'],
			},
			{
				id: 'itglee-os-2025',
				title: 'OutSystems Developer',
				start: '2025-05',
				end: '2025-09',
				client: 'Deloitte',
				summary:
					'PPL Next Gen: the new electronic trading platform for the London insurance market, rebuilt for a digital-first environment.',
				highlights: [
					'Defect analysis and fixing.',
					'Code review, optimisation, documentation and testing.',
				],
				stack: ['OutSystems', 'JavaScript', 'SQL', 'MongoDB', 'REST', 'Jira'],
			},
			{
				id: 'itglee-genai-pilot',
				title: 'Frontend Developer',
				start: '2025-03',
				end: '2025-05',
				client: 'Deloitte',
				summary:
					'Pilot for converting OutSystems-generated code into React and .NET with a GenAI-based asset.',
				highlights: [
					'Evaluated the OutSystems-generated code and the asset output.',
					'First steps with .NET and Python AI tooling.',
				],
				stack: ['React', '.NET', 'Python', 'GenAI', 'Azure DevOps'],
			},
			{
				id: 'itglee-web',
				title: 'Frontend Developer',
				start: '2024-09',
				end: '2025-03',
				client: null,
				summary: 'New websites for itGlee and BelleEpoque built with React and Tailwind CSS.',
				highlights: [
					'Accessible, responsive sites with SEO work for search rankings.',
					'Email and Google Drive integrations.',
					'Deployed on AWS.',
				],
				stack: ['React', 'Tailwind CSS', 'AWS', 'SEO'],
			},
			{
				id: 'itglee-os-2022',
				title: 'OutSystems Developer',
				start: '2022-01',
				end: '2024-09',
				client: 'Deloitte',
				summary:
					'PPL Next Gen, the London insurance market trading platform, from requirements through delivery.',
				highlights: [
					'Requirement analysis and solution design.',
					'Mentored juniors, supported the tech lead and reviewed code.',
				],
				stack: ['OutSystems', 'JavaScript', 'SQL', 'MongoDB', 'REST', 'Agile'],
			},
		],
	},
	{
		id: 'dellent',
		company: 'Dellent Consulting',
		logo: '/images/company/dellentConsulting-128.webp',
		roles: [
			{
				id: 'dellent-agora',
				title: 'Frontend Developer',
				start: '2020-01',
				end: '2021-12',
				client: 'Altice Labs',
				summary:
					'AGORA, a network management app for configuring and controlling fibre equipment from the control centre to the customer’s home.',
				highlights: [
					'Built new tools and features in an established codebase.',
					'First Agile team, working with Jira.',
				],
				stack: ['AngularJS', 'JavaScript', 'REST', 'XML'],
			},
		],
	},
];

export const SKILLS = [
	{ name: 'JavaScript', pct: 90 },
	{ name: 'HTML & CSS', pct: 90 },
	{ name: 'TypeScript', pct: 85 },
	{ name: 'React', pct: 85 },
	{ name: 'OutSystems', pct: 85 },
	{ name: 'GenAI', pct: 80 },
	{ name: 'Python', pct: 80 },
	{ name: 'Java', pct: 75 },
	{ name: 'SQL', pct: 75 },
	{ name: 'MongoDB', pct: 70 },
];

export const PROJECTS = [
	{
		id: 'crm',
		dir: 'travel-partner-crm',
		name: 'Travel Partner CRM',
		description: 'Full-stack CRM for travel consultants to manage clients, quotes, bookings and payments.',
		image: '/images/projects/travel-partner-crm',
		stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'TanStack Query', 'Playwright', 'Fly.io'],
		link: null,
		github: null,
	},
	{
		id: 'travel',
		dir: 'travel-consultant',
		name: 'Travel consultant website',
		description: 'Site for a travel consultant to present their services and take enquiries.',
		image: '/images/projects/travelconsultant',
		stack: ['React', 'Tailwind CSS', 'EmailJS', 'Firebase'],
		link: 'https://silvanagarcia.pt',
		github: null,
	},
	{
		id: 'weather',
		dir: 'weather-app',
		name: 'Weather app',
		description: '5-day forecast, temperature map and temperature trend chart for any city.',
		image: '/images/projects/weather-app',
		stack: ['React', 'TypeScript'],
		link: 'https://pedro-fajardo.github.io/weather-app/',
		github: 'https://github.com/pedro-fajardo/weather-app',
	},
	{
		id: 'repairs',
		dir: 'repair-manager',
		name: 'Repair management app',
		description: 'Tracks equipment brought in for repair at an appliance store, from intake to pickup.',
		image: '/images/projects/jomafal-app',
		stack: ['React', 'Tailwind CSS', 'Django REST'],
		link: null,
		github: null,
	},
	{
		id: 'profile',
		dir: 'pedro-profile',
		name: 'This website',
		description: 'My portfolio: prerendered React with no animation or UI libraries, about 80 KB of compressed JavaScript.',
		image: '/images/projects/pedro-profile',
		stack: ['React', 'Vite', 'Tailwind CSS'],
		link: null,
		github: 'https://github.com/pedro-fajardo/pedro-profile-website',
	},
];

export const CERTIFICATIONS = [
	{ id: 'os-agentic-ai', title: 'Agentic AI Specialist', provider: 'OutSystems', year: 2026 },
	{ id: 'udemy-react', title: 'Modern React with Redux', provider: 'Udemy', year: 2025 },
	{ id: 'os-odc', title: 'Associate Developer (ODC)', provider: 'OutSystems', year: 2023 },
	{ id: 'os-mobile', title: 'Mobile Developer Specialist', provider: 'OutSystems', year: 2022 },
	{ id: 'os-reactive', title: 'Associate Reactive Developer', provider: 'OutSystems', year: 2021 },
];
