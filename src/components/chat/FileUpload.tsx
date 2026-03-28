"use client";
import { useRef } from "react";
import { Plus, X, FileText, Image as ImageIcon } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
}

export default function FileUpload({ onFileSelect, selectedFile, onClear }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const accept = ".pdf,.csv,.xlsx,.xls,.png,.jpg,.jpeg,.txt";

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  }

  const isImage = selectedFile?.type.startsWith("image/");

  return (
    <>
      <input ref={inputRef} type="file" accept={accept} className="hidden"
        onChange={(e) => { if (e.target.files?.[0]) onFileSelect(e.target.files[0]); }} />

      <button onClick={() => inputRef.current?.click()} type="button"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] hover:bg-[#F5F5F5] hover:text-[#111] transition-colors">
        <Plus size={18} />
      </button>

      {selectedFile && (
        <div className="absolute -top-12 left-0 right-0 px-4">
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#EAEAEA] bg-white px-3 py-1.5 text-xs text-[#555]">
            {isImage ? <ImageIcon size={14} /> : <FileText size={14} />}
            <span className="max-w-[200px] truncate">{selectedFile.name}</span>
            <span className="text-[#BBB]">{formatSize(selectedFile.size)}</span>
            <button onClick={onClear} className="text-[#BBB] hover:text-[#111]"><X size={14} /></button>
          </div>
        </div>
      )}
    </>
  );
}
