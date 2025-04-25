"use client";
 
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Upload, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { extractReceipt } from "@/app/actions";
import { JigsawStack } from "jigsawstack";

const jigsaw = JigsawStack({
  apiKey: process.env.NEXT_PUBLIC_JIGSAWSTACK_PUBLIC_KEY,
});

export function UploadRecipt({ onFinishExtract }: { onFinishExtract: (result: any) => void }) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [status, setStatus] = React.useState<"idle"|"uploading"|"extracting">("idle");
 
  const onUpload = React.useCallback(
    async (
      files: File[],
      {
        onProgress,
        onSuccess,
        onError,
      }: {
        onProgress: (file: File, progress: number) => void;
        onSuccess: (file: File) => void;
        onError: (file: File, error: Error) => void;
      },
    ) => {
      try {
        // Process each file individually
        const uploadPromises = files.map(async (file) => {
          try {
            setStatus("uploading");
            const key = file.name;
            const result = await jigsaw.store.upload(file, {
                key,
                overwrite: true
            });
            console.log(result);
            setStatus("extracting");
            const form = new FormData();
            form.append("file_store_key", result.key);
            const response = await extractReceipt(form);
            onFinishExtract(response.context);
            // onSuccess(file);
          } catch (error) {
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed"),
            );
          } finally {
            setStatus("idle");
          }
        });
      } catch (error) {
        // This handles any error that might occur outside the individual upload processes
        console.error("Unexpected error during upload:", error);
      }
    },
    [],
  );
 
  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
    });
  }, []);
 
  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      maxFiles={10}
      maxSize={5 * 1024 * 1024}
      className="w-full max-w-md"
      onUpload={onUpload}
      onFileReject={onFileReject}
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="size-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm">Drag & drop recipt here</p>
          <p className="text-muted-foreground text-xs text-center">
            Or click to browse (max 10 files, up to 5MB each)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Browse recipt
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList orientation="vertical">
        {files.map((file, index) => (
            <FileUploadItem key={index} value={file} className="w-full">
                <FileUploadItemPreview />
                <FileUploadItemMetadata />
                {/* <FileUploadItemDelete asChild>
                <Button variant="ghost" size="icon" className="size-7">
                    <X />
                </Button>
                </FileUploadItemDelete> */}
            </FileUploadItem>
        ))}
        {status !== "idle" && (<p className="text-muted-foreground text-xs italic">{status}</p>)}
      </FileUploadList>
    </FileUpload>
  );
}