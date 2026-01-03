
export interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  date: string;
  excerpt: string;
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  logoUrl: string;
  seoDescription: string;
  socialLinks: {
    instagram: string;
    telegram: string;
    whatsapp: string;
  };
}

export enum AdminTab {
  POSTS = 'posts',
  SETTINGS = 'settings',
  SEO = 'seo'
}
