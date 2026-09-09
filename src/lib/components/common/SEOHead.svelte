<script lang="ts">
  import interWoff2 from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2';
  import spaceGroteskWoff2 from '@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2';
  import jetbrainsMonoWoff2 from '@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2';
  import { profile } from '$lib/data/profile';
  import { skills, aiMlFocus } from '$lib/data/skills';
  import { projects } from '$lib/data/projects';
  import { faq } from '$lib/data/faq';
  import { SITE_URL } from '$lib/utils/site';

  const title = `${profile.fullName} (${profile.name}) | ${profile.role} & ${profile.focus}`;
  const description = `${profile.fullName} (${profile.name}) is a Software Engineer from Indonesia building fast, reliable web platforms and AI/ML applications (RAG, LLM). Explore portfolio, experience, and contact info.`;
  const ogImage = `${SITE_URL}/img/og-image.png`;
  const imageAlt = `${profile.fullName} (${profile.name}) — ${profile.role} and ${profile.focus}`;
  const keywords = [
    profile.fullName,
    profile.name,
    ...profile.alternateNames,
    profile.role,
    profile.focus,
    'Software Engineer Indonesia',
    'Full Stack Developer',
    'AI ML Engineer',
    'SvelteKit Developer',
    'TypeScript',
    'Web Development',
    'Portfolio'
  ].join(', ');

  const sameAs = profile.socials
    .map((social) => social.href)
    .filter((href) => href.startsWith('http'));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${profile.fullName}`,
        alternateName: [...profile.alternateNames],
        inLanguage: 'en-US'
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profile`,
        url: SITE_URL,
        mainEntity: { '@id': `${SITE_URL}/#person` }
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: profile.fullName,
        givenName: 'Afriansyah',
        familyName: 'Yogatama',
        additionalName: profile.name,
        alternateName: [...profile.alternateNames],
        jobTitle: profile.role,
        description: `${profile.fullName} (also known as ${profile.name}) is a Software Engineer based in Indonesia specializing in full-stack web platforms and AI/ML integrations.`,
        url: SITE_URL,
        email: `mailto:${profile.email}`,
        image: ogImage,
        address: { '@type': 'PostalAddress', addressCountry: 'Indonesia' },
        alumniOf: [
          {
            '@type': 'EducationalOrganization',
            name: 'Dian Nuswantoro University',
            url: 'https://dinus.ac.id'
          },
          {
            '@type': 'EducationalOrganization',
            name: 'SMKN 8 Semarang'
          }
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'PT INOVASI SOLUSI DIGITAL'
        },
        sameAs,
        knowsAbout: [
          ...skills.map((skill) => skill.name),
          ...aiMlFocus,
          'Full-Stack Development',
          'Software Engineering',
          'Artificial Intelligence',
          'Machine Learning'
        ]
      },
      ...projects.map((project) => ({
        '@type': 'SoftwareSourceCode',
        '@id': `${SITE_URL}/#project-${project.slug}`,
        name: project.title,
        description: project.description,
        datePublished: String(project.year),
        keywords: project.tags.join(', '),
        codeRepository: project.links.find((link) => link.kind === 'repo')?.href,
        url: project.links.find((link) => link.kind === 'demo')?.href,
        author: { '@id': `${SITE_URL}/#person` }
      })),
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer }
        }))
      }
    ]
  };

  const jsonLdText = JSON.stringify(jsonLd).replace(/</g, '\\u003c');

  const jsonLdScript = `<script type="application/ld+json">${jsonLdText}</scr` + 'ipt>';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={profile.fullName} />
  <link rel="canonical" href={SITE_URL} />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={`${profile.fullName} (${profile.name})`} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={SITE_URL} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={imageAlt} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  <meta name="twitter:image:alt" content={imageAlt} />

  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html jsonLdScript}

  <link
    rel="preload"
    as="font"
    type="font/woff2"
    href={spaceGroteskWoff2}
    crossorigin="anonymous"
  />
  <link rel="preload" as="font" type="font/woff2" href={interWoff2} crossorigin="anonymous" />
  <link
    rel="preload"
    as="font"
    type="font/woff2"
    href={jetbrainsMonoWoff2}
    crossorigin="anonymous"
  />
</svelte:head>
