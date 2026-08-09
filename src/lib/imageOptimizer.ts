/**
 * Optimizes an image file client-side by resizing it and compressing it to JPEG/WEBP.
 */
export async function optimizeImage(
  file: File,
  maxWidth: number = 1400,
  quality: number = 0.82
): Promise<{ file: File; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    // If it's a GIF, don't resize or compress, preserve animation
    if (file.type === "image/gif") {
      const img = new Image();
      img.onload = () => {
        resolve({ file, width: img.width, height: img.height });
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Determine output type (prefer webp, fallback to jpeg)
        const outputType = file.type === "image/png" ? "image/jpeg" : file.type;

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas conversion to Blob failed"));
              return;
            }

            const optimizedFile = new File([blob], file.name, {
              type: outputType,
              lastModified: Date.now(),
            });

            resolve({
              file: optimizedFile,
              width,
              height,
            });
          },
          outputType,
          quality
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}
