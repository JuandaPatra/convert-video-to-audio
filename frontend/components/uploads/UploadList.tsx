"use client";
import { useUploadStore} from "@/store/uploadStore"
import UploadItem from "./UploadItem";
export default function UploadList() {

    const listItem = useUploadStore((state) => state.jobs)
    return (
        <div className="upload-list">
            {listItem.map((item, index) => (
                <UploadItem key={item.clientId} fileName={item.fileName} clientId={item.clientId} />
            ))}
        </div>
    );
}