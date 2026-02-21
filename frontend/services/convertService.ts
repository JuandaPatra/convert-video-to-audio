import axios from "@/lib/axios";

export interface UploadResponse {
  jobId: string;
}

export interface UploadProgressResponse {
  jobId: string;
  progress: number;
}

export async function uploadVideo(file: File): Promise<string> {
  const formData = new FormData();

  formData.append("video", file);
  try {
    const response = await axios.post<UploadResponse>("/convert", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.jobId;
  } catch (error) {
    console.error("Upload failed", error);
    throw error;
  }
}

export async function getProgress(jobId: string): Promise<number> {
  try {
    const response = await axios.get<UploadProgressResponse>(
      `convert/progress/${jobId}`,
    );
    return response.data.progress;
  } catch (error) {
    console.error("Failed to get progress", error);
    throw error;
  }
}

export async function downloadAudio(jobId: string): Promise<void> {
  try {
    const response = await axios.get(`convert/download/${jobId}`, {
      responseType: "blob",
    });
    const blob = response.data;

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `${jobId}.mp3`;

    document.body.appendChild(a);

    a.click();

    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download audio", error);
    throw error;
  }
}
