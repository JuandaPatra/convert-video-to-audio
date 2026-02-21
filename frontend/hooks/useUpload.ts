"use client";

import { useUploadStore } from "@/store/uploadStore";
import { uploadVideo, getProgress } from "@/services/convertService";
import { get } from "http";

export default function useUpload() {
  const addJob = useUploadStore((state) => state.addJob);
  const updateProgress = useUploadStore((state) => state.updateProgress);
  const setStatus = useUploadStore((state) => state.setStatus);
  const setError = useUploadStore((state) => state.setError);
  const removeJob = useUploadStore((state) => state.removeJob);

  const uploadFile = async (file: File) => {
    const jobId = await uploadVideo(file);

    addJob({
      jobId,
      file,
      fileName: file.name,
      status: "uploading",
      progress: 0,
    });

    pollProgress(jobId);
  };

  const pollProgress = async (jobId: string) => {
    try {
    const interval = setInterval(async () => {
        const progress = await getProgress(jobId);
        updateProgress(jobId, progress)

        if(progress >= 100){
            setStatus(jobId, "completed");
            clearInterval(interval);
        }
    
    }, 500)

    } catch (error) {
      setError(jobId, "Failed to get progress");
      console.error("Failed to get progress", error);
    }
  };

  return {
    uploadFile,
  };
}
