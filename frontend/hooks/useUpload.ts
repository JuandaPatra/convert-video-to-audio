"use client";

import { useUploadStore } from "@/store/uploadStore";
import { uploadVideo, getProgress } from "@/services/convertService";
import { generateClientId} from "@/helpers/generateId";


export  function useUpload() {
  const selectedFiles = useUploadStore((state) => state.selectedFile);
  const jobs = useUploadStore((state) => state.jobs);
  // const clearSelectedFiles = useUploadStore((s) => s.clearSelectedFiles);

  const addJob = useUploadStore((state) => state.addJob);
  const updateProgress = useUploadStore((state) => state.updateProgress);
  const setStatus = useUploadStore((state) => state.setStatus);
  const setError = useUploadStore((state) => state.setError);
  // const removeJob = useUploadStore((state) => state.remove  Job);

  const uploadFile = async (clientId: string) => {
    try{
      console.log('uploadFile clientId', clientId)
      const jobId = await uploadVideo(jobs.find(file => file.clientId === clientId)?.file as File);
      console.log('jobId', jobId)
      updateProgress(jobId, 0);
      setStatus(clientId,jobId, "uploading");
      pollProgress(clientId,jobId);

      // const jobId = await uploadVideo(jobs.find(file =>  === clientId)?.file as File);
      // addJob({
      //   clientId: generateClientId(jobs.find(file => generateClientId(file.file) === clientId)?.file as File),
      //   jobId,
      //   file: jobs.find(file => generateClientId(file.file) === clientId)?.file as File,
      //   fileName: jobs.find(file => generateClientId(file.file) === clientId)?.fileName as string,
      //   status: "uploading",
      //   progress: 0,
      // });

      // pollProgress(jobId);

    }catch(e){
      console.log('error', e)
    }
    
  };

  const pollProgress = async (clientId : string, jobId: string) => {
    try {
    const interval = setInterval(async () => {
        const progress = await getProgress(jobId);
        updateProgress(jobId, progress)

        if(progress >= 100){
            setStatus(clientId,jobId, "completed");
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
