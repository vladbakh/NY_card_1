import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const images = req.body.images; // base64 array

    const prompt = `
Transform these photos into a warm New Year illustration.
Keep faces recognizable.
Winter, snow, cozy wooden house, Christmas lights.
Family New Year postcard.
Illustration style, cinematic lighting, magical atmosphere.
`;

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      image: images, // 🔥 image-to-image
      size: "1024x1024"
    });

    res.status(200).json({
      image: result.data[0].b64_json
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Generation failed" });
  }
}
