import React from "react";

const useUtil = () => {
  type FileInput = File | Blob;
  const compressImage = (
    file: FileInput,
    targetSizeKB: number = 300,
    scale: number = 0.8,
    quality: number = 0.8
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width * scale;
        let height = img.height * scale;

        // Create a loop to reduce image size until it is under the target size
        const checkSize = () => {
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
          }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convert the image to a blob and check its size
          canvas.toBlob(
            (blob: Blob | null) => {
              if (blob) {
                const sizeKB = blob.size / 1024; // Size in KB

                // If the size is greater than the target, reduce scale and quality
                if (sizeKB > targetSizeKB) {
                  scale *= 0.9; // Decrease scale
                  quality -= 0.05; // Decrease quality
                  checkSize(); // Try again with reduced scale and quality
                } else {
                  resolve(blob);
                }
              } else {
                reject(new Error("Failed to convert canvas to blob"));
              }
            },
            "image/jpeg",
            quality
          );
        };

        checkSize(); // Start the size-checking loop
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
    });
  };

  const convertToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject(new Error("Failed to read blob as Base64"));
        }
      };
      reader.onerror = () => {
        reject(new Error("Error reading file as Base64"));
      };
    });
  };

  return { compressImage, convertToBase64 };
};

export default useUtil;
