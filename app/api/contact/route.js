import {createClient} from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "w6jeuoaf",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_EDITOR_TOKEN,
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-01",
});

export async function POST(request) {
  try {
    const payload = await request.json();
    const name = (payload.name || "").trim();
    const email = (payload.email || "").trim();
    const phone = (payload.phone || "").trim();
    const message = (payload.message || "").trim();

    if (!name || !email || !message) {
      return Response.json(
        {ok: false, error: "Name, email, and message are required."},
        {status: 400},
      );
    }

    await client.create({
      _type: "leadSubmission",
      name,
      email,
      phone,
      message,
      createdAt: new Date().toISOString(),
    });

    return Response.json({ok: true});
  } catch (error) {
    return Response.json(
      {ok: false, error: "Failed to submit form."},
      {status: 500},
    );
  }
}
