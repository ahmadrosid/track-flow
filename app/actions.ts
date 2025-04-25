"use server";

import { JigsawStack } from "jigsawstack";

const jigsaw = JigsawStack({
  apiKey: process.env.JIGSAWSTACK_API_KEY,
});

export async function extractReceipt(form: FormData) {
  const response = jigsaw.vision.vocr({
    prompt: ["date", "business_name", "services", "service_name", "service_amount"],
    file_store_key: form.get("file_store_key") as string,
  })

  return response
}