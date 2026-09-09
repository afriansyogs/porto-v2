import type { FaqItem } from '$lib/types';

export const faq = [
  {
    question: 'Who is Afriansyah Yogatama?',
    answer:
      'Afriansyah Yogatama (also known as Afrians Yoga or Ayt) is a software engineer based in Indonesia. He specializes in full-stack web platforms using SvelteKit, Next.js, and TypeScript, while actively building and researching AI/ML features such as RAG and LLM applications.'
  },
  {
    question: 'Are you available for new projects or full-time roles?',
    answer:
      'Yes. I am currently open to full-time software engineering roles and select freelance projects, especially work involving secure API platforms, IoT integrations, or modern JavaScript stacks. I can start within a reasonable notice period, and I am happy to discuss contract, hybrid, or fully remote arrangements.'
  },
  {
    question: 'Do you work remotely or on-site?',
    answer:
      'Both work for me. I have shipped products with fully distributed teams and through on-site collaboration. I adapt to what the project requires, keep overlap hours for syncs, and send concise async updates so progress remains visible across time zones.'
  },
  {
    question: 'What services do you provide?',
    answer:
      'I design and build secure web platforms from end to end. This includes database architecture, robust backend services, and interactive frontend applications using Svelte, React, or Next.js. I also handle complex IoT system integrations and containerized deployment workflows.'
  },
  {
    question: 'Which technologies do you prefer?',
    answer:
      'For new products, I prefer TypeScript with SvelteKit or Next.js on the frontend, supported by robust backend environments like Express.js or FastAPI, with PostgreSQL as the default database. Docker covers my environments. Ultimately, I pick tools based on the problem, security requirements, and team constraints.'
  },
  {
    question: 'How do you approach system security and reliability?',
    answer:
      'I treat security as a foundational layer, not an afterthought. Coming from an active background in ethical pentesting and vulnerability research, I stress-test architectures, implement strict access controls, and ensure systems are hardened before they ever reach production.'
  },
  {
    question: 'How fast do you respond to messages?',
    answer:
      'Usually within 24 hours on business days, often sooner. Send a message through the contact form on this page or reach me by email. If you are recruiting, please include the role, stack, and location or remote policy. A concrete brief always gets the fastest and most useful reply.'
  }
] as const satisfies readonly FaqItem[];
