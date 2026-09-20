const blobs = new Map<string, Blob>();

export function stashRecording(id: string, blob: Blob) {
  blobs.set(id, blob);
}

export function getRecordingUrl(id: string): string | null {
  const blob = blobs.get(id);
  if (!blob) return null;
  return URL.createObjectURL(blob);
}
