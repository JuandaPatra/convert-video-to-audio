"use client";

import SubmitButton from "../ui/Button";
import { useUpload } from "@/hooks/useUpload";
import { useUploadStore } from "@/store/uploadStore";
import { downloadAudio } from "@/services/convertService";

export interface UploadItemProps {
  fileName: string;
  clientId: string;
}

export default function UploadItem({ fileName, clientId }: UploadItemProps) {
  const { uploadFile } = useUpload();

  const job = useUploadStore((state) =>
    state.jobs.find((j) => j.clientId === clientId),
  );

  const handleConvert = () => {
    uploadFile(clientId);
  };

  return (
    <div className="upload-item text-white">
      <div className="file-name">{job?.fileName}</div>
      <div className="progress-bar">
        <div className="progress" style={{ width: "50%" }}></div>
      </div>
     
    {job?.status === "completed" ? (
        <SubmitButton onClick={() => downloadAudio(job.jobId!)}>
          Download
        </SubmitButton>
      ) : (
        <SubmitButton onClick={handleConvert}>
          Convert
        </SubmitButton>
      )}
    </div>
  );
}
