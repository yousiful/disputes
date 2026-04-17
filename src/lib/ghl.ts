const LOCATION_ID = 'q5L4ttbBMHNxieXIcTVJ';

export interface GHLContact {
  id: string;
  contactName: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  dateAdded: string;
  dateUpdated: string;
  tags: string[];
  type: string;
  source: string | null;
  assignedTo: string | null;
  customFields: { id: string; value: unknown }[];
}

export interface GHLNote {
  id: string;
  body: string;
  dateAdded: string;
  userId: string | null;
}

export interface GHLOpportunity {
  id: string;
  name: string;
  status: string;
  monetaryValue: number;
  pipelineId: string;
  pipelineStageId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GHLData {
  contact: GHLContact;
  notes: GHLNote[];
  opportunities: GHLOpportunity[];
}

async function ghlFetch(path: string) {
  const res = await fetch(`/api/ghl${path}`);
  if (!res.ok) throw new Error(`GHL API error: ${res.status} ${path}`);
  return res.json();
}

export async function searchContacts(query: string): Promise<GHLContact[]> {
  const data = await ghlFetch(`/contacts/?locationId=${LOCATION_ID}&query=${encodeURIComponent(query)}&limit=10`);
  return data.contacts ?? [];
}

export async function getContactNotes(contactId: string): Promise<GHLNote[]> {
  const data = await ghlFetch(`/contacts/${contactId}/notes`);
  return data.notes ?? [];
}

export async function getContactOpportunities(contactId: string): Promise<GHLOpportunity[]> {
  const data = await ghlFetch(`/opportunities/search?location_id=${LOCATION_ID}&contact_id=${contactId}&limit=20`);
  return data.opportunities ?? [];
}

export async function fetchGHLData(email: string): Promise<GHLData | null> {
  const contacts = await searchContacts(email);
  const contact = contacts.find(
    (c) => c.email?.toLowerCase() === email.toLowerCase()
  ) ?? contacts[0];

  if (!contact) return null;

  const [notes, opportunities] = await Promise.all([
    getContactNotes(contact.id),
    getContactOpportunities(contact.id),
  ]);

  return { contact, notes, opportunities };
}
