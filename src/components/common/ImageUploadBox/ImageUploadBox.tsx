import { useState, useCallback, useRef, useId } from "react";
import { FaCloudArrowUp, FaImage } from "react-icons/fa6";

interface ImageUploadBoxProps {
  label: string;
  value: string | undefined;
  onChange: (val: string) => void;
  heightClass?: string;
}

export const ImageUploadBox = ({
  label,
  value,
  onChange,
  heightClass = "h-32",
}: ImageUploadBoxProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        onChange(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={inputId}
        className="text-xs font-mono text-gray-400 uppercase tracking-wider"
      >
        {label}
      </label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-all cursor-pointer text-center overflow-hidden
            ${isDragging ? "border-amber-500 bg-amber-50 scale-[1.02]" : "border-gray-300 dark:border-dark-30 hover:border-dark-30 dark:hover:border-gray-500 bg-white dark:bg-dark-10"} ${heightClass}`}
      >
        <input
          type="file"
          id={inputId}
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
          aria-label={label}
        />

        {value ? (
          <div className="group w-full h-full relative">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
              <FaCloudArrowUp className="text-2xl mb-1" />
              <span className="text-xs font-mono uppercase">Replace Image</span>
            </div>
          </div>
        ) : (
          <div className="p-4 flex flex-col items-center">
            <FaImage className="text-gray-300 text-xl mb-2" />
            <span className="text-xs text-gray-400 font-mono">
              Click or Drop
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
