import fotoPedro from "@/assets/profile_photo/fotoDNIPedroOrtegaCV-Palette.png";

export const photoMap: Record<string, string> = {
  "fotoDNIPedroOrtegaCV-Palette.png": fotoPedro,
};

export const getPhotoUrl = (photoName: string | undefined): string | undefined => {
  if (!photoName) return undefined;
  return photoMap[photoName];
};

