// English UI strings and page metadata. Content (roles, projects…) lives in
// src/data/profile.js; `*word*` marks a highlighted word.

export default {
	lang: 'en',
	htmlLang: 'en',
	ogLocale: 'en_GB',
	path: '/',
	dateLocale: 'en-GB',

	meta: {
		title: 'Pedro Fajardo — Frontend & GenAI Developer in Portugal',
		description:
			'Frontend and GenAI developer in Portugal building React and TypeScript apps and migrating OutSystems to React and .NET. See my experience, projects and certifications.',
		ogTitle: 'Pedro Fajardo — Frontend & GenAI Developer',
		ogDescription: 'React and TypeScript apps, and OutSystems-to-React migrations with GenAI. Experience, projects and contact.',
		ogImage: '/images/og-image.jpg',
		imageAlt: 'Pedro Fajardo — Frontend & GenAI developer',
	},

	langSwitch: { label: 'Português', short: 'PT' },

	menu: {
		skip: 'Skip to content',
		open: 'Open menu',
		close: 'Close menu',
		nav: 'Sections',
		heading: '~/pedro — jump to',
		items: {
			about: 'Introduction',
			experience: 'Professional Experience',
			skills: 'Skills',
			projects: 'Projects',
			certifications: 'Certifications and Courses',
			contact: 'Contact',
		},
	},

	terminal: {
		years: 'years',
		now: 'Building React interfaces and moving *OutSystems* apps to *React + .NET* with GenAI at itGlee.',
		placeholder: 'type help',
		inputLabel: 'Terminal command',
		try: 'try:',
		suggestions: ['help', 'ls', 'cd projects', 'sudo hire-pedro'],
		// directory names shown by `ls`, mapped to section ids
		dirs: { about: 'about', experience: 'experience', skills: 'skills', projects: 'projects', certifications: 'certifications', contact: 'contact' },
		help: [
			['ls', 'list sections'],
			['cd <section>', 'jump to a section'],
			['whoami', 'who is this'],
			['email', 'show my email'],
			['github · linkedin', 'open my profiles'],
			['lang pt', 'ver em português'],
			['sudo hire-pedro', 'you know you want to'],
			['clear', 'clear the screen'],
		],
		alreadyHome: 'already home.',
		noDir: 'cd: no such directory:',
		opening: '→ opening',
		sudo: '[sudo] permission granted. Running ./contact.sh …',
		notFound: 'command not found:',
		tryHelp: '— try',
		niceTry: 'nice try.',
		switching: '→ a mudar para português…',
		lisbon: 'Lisbon',
	},

	hero: { scrollDown: 'Scroll Down' },

	about: {
		title: "Hi, I'm Pedro Fajardo!",
		photoAlt: 'Portrait of Pedro Fajardo',
		paragraphs: [
			"I'm a software developer focused on building intuitive, user-friendly applications. I work with modern web technologies like *React* and *TypeScript*, and low-code platforms like *OutSystems*.",
			'Lately I sit where the two meet: turning OutSystems applications into React and .NET code with GenAI. I enjoy solving complex problems, crafting seamless user experiences and being part of a friendly, happy team.',
		],
		keys: (n) => `${n} keys`,
		extraKeys: { email: 'email', years: 'yearsInSoftware' },
	},

	experience: {
		title: 'Professional Experience',
		intro: (n) => `${n} commits on 2 branches · click a commit to see the diff`,
		author: 'Author',
		date: 'Date',
		branch: 'branch',
		initialCommit: 'Initial commit',
		education: "Bachelor's in Computer Science · Universidade de Aveiro",
	},

	skills: {
		title: 'Skills',
		audited: (n) => `${n} packages audited · found`,
		noVulns: '0 vulnerabilities',
		percent: (p) => `${p} percent`,
	},

	projects: {
		title: "Some of the projects I've developed",
		privateNote: '= private repository',
		visit: 'Visit',
		quote: 'Get a quote',
		screenshotAlt: (name) => `Screenshot of ${name}`,
	},

	certifications: { title: 'Certifications & Courses' },

	contact: {
		title: "Let's talk!",
		intro: 'Contact me if you want one of my services or just want to say hi :D',
		window: 'contact.sh — new message',
		firstName: 'First name',
		lastName: 'Last name',
		email: 'Email',
		phone: 'Phone number',
		message: 'Your message',
		optional: '(optional)',
		phoneHint: 'Digits, spaces and + ( ) - only',
		send: 'Send message ↵',
		sending: 'Sending…',
		sent: (email) => `✔ Message sent. I'll reply to ${email}.`,
		error: '✖ Message not sent. Check your connection and try again, or email me directly.',
		copy: 'Copy',
		copied: 'Copied',
	},

	footer: { rights: 'All rights reserved.' },

	dates: {
		present: 'Present',
		months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	},
};
