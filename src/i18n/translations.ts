export const translations = {
  en: {
    myComputer: 'My Computer',
    settings: 'Settings',
    github: 'GitHub',
    recycleBin: 'Recycle bin',
    game: 'game.exe',
    cv: 'CV',
    oldPortfolio: 'old portfolio',

    settingsTitle: 'Settings',
    language: 'Language',
    theme: 'Theme',
    lightTheme: 'Light',
    darkTheme: 'Dark',
    resetSettings: 'Reset to Default',
    settingsDescription: 'Customize your experience',

    name: 'Bohdan Sychov',
    title: 'Software Engineer',
    location: 'Location',
    locationValue: 'Georgia, Tbilisi',
    contacts: 'Contacts',
    phone: 'Phone',
    stack: 'Tech Stack',
    about: 'About',

    aboutText1:
      'Software Engineer with 6+ years of commercial experience. Worked across frontend, backend, and cloud-based systems in production environments. Currently focusing on Cloud and Data Engineering, with an interest in scalable and data-driven architectures.',
    aboutText2:
      'Strong experience with AWS cloud infrastructure, backend development with Node.js, Python, Ruby, building and maintaining data-intensive systems, API design and data modeling, performance optimization and system reliability. Experience in mentoring, code reviews, and technical guidance.',

    experience: 'Experience',
    currentPosition: 'Software Engineer at Lineate',
    currentPeriod: 'June 2024 - Present',
    currentDescription:
      'Lineate is a US-based international software development company with over two decades of experience. From Intelligent Document Processing (IDP) and Agentic RAG systems to scalable cloud architectures, we turn complex ideas into real, measurable results. We deliver AI-driven custom solutions for FinTech, HealthTech, AdTech, and beyond.',

    freshAutoPosition: 'Senior Frontend Engineer at Fresh Auto',
    freshAutoPeriod: 'May 2022 - June 2024',
    freshAutoDescription:
      'Elevating E-Commerce Platforms with Advanced Features, Optimizing SEO and Performance, and Streamlining Key Business Processes. Contributed to the development of new website sections and enhanced marketplace features using Ruby on Rails and Vue.js.',

    briolinkPosition: 'Senior Frontend Engineer at Briolink',
    briolinkPeriod: 'May 2023 - January 2024',
    briolinkDescription:
      'Driving Innovation in AI-Enhanced Web Development: Spearheaded Key Functionalities and Strategic Enhancements in Startup Market Platform. Developed major parts of the core functionality, including AI-powered pitch deck creation tools.',

    webantPosition: 'Frontend Engineer at Webant',
    webantPeriod: 'September 2020 - May 2022',
    webantDescription:
      'Developed and maintained multiple web applications including sports tournament services, student verification systems, and online education platforms. Trained company interns, provided mentoring, and conducted code reviews.',

    preferredCommunication: 'The preferred method of communication is',
    viewResume: 'You can view your resume in more detail at',

    shutdown: 'Shut Down',
    turnOff: 'Turn Off Computer',
  },
  ru: {
    myComputer: 'Мой компьютер',
    settings: 'Настройки',
    github: 'GitHub',
    recycleBin: 'Корзина',
    game: 'игра.exe',
    cv: 'Резюме',
    oldPortfolio: 'старое портфолио',

    settingsTitle: 'Настройки',
    language: 'Язык',
    theme: 'Тема',
    lightTheme: 'Светлая',
    darkTheme: 'Тёмная',
    resetSettings: 'Сбросить настройки',
    settingsDescription: 'Настройте ваш интерфейс',

    name: 'Богдан Сычов',
    title: 'Инженер-программист',
    location: 'Местоположение',
    locationValue: 'Грузия, Тбилиси',
    contacts: 'Контакты',
    phone: 'Телефон',
    stack: 'Технологии',
    about: 'О себе',

    aboutText1:
      'Инженер-программист с коммерческим опытом более 6 лет. Работал с frontend, backend и облачными системами в продакшн-окружении. В настоящее время сосредоточен на облачных технологиях и Data Engineering, с интересом к масштабируемым и data-driven архитектурам.',
    aboutText2:
      'Сильный опыт работы с облачной инфраструктурой AWS, backend-разработка на Node.js, Python, Ruby, построение и поддержка data-intensive систем, проектирование API и моделирование данных, оптимизация производительности и надежность систем. Опыт наставничества, code review и технического руководства.',

    experience: 'Опыт работы',
    currentPosition: 'Инженер-программист в Lineate',
    currentPeriod: 'Июнь 2024 - настоящее время',
    currentDescription:
      'Lineate - это международная компания по разработке программного обеспечения со штаб-квартирой в США и более чем двадцатилетним опытом. От систем интеллектуальной обработки документов (IDP) и Agentic RAG систем до масштабируемых облачных архитектур, мы превращаем сложные идеи в реальные, измеримые результаты. Мы предоставляем AI-решения для FinTech, HealthTech, AdTech и других отраслей.',

    freshAutoPosition: 'Senior Frontend-разработчик в Fresh Auto',
    freshAutoPeriod: 'Май 2022 - Июнь 2024',
    freshAutoDescription:
      'Развитие E-Commerce платформ с продвинутым функционалом, оптимизация SEO и производительности, оптимизация ключевых бизнес-процессов. Участвовал в разработке новых разделов сайта и расширенных функций маркетплейса с использованием Ruby on Rails и Vue.js.',

    briolinkPosition: 'Senior Frontend-разработчик в Briolink',
    briolinkPeriod: 'Май 2023 - Январь 2024',
    briolinkDescription:
      'Внедрение инноваций в AI-усиленной веб-разработке: возглавлял ключевые функциональности и стратегические улучшения стартап-платформы. Разработал основные части функционала, включая инструменты создания презентаций с использованием AI.',

    webantPosition: 'Frontend-разработчик в Webant',
    webantPeriod: 'Сентябрь 2020 - Май 2022',
    webantDescription:
      'Разрабатывал и поддерживал множество веб-приложений, включая сервисы спортивных турниров, системы верификации студентов и платформы онлайн-обучения. Обучал стажеров компании, проводил наставничество и code review.',

    preferredCommunication: 'Предпочтительный способ связи -',
    viewResume: 'Более подробно с резюме можно ознакомиться в',

    shutdown: 'Завершить работу',
    turnOff: 'Выключить компьютер',
  },
}

export type Language = 'en' | 'ru'

export const t = (key: string, lang: Language): string => {
  const keys = key.split('.')
  let value: any = translations[lang]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}
