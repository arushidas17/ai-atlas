// database/seed.js
// Populates: users, companies, categories, tags, tools, tool_categories,
// tool_tags, tool_images, pricing_plans, reviews, bookmarks, tool_alternatives
//
// Run with: node database/seed.js
// (assumes backend/db.js exports a pg Pool, and backend/.env has DATABASE_URL)

const pool = require('../backend/db');

// ------------------------------------------------------------
// 1. USERS
// ------------------------------------------------------------
const users = [
  { name: 'Arushi Das', email: 'arushi@example.com', avatar_url: null },
  { name: 'Sam Patel', email: 'sam@example.com', avatar_url: null },
  { name: 'Jordan Lee', email: 'jordan@example.com', avatar_url: null },
];

// ------------------------------------------------------------
// 2. COMPANIES
// ------------------------------------------------------------
const companies = [
  { name: 'OpenAI', slug: 'openai', website_url: 'https://openai.com', description: 'AI research and deployment company.', founded_year: 2015 },
  { name: 'Anthropic', slug: 'anthropic', website_url: 'https://anthropic.com', description: 'AI safety company building Claude.', founded_year: 2021 },
  { name: 'Google', slug: 'google', website_url: 'https://google.com', description: 'Technology company behind Gemini and NotebookLM.', founded_year: 1998 },
  { name: 'Perplexity AI', slug: 'perplexity-ai', website_url: 'https://perplexity.ai', description: 'Answer engine powered by AI search.', founded_year: 2022 },
  { name: 'Anysphere', slug: 'anysphere', website_url: 'https://cursor.sh', description: 'Makers of the Cursor AI code editor.', founded_year: 2022 },
  { name: 'Microsoft', slug: 'microsoft', website_url: 'https://microsoft.com', description: 'Technology company behind GitHub Copilot.', founded_year: 1975 },
  { name: 'Midjourney Inc.', slug: 'midjourney-inc', website_url: 'https://midjourney.com', description: 'Independent research lab behind Midjourney.', founded_year: 2021 },
  { name: 'Runway', slug: 'runway', website_url: 'https://runwayml.com', description: 'Applied AI research company for creative tools.', founded_year: 2018 },
  { name: 'Canva', slug: 'canva', website_url: 'https://canva.com', description: 'Online design and publishing platform.', founded_year: 2013 },
  { name: 'ElevenLabs', slug: 'elevenlabs', website_url: 'https://elevenlabs.io', description: 'Voice AI research and deployment company.', founded_year: 2022 },
];

// ------------------------------------------------------------
// 3. CATEGORIES
// ------------------------------------------------------------
const categories = [
  { name: 'Writing', slug: 'writing', description: 'Tools for drafting, editing, and improving text.', icon: 'pen-line' },
  { name: 'Coding', slug: 'coding', description: 'AI-assisted programming and development tools.', icon: 'code-2' },
  { name: 'Design', slug: 'design', description: 'Image, video, and visual design generation.', icon: 'palette' },
  { name: 'Marketing', slug: 'marketing', description: 'Content and campaign tools for marketers.', icon: 'megaphone' },
  { name: 'Research', slug: 'research', description: 'Search, summarization, and knowledge tools.', icon: 'search' },
];

// ------------------------------------------------------------
// 4. TAGS
// ------------------------------------------------------------
const tags = [
  { name: 'Trending', slug: 'trending' },
  { name: 'New', slug: 'new' },
  { name: 'Free', slug: 'free' },
  { name: "Editor's Pick", slug: 'editors-pick' },
];

// ------------------------------------------------------------
// 5. TOOLS
// company: slug from companies[] | categories: slugs[] | tags: slugs[]
// ------------------------------------------------------------
const tools = [
  {
    name: 'ChatGPT', slug: 'chatgpt', company: 'openai',
    tagline: 'Conversational AI for everything from writing to code.',
    description: 'A general-purpose conversational AI assistant.',
    long_description: 'ChatGPT is a large language model chatbot capable of answering questions, drafting content, writing and debugging code, and holding natural conversations across a wide range of topics.',
    logo_url: null, banner_url: null, website_url: 'https://chat.openai.com',
    pricing_type: 'freemium', starting_price: 20,
    featured: true, categories: ['writing', 'research'], tags: ['trending', 'editors-pick'],
  },
  {
    name: 'Claude', slug: 'claude', company: 'anthropic',
    tagline: 'A thoughtful, safety-focused AI assistant.',
    description: 'AI assistant by Anthropic built for helpfulness and safety.',
    long_description: 'Claude is an AI assistant designed to be helpful, harmless, and honest, with strong performance on writing, coding, and long-document analysis.',
    logo_url: null, banner_url: null, website_url: 'https://claude.ai',
    pricing_type: 'freemium', starting_price: 20,
    featured: true, categories: ['writing', 'coding', 'research'], tags: ['trending', 'editors-pick'],
  },
  {
    name: 'Gemini', slug: 'gemini', company: 'google',
    tagline: "Google's multimodal AI assistant.",
    description: 'Multimodal AI integrated across Google products.',
    long_description: 'Gemini is Google\'s family of multimodal AI models, capable of understanding text, images, and code, and integrated across Google Workspace.',
    logo_url: null, banner_url: null, website_url: 'https://gemini.google.com',
    pricing_type: 'freemium', starting_price: 19.99,
    featured: false, categories: ['writing', 'research'], tags: ['trending'],
  },
  {
    name: 'Perplexity', slug: 'perplexity', company: 'perplexity-ai',
    tagline: 'AI-powered answer engine with cited sources.',
    description: 'Search engine that answers questions with citations.',
    long_description: 'Perplexity combines real-time web search with AI-generated answers, citing sources directly so users can verify information.',
    logo_url: null, banner_url: null, website_url: 'https://perplexity.ai',
    pricing_type: 'freemium', starting_price: 20,
    featured: true, categories: ['research'], tags: ['trending', 'new'],
  },
  {
    name: 'Cursor', slug: 'cursor', company: 'anysphere',
    tagline: 'The AI-first code editor.',
    description: 'Code editor built around AI pair programming.',
    long_description: 'Cursor is a fork of VS Code rebuilt around AI-native workflows, letting developers chat with, edit, and generate code directly in the editor.',
    logo_url: null, banner_url: null, website_url: 'https://cursor.sh',
    pricing_type: 'paid', starting_price: 20,
    featured: true, categories: ['coding'], tags: ['trending', 'editors-pick'],
  },
  {
    name: 'GitHub Copilot', slug: 'github-copilot', company: 'microsoft',
    tagline: 'Your AI pair programmer, everywhere you code.',
    description: 'AI code completion built into popular IDEs.',
    long_description: 'GitHub Copilot suggests whole lines and functions in real time inside your editor, trained on billions of lines of public code.',
    logo_url: null, banner_url: null, website_url: 'https://github.com/features/copilot',
    pricing_type: 'paid', starting_price: 10,
    featured: false, categories: ['coding'], tags: [],
  },
  {
    name: 'Midjourney', slug: 'midjourney', company: 'midjourney-inc',
    tagline: 'Generate stunning AI art from text prompts.',
    description: 'AI image generation known for artistic quality.',
    long_description: 'Midjourney generates highly stylized, artistic images from text prompts via Discord or its web app, popular among designers and illustrators.',
    logo_url: null, banner_url: null, website_url: 'https://midjourney.com',
    pricing_type: 'paid', starting_price: 10,
    featured: true, categories: ['design'], tags: ['trending'],
  },
  {
    name: 'Runway', slug: 'runway', company: 'runway',
    tagline: 'AI video generation and editing.',
    description: 'Generate and edit video with AI.',
    long_description: 'Runway offers a suite of AI video tools including text-to-video generation, green screen removal, and motion tracking.',
    logo_url: null, banner_url: null, website_url: 'https://runwayml.com',
    pricing_type: 'freemium', starting_price: 15,
    featured: false, categories: ['design'], tags: ['new'],
  },
  {
    name: 'Canva', slug: 'canva', company: 'canva',
    tagline: 'Design anything with AI-powered tools.',
    description: 'Design platform with built-in AI features.',
    long_description: 'Canva combines drag-and-drop design with AI features like Magic Design and background removal, aimed at non-designers and teams.',
    logo_url: null, banner_url: null, website_url: 'https://canva.com',
    pricing_type: 'freemium', starting_price: 12.99,
    featured: false, categories: ['design', 'marketing'], tags: ['free'],
  },
  {
    name: 'ElevenLabs', slug: 'elevenlabs', company: 'elevenlabs',
    tagline: 'Ultra-realistic AI voice generation.',
    description: 'Text-to-speech and voice cloning.',
    long_description: 'ElevenLabs generates lifelike speech in dozens of languages, with support for voice cloning and long-form narration.',
    logo_url: null, banner_url: null, website_url: 'https://elevenlabs.io',
    pricing_type: 'freemium', starting_price: 5,
    featured: false, categories: ['design'], tags: ['new'],
  },
];

// ------------------------------------------------------------
// 6. PRICING PLANS keyed by tool slug
// ------------------------------------------------------------
const pricingPlansByTool = {
  chatgpt: [
    { plan_name: 'Free', price: 0, billing_period: 'month', features: ['Access to GPT-4o mini', 'Limited messages per day'] },
    { plan_name: 'Plus', price: 20, billing_period: 'month', features: ['Access to latest models', 'Priority access', 'Higher limits'] },
  ],
  claude: [
    { plan_name: 'Free', price: 0, billing_period: 'month', features: ['Limited daily messages', 'Standard response speed'] },
    { plan_name: 'Pro', price: 20, billing_period: 'month', features: ['5x more usage', 'Priority bandwidth', 'Early access to features'] },
  ],
  cursor: [
    { plan_name: 'Hobby', price: 0, billing_period: 'month', features: ['Limited AI completions'] },
    { plan_name: 'Pro', price: 20, billing_period: 'month', features: ['Unlimited completions', 'Advanced models'] },
  ],
  midjourney: [
    { plan_name: 'Basic', price: 10, billing_period: 'month', features: ['~200 images/month'] },
    { plan_name: 'Standard', price: 30, billing_period: 'month', features: ['Unlimited relaxed generations'] },
  ],
};

// ------------------------------------------------------------
// 7. SAMPLE IMAGES keyed by tool slug (placeholder URLs)
// ------------------------------------------------------------
const imagesByTool = {
  chatgpt: ['https://picsum.photos/seed/chatgpt-1/800/500', 'https://picsum.photos/seed/chatgpt-2/800/500'],
  claude: ['https://picsum.photos/seed/claude-1/800/500', 'https://picsum.photos/seed/claude-2/800/500'],
  midjourney: ['https://picsum.photos/seed/mj-1/800/500', 'https://picsum.photos/seed/mj-2/800/500'],
};

// ------------------------------------------------------------
// 8. SAMPLE REVIEWS keyed by tool slug -> [{ user email, rating, title, body }]
// ------------------------------------------------------------
const reviewsByTool = {
  chatgpt: [
    { email: 'arushi@example.com', rating: 5, title: 'Incredibly versatile', body: 'I use this daily for drafting emails and debugging small scripts.' },
    { email: 'sam@example.com', rating: 4, title: 'Great but hits limits fast', body: 'Free tier runs out quickly during heavy use.' },
  ],
  claude: [
    { email: 'jordan@example.com', rating: 5, title: 'Best for long documents', body: 'Handles large context far better than anything else I have tried.' },
  ],
  cursor: [
    { email: 'sam@example.com', rating: 5, title: 'Changed how I code', body: 'The inline chat and multi-file edits save me hours every week.' },
  ],
};

// ------------------------------------------------------------
// 9. BOOKMARKS keyed by user email -> [tool slugs]
// ------------------------------------------------------------
const bookmarksByUser = {
  'arushi@example.com': ['claude', 'cursor', 'midjourney'],
  'sam@example.com': ['chatgpt', 'github-copilot'],
};

// ------------------------------------------------------------
// 10. ALTERNATIVES (pairs, inserted both directions)
// ------------------------------------------------------------
const alternativePairs = [
  ['chatgpt', 'claude'],
  ['chatgpt', 'gemini'],
  ['claude', 'gemini'],
  ['cursor', 'github-copilot'],
  ['midjourney', 'runway'],
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Seeding users...');
    const userIdByEmail = {};
    for (const u of users) {
      const res = await client.query(
        `INSERT INTO users (name, email, avatar_url) VALUES ($1, $2, $3)
         ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name RETURNING id, email`,
        [u.name, u.email, u.avatar_url]
      );
      userIdByEmail[res.rows[0].email] = res.rows[0].id;
    }

    console.log('Seeding companies...');
    const companyIdBySlug = {};
    for (const c of companies) {
      const res = await client.query(
        `INSERT INTO companies (name, slug, website_url, description, founded_year)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id, slug`,
        [c.name, c.slug, c.website_url, c.description, c.founded_year]
      );
      companyIdBySlug[res.rows[0].slug] = res.rows[0].id;
    }

    console.log('Seeding categories...');
    const categoryIdBySlug = {};
    for (const c of categories) {
      const res = await client.query(
        `INSERT INTO categories (name, slug, description, icon) VALUES ($1, $2, $3, $4)
         ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id, slug`,
        [c.name, c.slug, c.description, c.icon]
      );
      categoryIdBySlug[res.rows[0].slug] = res.rows[0].id;
    }

    console.log('Seeding tags...');
    const tagIdBySlug = {};
    for (const t of tags) {
      const res = await client.query(
        `INSERT INTO tags (name, slug) VALUES ($1, $2)
         ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id, slug`,
        [t.name, t.slug]
      );
      tagIdBySlug[res.rows[0].slug] = res.rows[0].id;
    }

    console.log('Seeding tools...');
    const toolIdBySlug = {};
    for (const t of tools) {
      const res = await client.query(
        `INSERT INTO tools
          (company_id, name, slug, tagline, description, long_description, logo_url, banner_url,
           website_url, pricing_type, starting_price, featured, status)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'published')
         ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name RETURNING id, slug`,
        [
          companyIdBySlug[t.company] || null, t.name, t.slug, t.tagline, t.description,
          t.long_description, t.logo_url, t.banner_url, t.website_url,
          t.pricing_type, t.starting_price, t.featured,
        ]
      );
      toolIdBySlug[res.rows[0].slug] = res.rows[0].id;

      for (const catSlug of t.categories) {
        await client.query(
          `INSERT INTO tool_categories (tool_id, category_id) VALUES ($1, $2)
           ON CONFLICT DO NOTHING`,
          [toolIdBySlug[t.slug], categoryIdBySlug[catSlug]]
        );
      }
      for (const tagSlug of t.tags) {
        await client.query(
          `INSERT INTO tool_tags (tool_id, tag_id) VALUES ($1, $2)
           ON CONFLICT DO NOTHING`,
          [toolIdBySlug[t.slug], tagIdBySlug[tagSlug]]
        );
      }
    }

    console.log('Seeding pricing plans...');
    for (const [slug, plans] of Object.entries(pricingPlansByTool)) {
      let order = 0;
      for (const p of plans) {
        await client.query(
          `INSERT INTO pricing_plans (tool_id, plan_name, price, billing_period, features, sort_order)
           VALUES ($1,$2,$3,$4,$5,$6)`,
          [toolIdBySlug[slug], p.plan_name, p.price, p.billing_period, JSON.stringify(p.features), order++]
        );
      }
    }

    console.log('Seeding tool images...');
    for (const [slug, urls] of Object.entries(imagesByTool)) {
      let order = 0;
      for (const url of urls) {
        await client.query(
          `INSERT INTO tool_images (tool_id, image_url, sort_order) VALUES ($1, $2, $3)`,
          [toolIdBySlug[slug], url, order++]
        );
      }
    }

    console.log('Seeding reviews...');
    for (const [slug, revs] of Object.entries(reviewsByTool)) {
      for (const r of revs) {
        await client.query(
          `INSERT INTO reviews (tool_id, user_id, rating, title, body)
           VALUES ($1,$2,$3,$4,$5)
           ON CONFLICT (tool_id, user_id) DO NOTHING`,
          [toolIdBySlug[slug], userIdByEmail[r.email], r.rating, r.title, r.body]
        );
      }
    }
    // Note: rating_avg/rating_count on `tools` update automatically via
    // the trg_reviews_after_change trigger from the schema — no manual update needed.

    console.log('Seeding bookmarks...');
    for (const [email, slugs] of Object.entries(bookmarksByUser)) {
      for (const slug of slugs) {
        await client.query(
          `INSERT INTO bookmarks (user_id, tool_id) VALUES ($1, $2)
           ON CONFLICT DO NOTHING`,
          [userIdByEmail[email], toolIdBySlug[slug]]
        );
      }
    }

    console.log('Seeding tool alternatives...');
    for (const [a, b] of alternativePairs) {
      await client.query(
        `INSERT INTO tool_alternatives (tool_id, alternative_tool_id) VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [toolIdBySlug[a], toolIdBySlug[b]]
      );
      await client.query(
        `INSERT INTO tool_alternatives (tool_id, alternative_tool_id) VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [toolIdBySlug[b], toolIdBySlug[a]]
      );
    }

    console.log('✅ Seed complete.');
  } catch (err) {
    console.error('❌ Seed failed:', err);
    throw err;
  } finally {
    client.release();
    process.exit(0);
  }
}

seed();