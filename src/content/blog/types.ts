export interface BlogPostSection {
  heading: string;
  body: string[];
  links?: Array<{
    label: string;
    href: string;
  }>;
  bullets?: string[];
  table?: {
    columns: string[];
    rows: string[][];
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readTime: string;
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  keywords: string[];
  summary: string;
  sections: BlogPostSection[];
}

