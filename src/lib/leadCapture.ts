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
  let response: Response;

  try {
    response = await fetch(LEAD_CAPTURE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(input),
    });
  } catch {
    throw new Error("Unable to reach the lead service. Please try again.");
  }

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result?.error ||
        result?.message ||
        `Lead submission failed (${response.status}). Please try again.`
    );
  }

  if (!result?.success || !result?.lead) {
    throw new Error("The lead service did not confirm the submission.");
  }

  return result.lead;
}
