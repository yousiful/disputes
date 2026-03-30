import { useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { FileWithPreview } from '../types/dispute';

interface FileUploadZoneProps {
  files: FileWithPreview[];
  onFilesChange: (files: FileWithPreview[]) => void;
}

export const FileUploadZone = ({ files, onFilesChange }: FileUploadZoneProps) => {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFiles = Array.from(e.target.files).map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          name: file.name,
        }));
        onFilesChange([...files, ...newFiles]);
      }
    },
    [files, onFilesChange]
  );

  const removeFile = useCallback(
    (index: number) => {
      URL.revokeObjectURL(files[index].preview);
      onFilesChange(files.filter((_, i) => i !== index));
    },
    [files, onFilesChange]
  );

  return (
    <div className="space-y-4 w-full overflow-hidden">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-32 md:h-40 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer bg-white hover:bg-slate-50 transition-colors"
      >
        <div className="flex flex-col items-center justify-center pt-4 pb-5 px-4">
          <Upload className="w-8 h-8 md:w-10 md:h-10 mb-2 md:mb-3 text-slate-400" />
          <p className="mb-1 md:mb-2 text-xs md:text-sm text-slate-600 text-center">
            <span className="font-semibold text-slate-900">Click to upload</span>
            <span className="hidden sm:inline"> or drag and drop</span>
          </p>
          <p className="text-xs text-slate-500">PNG, JPG, PDF up to 10MB</p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          multiple
          accept="image/*,.pdf"
          onChange={handleFileChange}
        />
      </label>

      {files.length > 0 && (
        <div className="space-y-2 w-full">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2 p-2 md:p-3 bg-white border border-slate-300 rounded-lg w-full overflow-hidden"
            >
              <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                <img
                  src={file.preview}
                  alt={file.name}
                  className="w-10 h-10 md:w-12 md:h-12 object-cover rounded border border-slate-300 flex-shrink-0"
                />
                <span className="text-xs md:text-sm text-slate-700 truncate flex-1 min-w-0">
                  {file.name}
                </span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0 p-1"
                aria-label="Remove file"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
