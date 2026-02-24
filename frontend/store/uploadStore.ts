import { create } from "zustand";

export type UploadStatus = "idle" | "uploading" | "processing" | "completed" | "error";

export interface UploadJob {
  clientId: string; 
  jobId: string;
  file: File;
  fileName: string;
  status: UploadStatus;
  progress: number; // 0 to 100
  errorMessage?: string; // present if status is "error"
}

export interface SelectedFile {
  file: File;
  fileName: string;
}
interface UploadStore {
  selectedFile :SelectedFile[]
  jobs: UploadJob[];

  addSelectedFile : (file: File[]) => void;

  addJob: (job: UploadJob) => void;

  updateProgress: (jobId: string, progress: number) => void;

  setStatus: (
    clientId : string,
    jobId: string,
    status: UploadStatus,
    errorMessage?: string,
  ) => void;

  setError: (jobId: string, errorMessage: string) => void;

  removeJob: (jobId: string) => void;

  reset: () => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  selectedFile :[],
  jobs: [],

  addSelectedFile : (file) =>
    set((state) => ({
      selectedFile: [...state.selectedFile, ...file.map(f => ({file: f, fileName: f.name}))],
    })),

  addJob: (job) =>
    set((state) => ({
      jobs: [...state.jobs, job],
    })),

  updateProgress: (jobId, progress) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.jobId === jobId ? { ...job, progress } : job,
      ),
    })),
  setStatus: (clientId, jobId, status, errorMessage) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.clientId == clientId ? {...job, jobId, status, errorMessage} :job

      ),
    })),
  setError: (jobId, errorMessage) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.jobId === jobId ? { ...job, status: "error", errorMessage } : job,
      ),
    })),
  removeJob: (jobId) =>
    set((state) => ({
      jobs: state.jobs.filter((job) => job.jobId !== jobId),
    })),
  reset: () => set({ jobs: [] }),
}));
