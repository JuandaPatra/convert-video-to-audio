"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadStore } from "@/store/uploadStore";
import { generateClientId } from "@/helpers/generateId";

export default function UploadDropzone() {
  const selectFile = useUploadStore((state) => state.selectedFile);
  const pickFile = useUploadStore((state) => state.addSelectedFile);
  const addJob = useUploadStore((state) => state.addJob);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        const clientId = generateClientId(file);
        addJob({
          clientId,
          jobId: "",
          file: file,
          fileName: file.name,
          status: "idle",
          progress: 0,
        })

      }
    },
    [addJob ],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag n drop some files here, or click to select files</p>
      )}
    </div>
  );
}
