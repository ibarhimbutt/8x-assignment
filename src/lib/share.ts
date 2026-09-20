export type ClipPayload = {
  meetingId: string;
  highlightId?: string;
  start: number;
  end: number;
  title: string;
};

function bytesToB64url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlEncode(s: string): string {
  return bytesToB64url(new TextEncoder().encode(s));
}

function b64urlDecode(s: string): string {
  const pad = s.replace(/-/g, "+").replace(/_/g, "/");
  const padded = pad + "=".repeat((4 - (pad.length % 4)) % 4);
  const bin = atob(padded);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

export function encodeClip(payload: ClipPayload): string {
  return b64urlEncode(JSON.stringify(payload));
}

export function decodeClip(token: string): ClipPayload | null {
  try {
    const data = JSON.parse(b64urlDecode(token)) as ClipPayload;
    if (!data.meetingId || typeof data.start !== "number") return null;
    return data;
  } catch {
    return null;
  }
}
