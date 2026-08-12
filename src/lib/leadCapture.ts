const LEAD_CAPTURE_URL =
  "https://qvkjzukzfhbpzevqpwqz.supabase.co/functions/v1/website-lead-capture";

export interface LeadCaptureInput {
  name: string;
  phone: string;
  email: string;
  service: string;
  details: string;
  company: string;
  website: string;
}

export async function submitLead(input: LeadCaptureInput) {
  const response = await fetch(LEAD_CAPTURE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.error || "Unable to submit lead");
  }

  return result.lead;
}
