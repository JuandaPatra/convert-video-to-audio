import { create } from "zustand";

export type UploadStatus = "uploading" | "processing" | "completed" | "error";

export interface UploadJob {
  jobId: string;
  file: File;
  fileName: string;
  status: UploadStatus;
  progress: number; // 0 to 100
  errorMessage?: string; // present if status is "error"
}

interface UploadStore {
  jobs: UploadJob[];

  addJob: (job: UploadJob) => void;

  updateProgress: (jobId: string, progress: number) => void;

  setStatus: (
    jobId: string,
    status: UploadStatus,
    errorMessage?: string,
  ) => void;

  setError: (jobId: string, errorMessage: string) => void;

  removeJob: (jobId: string) => void;

  reset: () => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  jobs: [],

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
  setStatus: (jobId, status, errorMessage) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.jobId === jobId ? { ...job, status, errorMessage } : job,
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
