import { s as sql } from '../../../chunks/neon_Dt7TbMBK.mjs';
export { renderers } from '../../../renderers.mjs';

const rateLimitStore = /* @__PURE__ */ new Map();
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 1e3;
const prerender = false;
function checkRateLimit(fingerprintId) {
  const now = Date.now();
  const key = `rate:${fingerprintId}`;
  const entry = rateLimitStore.get(key);
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }
  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, error: "Rate limit exceeded. Try again later." };
  }
  rateLimitStore.set(key, { count: entry.count + 1, resetTime: entry.resetTime });
  return { allowed: true };
}
const POST = async ({ params, request }) => {
  const { postId } = params;
  console.log("postId", postId);
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    "https://cojocarudavid.me",
    // Replace with your actual domain
    "http://localhost:3000",
    // For local development
    "https://www.cojocarudavid.me"
    // Replace with your actual domain
  ];
  if (!origin || !allowedOrigins.includes(origin)) {
    return new Response(
      JSON.stringify({ success: false, data: null, error: "Unauthorized" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }
  let fingerprintId;
  try {
    const body = await request.json();
    fingerprintId = body.fingerprintId;
    if (!postId || !/^[a-zA-Z0-9-]+$/.test(postId)) {
      return new Response(
        JSON.stringify({ success: false, data: null, error: "Invalid post ID" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!fingerprintId || typeof fingerprintId !== "string" || fingerprintId.length > 100) {
      return new Response(
        JSON.stringify({ success: false, data: null, error: "Invalid fingerprint ID" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error parsing request body:", error);
    return new Response(
      JSON.stringify({ success: false, data: null, error: "Invalid JSON payload" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  const rateLimitResult = checkRateLimit(fingerprintId);
  if (!rateLimitResult.allowed) {
    return new Response(
      JSON.stringify({ success: false, data: null, error: rateLimitResult.error }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const existingLike = await sql`
      SELECT 1
      FROM post_likes
      WHERE post_id = ${postId} AND fingerprint_id = ${fingerprintId}
    `;
    if (existingLike.length > 0) {
      return new Response(
        JSON.stringify({ success: false, data: null, error: "You have already liked this post" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
    try {
      await sql`
        INSERT INTO post_likes (post_id, fingerprint_id)
        VALUES (${postId}, ${fingerprintId})
      `;
    } catch (error) {
      if (error.code === "23505") {
        return new Response(
          JSON.stringify({ success: false, data: null, error: "You have already liked this post" }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
      throw error;
    }
    const result = await sql`
      INSERT INTO post_feedback (post_id, likes, dislikes)
      VALUES (${postId}, 1, 0)
      ON CONFLICT (post_id)
      DO UPDATE SET likes = post_feedback.likes + 1
      RETURNING likes, dislikes
    `;
    return new Response(
      JSON.stringify({
        success: true,
        data: { likes: result[0].likes, dislikes: result[0].dislikes },
        error: null
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(`Error updating likes for post ${postId}:`, error);
    return new Response(
      JSON.stringify({ success: false, data: null, error: "An error occurred processing your request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const GET = async ({ params }) => {
  const { postId } = params;
  if (!postId || !/^[a-zA-Z0-9-]+$/.test(postId)) {
    return new Response(
      JSON.stringify({ success: false, data: null, error: "Invalid post ID" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const result = await sql`
      SELECT likes, dislikes FROM post_feedback
      WHERE post_id = ${postId}
    `;
    if (result.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          data: { likes: 0, dislikes: 0 },
          error: null
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        data: { likes: result[0].likes, dislikes: result[0].dislikes },
        error: null
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(`Error fetching likes/dislikes for post ${postId}:`, error);
    return new Response(
      JSON.stringify({ success: false, data: null, error: "An error occurred fetching post data" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
