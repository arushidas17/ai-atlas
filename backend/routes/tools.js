const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/tools
// Supports: ?category=coding  ?pricing=free  ?search=chat  ?sort=rating|newest|popular
router.get('/', async (req, res) => {
  try {
    const { category, pricing, search, sort } = req.query;
    const params = [];
    let query = `
      SELECT t.*,
        c.name AS company_name,
        array_remove(array_agg(DISTINCT cat.name), NULL) AS categories,
        array_remove(array_agg(DISTINCT tag.name), NULL) AS tags
      FROM tools t
      LEFT JOIN companies c ON c.id = t.company_id
      LEFT JOIN tool_categories tc ON tc.tool_id = t.id
      LEFT JOIN categories cat ON cat.id = tc.category_id
      LEFT JOIN tool_tags tt ON tt.tool_id = t.id
      LEFT JOIN tags tag ON tag.id = tt.tag_id
      WHERE t.status = 'published'
    `;

    if (category) {
      params.push(category);
      query += ` AND t.id IN (
        SELECT tool_id FROM tool_categories tc2
        JOIN categories c2 ON c2.id = tc2.category_id
        WHERE c2.slug = $${params.length}
      )`;
    }
    if (pricing) {
      params.push(pricing);
      query += ` AND t.pricing_type = $${params.length}`;
    }
    if (search) {
      params.push(`%${search}%`);
      query += ` AND t.name ILIKE $${params.length}`;
    }

    query += ' GROUP BY t.id, c.name';

    if (sort === 'newest') query += ' ORDER BY t.created_at DESC';
    else if (sort === 'popular') query += ' ORDER BY t.view_count DESC';
    else query += ' ORDER BY t.rating_avg DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tools' });
  }
});

// GET /api/tools/:slug — full detail page payload
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const toolResult = await pool.query(
      `SELECT t.*, c.name AS company_name, c.slug AS company_slug, c.logo_url AS company_logo
       FROM tools t
       LEFT JOIN companies c ON c.id = t.company_id
       WHERE t.slug = $1 AND t.status = 'published'`,
      [slug]
    );
    if (!toolResult.rows.length) return res.status(404).json({ error: 'Tool not found' });
    const tool = toolResult.rows[0];

    // increment view count (fire and forget)
    pool.query('UPDATE tools SET view_count = view_count + 1 WHERE id = $1', [tool.id]).catch(() => {});

    const [categories, tags, images, pricingPlans, reviews, alternatives] = await Promise.all([
      pool.query(
        `SELECT cat.name, cat.slug FROM tool_categories tc
         JOIN categories cat ON cat.id = tc.category_id WHERE tc.tool_id = $1`,
        [tool.id]
      ),
      pool.query(
        `SELECT tag.name, tag.slug FROM tool_tags tt
         JOIN tags tag ON tag.id = tt.tag_id WHERE tt.tool_id = $1`,
        [tool.id]
      ),
      pool.query(
        `SELECT image_url, caption FROM tool_images WHERE tool_id = $1 ORDER BY sort_order`,
        [tool.id]
      ),
      pool.query(
        `SELECT plan_name, price, billing_period, features FROM pricing_plans
         WHERE tool_id = $1 ORDER BY sort_order`,
        [tool.id]
      ),
      pool.query(
        `SELECT r.rating, r.title, r.body, r.created_at, u.name AS user_name
         FROM reviews r LEFT JOIN users u ON u.id = r.user_id
         WHERE r.tool_id = $1 ORDER BY r.created_at DESC`,
        [tool.id]
      ),
      pool.query(
        `SELECT alt.id, alt.name, alt.slug, alt.logo_url, alt.rating_avg
         FROM tool_alternatives ta
         JOIN tools alt ON alt.id = ta.alternative_tool_id
         WHERE ta.tool_id = $1`,
        [tool.id]
      ),
    ]);

    res.json({
      ...tool,
      categories: categories.rows,
      tags: tags.rows,
      images: images.rows,
      pricing_plans: pricingPlans.rows,
      reviews: reviews.rows,
      alternatives: alternatives.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tool' });
  }
});

module.exports = router;