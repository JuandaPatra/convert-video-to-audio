export type UploadJob = {
  jobId: string
  fileName: string
  progress: number
  status: "uploading" | "processing" | "done" | "error"
}