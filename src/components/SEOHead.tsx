import { useEffect } from 'react';
import { type BlogPost } from '../data/blogStore';
import { profile } from '../data/portfolio';

export default function SEOHead({
  title,
  description,
  keywords = [],
  image = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
  url = 'https://khiw.dev',
  type = 'website',
  blogPost,
}: {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  blogPost?: BlogPost;
}) {
  useEffect(() => {
    // Set Page Title
    document.title = title ? `${title} | Khiw Nitithadachot` : 'Khiw Nitithadachot — Forward Deployed AI Engineer';

    // Helper to update or create meta tags
    const setMeta = (nameOrProperty: string, val: string, isProperty = false) => {
      if (!val) return;
      let el = document.querySelector(`meta[${isProperty ? 'property' : 'name'}="${nameOrProperty}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(isProperty ? 'property' : 'name', nameOrProperty);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    setMeta('description', description || profile.tagline);
    if (keywords && keywords.length > 0) {
      setMeta('keywords', keywords.join(', '));
    }
    setMeta('author', profile.name);
    setMeta('robots', 'index, follow');

    // OpenGraph
    setMeta('og:title', title, true);
    setMeta('og:description', description || profile.tagline, true);
    setMeta('og:image', image, true);
    setMeta('og:url', url, true);
    setMeta('og:type', type, true);
    setMeta('og:site_name', 'Khiw Nitithadachot — Forward Deployed AI Engineer', true);

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description || profile.tagline);
    setMeta('twitter:image', image);

    // Inject JSON-LD Schema Structured Data
    const schemaId = 'fde_structured_jsonld_schema';
    let scriptEl = document.getElementById(schemaId);
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = schemaId;
      scriptEl.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptEl);
    }

    const basePersonSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      alternateName: profile.nameTh,
      jobTitle: profile.role,
      description: profile.tagline,
      email: profile.email,
      telephone: profile.phone,
      url: 'https://khiw.dev',
      sameAs: profile.socials.map((s) => s.href),
      knowsAbout: [
        'AI Engineering',
        'Forward Deployed AI Engineer',
        'LangGraph',
        'Model Context Protocol',
        'Autonomous Multi-Agent Systems',
        'Edge MLOps',
        'Three.js WebGL',
        '3D Spatial Digital Twins',
        'Predictive Maintenance LSTM',
      ],
    };

    if (blogPost) {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blogPost.title,
        alternativeHeadline: blogPost.titleTh,
        image: [blogPost.coverImage],
        datePublished: blogPost.date,
        dateModified: blogPost.date,
        author: {
          '@type': 'Person',
          name: blogPost.author,
          jobTitle: blogPost.authorRole,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Khiw Nitithadachot FDE Intelligence',
          logo: {
            '@type': 'ImageObject',
            url: 'https://khiw.dev/logo.png',
          },
        },
        description: blogPost.metaDescription || blogPost.excerpt,
        keywords: blogPost.keywords.join(', '),
        articleBody: blogPost.content,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://khiw.dev/blog/${blogPost.slug}`,
        },
      };

      scriptEl.textContent = JSON.stringify([basePersonSchema, articleSchema]);
    } else {
      scriptEl.textContent = JSON.stringify(basePersonSchema);
    }
  }, [title, description, keywords, image, url, type, blogPost]);

  return null;
}
