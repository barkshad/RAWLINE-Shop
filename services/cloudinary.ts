
export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", "real_unsigned");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/ds2mbrzcn/image/upload",
    { method: "POST", body: fd }
  );

  if (!res.ok) throw new Error("Upload failed");
  const json = await res.json();
  return json.public_id;
}

export function imageUrl(id: string, width: number = 1200) {
  if (!id) return `https://picsum.photos/${width}/${Math.round(width * 1.2)}`;
  return `https://res.cloudinary.com/ds2mbrzcn/image/upload/q_auto,f_auto,w_${width}/${id}.jpg`;
}
