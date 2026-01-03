import { useCallback, useState } from "react";
import { Upload, X, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";

interface ImageUploadProps {
  onImagesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  className?: string;
}

interface UploadedImage {
  file: File;
  preview: string;
  id: string;
}

export const ImageUpload = ({
  onImagesSelected,
  maxFiles = 5,
  maxSizeMB = 5,
  acceptedFormats = ["image/jpeg", "image/jpg", "image/png"],
  className,
}: ImageUploadProps) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!acceptedFormats.includes(file.type)) {
      return `Invalid file type. Please upload ${acceptedFormats.map(f => f.split("/")[1].toUpperCase()).join(", ")} only.`;
    }

    // Check file size
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      return `File too large. Maximum size is ${maxSizeMB}MB.`;
    }

    return null;
  };

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      setError("");
      const fileArray = Array.from(files);

      // Check total number of files
      if (images.length + fileArray.length > maxFiles) {
        setError(`Maximum ${maxFiles} images allowed.`);
        return;
      }

      const validFiles: File[] = [];
      const newImages: UploadedImage[] = [];

      for (const file of fileArray) {
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          return;
        }

        validFiles.push(file);

        // Create preview
        const preview = URL.createObjectURL(file);
        newImages.push({
          file,
          preview,
          id: `${Date.now()}-${Math.random()}`,
        });
      }

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onImagesSelected(updatedImages.map((img) => img.file));
    },
    [images, maxFiles, onImagesSelected, acceptedFormats, maxSizeMB]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        processFiles(files);
      }
    },
    [processFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        processFiles(files);
      }
      // Reset input
      e.target.value = "";
    },
    [processFiles]
  );

  const removeImage = useCallback(
    (id: string) => {
      const updatedImages = images.filter((img) => {
        if (img.id === id) {
          URL.revokeObjectURL(img.preview);
          return false;
        }
        return true;
      });
      setImages(updatedImages);
      onImagesSelected(updatedImages.map((img) => img.file));
      setError("");
    },
    [images, onImagesSelected]
  );

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 md:p-12 transition-all cursor-pointer",
          isDragging
            ? "border-[#E4B68A] bg-[#E4B68A]/5"
            : "border-gray-300 hover:border-[#E4B68A] hover:bg-gray-50"
        )}
      >
        <input
          type="file"
          multiple
          accept={acceptedFormats.join(",")}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="file-upload"
        />

        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#E4B68A]/10 flex items-center justify-center">
            <Upload className="w-8 h-8 text-[#E4B68A]" />
          </div>

          <div>
            <p className="text-lg font-semibold text-(--color-gray-darker) mb-2">
              {isDragging ? "Drop your images here" : "Drag & drop images here"}
            </p>
            <p className="text-sm text-(--color-slate) mb-4">
              or{" "}
              <label
                htmlFor="file-upload"
                className="text-[#E4B68A] font-medium hover:text-[#D4A67A] cursor-pointer"
              >
                browse files
              </label>
            </p>

            <div className="text-xs text-(--color-slate) space-y-1">
              <p>
                • Supported formats: JPG, JPEG, PNG
              </p>
              <p>• Maximum file size: {maxSizeMB}MB per image</p>
              <p>• Up to {maxFiles} images</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group"
            >
              <img
                src={image.preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />

              {/* Remove Button */}
              <button
                onClick={() => removeImage(image.id)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>

              {/* File name */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2">
                <p className="text-xs text-white truncate">{image.file.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

