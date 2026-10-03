export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = Netlify.env.get("GEMINI_API_KEY");
  if (!apiKey) {
    return Response.json({ error: "GEMINI_API_KEY server par set nahi hai" }, { status: 500 });
  }

  const model = Netlify.env.get("GEMINI_MODEL") || "gemini-3-flash-preview";

  let contents;
  try {
    ({ contents } = await req.json());
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  if (typeof contents !== "string" || !contents.trim() || contents.length > 60000) {
    return Response.json({ error: "Invalid prompt" }, { status: 400 });
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({ contents: [{ parts: [{ text: contents }] }] }),
    }
  );

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return Response.json(
      { error: data?.error?.message || "Gemini request fail hua" },
      { status: res.status }
    );
  }

  const text = (data?.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("");
  return Response.json({ text });
};
