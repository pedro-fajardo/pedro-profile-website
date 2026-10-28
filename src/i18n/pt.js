// Português (pt-PT): textos da interface, metadados e tradução do conteúdo.
// O conteúdo em inglês está em src/data/profile.js; aqui só se traduz,
// por `id`, o que muda de língua (datas, links, stack e imagens são partilhados).

export default {
	lang: 'pt',
	htmlLang: 'pt-PT',
	ogLocale: 'pt_PT',
	path: '/pt/',
	dateLocale: 'pt-PT',

	meta: {
		title: 'Pedro Fajardo — Programador Frontend & GenAI em Portugal',
		description:
			'Programador frontend e GenAI em Portugal: aplicações em React e TypeScript e migração de OutSystems para React e .NET. Vê a minha experiência, projetos e certificações.',
		ogTitle: 'Pedro Fajardo — Programador Frontend & GenAI',
		ogDescription: 'Aplicações em React e TypeScript e migrações de OutSystems para React com GenAI. Experiência, projetos e contacto.',
		ogImage: '/images/og-image-pt.jpg',
		imageAlt: 'Pedro Fajardo — Programador Frontend & GenAI',
	},

	langSwitch: { label: 'English', short: 'EN' },

	menu: {
		skip: 'Saltar para o conteúdo',
		open: 'Abrir menu',
		close: 'Fechar menu',
		nav: 'Secções',
		heading: '~/pedro — ir para',
		items: {
			about: 'Introdução',
			experience: 'Experiência Profissional',
			skills: 'Competências',
			projects: 'Projetos',
			certifications: 'Certificações e Cursos',
			contact: 'Contacto',
		},
	},

	terminal: {
		years: 'anos',
		now: 'Desenvolvo interfaces em React e migro aplicações *OutSystems* para *React + .NET* com GenAI na itGlee.',
		placeholder: 'escreve help',
		inputLabel: 'Comando do terminal',
		try: 'experimenta:',
		suggestions: ['help', 'ls', 'cd projetos', 'sudo hire-pedro'],
		dirs: { about: 'sobre', experience: 'experiencia', skills: 'competencias', projects: 'projetos', certifications: 'certificacoes', contact: 'contacto' },
		help: [
			['ls', 'listar as secções'],
			['cd <secção>', 'ir para uma secção'],
			['whoami', 'quem é este'],
			['email', 'mostrar o meu email'],
			['github · linkedin', 'abrir os meus perfis'],
			['lang en', 'see it in English'],
			['sudo hire-pedro', 'sabes que queres'],
			['clear', 'limpar o ecrã'],
		],
		alreadyHome: 'já estás em casa.',
		noDir: 'cd: diretório inexistente:',
		opening: '→ a abrir',
		sudo: '[sudo] permissão concedida. A executar ./contact.sh …',
		notFound: 'comando não encontrado:',
		tryHelp: '— experimenta',
		niceTry: 'boa tentativa.',
		switching: '→ switching to English…',
		lisbon: 'Lisboa',
	},

	hero: { scrollDown: 'Ver mais' },

	about: {
		title: 'Olá, sou o Pedro Fajardo!',
		photoAlt: 'Retrato de Pedro Fajardo',
		paragraphs: [
			'Sou programador de software e foco-me em criar aplicações intuitivas e fáceis de usar. Trabalho com tecnologias web modernas como *React* e *TypeScript*, e com plataformas low-code como o *OutSystems*.',
			'Ultimamente trabalho onde estes dois mundos se encontram: transformar aplicações OutSystems em código React e .NET com GenAI. Gosto de resolver problemas complexos, criar experiências fluidas e fazer parte de uma equipa unida e bem-disposta.',
		],
		keys: (n) => `${n} chaves`,
		extraKeys: { email: 'email', years: 'anosEmSoftware' },
	},

	experience: {
		title: 'Experiência Profissional',
		intro: (n) => `${n} commits em 2 branches · clica num commit para ver o diff`,
		author: 'Autor',
		date: 'Data',
		branch: 'branch',
		initialCommit: 'Initial commit',
		education: 'Licenciatura em Engenharia Informática · Universidade de Aveiro',
	},

	skills: {
		title: 'Competências',
		audited: (n) => `${n} pacotes auditados · encontradas`,
		noVulns: '0 vulnerabilidades',
		percent: (p) => `${p} por cento`,
	},

	projects: {
		title: 'Alguns dos projetos que desenvolvi',
		privateNote: '= repositório privado',
		visit: 'Visitar',
		quote: 'Pedir orçamento',
		screenshotAlt: (name) => `Captura de ecrã de ${name}`,
	},

	certifications: { title: 'Certificações e Cursos' },

	contact: {
		title: 'Vamos falar!',
		intro: 'Contacta-me se quiseres algum dos meus serviços ou só para dizer olá :D',
		window: 'contact.sh — nova mensagem',
		firstName: 'Nome',
		lastName: 'Apelido',
		email: 'Email',
		phone: 'Telemóvel',
		message: 'A tua mensagem',
		optional: '(opcional)',
		phoneHint: 'Apenas dígitos, espaços e + ( ) -',
		send: 'Enviar mensagem ↵',
		sending: 'A enviar…',
		sent: (email) => `✔ Mensagem enviada. Vou responder para ${email}.`,
		error: '✖ A mensagem não foi enviada. Verifica a ligação e tenta outra vez, ou envia-me um email diretamente.',
		copy: 'Copiar',
		copied: 'Copiado',
	},

	footer: { rights: 'Todos os direitos reservados.' },

	dates: {
		present: 'Atual',
		months: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
	},

	// ---- content translations, keyed like src/data/profile.js ----
	content: {
		profile: {
			role: 'Programador Frontend & GenAI',
			summary:
				'Programador frontend e GenAI em Portugal: desenvolvo aplicações em React e TypeScript e migro aplicações OutSystems para React e .NET.',
		},
		facts: [
			{ key: 'nomeCompleto', value: 'Pedro Miguel Oliveira Fajardo' },
			{ key: 'nascimento', value: '27-08-1998, Figueira da Foz' },
			{ key: 'localizacao', value: 'Figueira da Foz, Portugal' },
			{ key: 'formacao', value: 'Licenciatura em Engenharia Informática, Universidade de Aveiro' },
			{ key: 'idiomas', value: ['Português (nativo)', 'Inglês (fluente)'] },
			{ key: 'preferenciaDeTrabalho', value: 'Remoto / Híbrido' },
			{ key: 'fusoHorario', value: 'GMT/UTC (Lisboa)' },
		],
		roles: {
			'itglee-genai': {
				title: 'Programador Frontend / GenAI',
				summary: 'Conversão de aplicações OutSystems para uma stack React e .NET com um asset de conversão baseado em GenAI.',
				highlights: [
					'Aprendi como a GenAI pode ser aplicada à conversão de projetos de grande dimensão.',
					'Analisei o código gerado pelo OutSystems e revi o código produzido pelo asset.',
					'Refinei à mão o código gerado onde o asset não chegava.',
					'Integrei Python com frameworks de IA como o LangChain.',
					'Configurei o Git no Azure DevOps e criei e corrigi pipelines de CI/CD.',
				],
			},
			'itglee-os-2025': {
				title: 'Programador OutSystems',
				summary:
					'PPL Next Gen: a nova plataforma eletrónica de negociação do mercado de seguros de Londres, reconstruída para um ambiente digital-first.',
				highlights: ['Análise e correção de defeitos.', 'Revisão, otimização, documentação e testes de código.'],
			},
			'itglee-genai-pilot': {
				title: 'Programador Frontend',
				summary: 'Piloto de conversão do código gerado pelo OutSystems para React e .NET com um asset baseado em GenAI.',
				highlights: ['Avaliei o código gerado pelo OutSystems e o resultado do asset.', 'Primeiros passos com .NET e ferramentas de IA em Python.'],
			},
			'itglee-web': {
				title: 'Programador Frontend',
				summary: 'Novos websites para a itGlee e a BelleEpoque, desenvolvidos com React e Tailwind CSS.',
				highlights: [
					'Sites acessíveis e responsivos, com trabalho de SEO para o posicionamento nos motores de pesquisa.',
					'Integrações com email e Google Drive.',
					'Publicação na AWS.',
				],
			},
			'itglee-os-2022': {
				title: 'Programador OutSystems',
				summary: 'PPL Next Gen, a plataforma de negociação do mercado de seguros de Londres, do levantamento de requisitos à entrega.',
				highlights: ['Análise de requisitos e desenho de soluções.', 'Mentoria de juniores, apoio ao tech lead e revisão de código.'],
			},
			'dellent-agora': {
				title: 'Programador Frontend',
				summary:
					'AGORA, uma aplicação de gestão de rede para configurar e controlar equipamentos de fibra, do centro de controlo até casa do cliente.',
				highlights: ['Desenvolvi novas ferramentas e funcionalidades numa base de código já existente.', 'Primeira equipa Agile, a trabalhar com Jira.'],
			},
		},
		projects: {
			crm: {
				name: 'Travel Partner CRM',
				description: 'CRM full-stack para consultores de viagens gerirem clientes, orçamentos, reservas e pagamentos.',
			},
			travel: {
				name: 'Website de consultora de viagens',
				description: 'Site para uma consultora de viagens apresentar os seus serviços e receber pedidos.',
			},
			weather: {
				name: 'App de meteorologia',
				description: 'Previsão a 5 dias, mapa de temperatura e gráfico da evolução da temperatura para qualquer cidade.',
			},
			repairs: {
				name: 'App de gestão de reparações',
				description: 'Acompanha os equipamentos que entram para reparação numa loja de eletrodomésticos, da receção à entrega.',
			},
			profile: {
				name: 'Este website',
				description: 'O meu portfólio: React pré-renderizado, sem bibliotecas de animação ou UI, cerca de 80 KB de JavaScript comprimido.',
			},
		},
	},
};
