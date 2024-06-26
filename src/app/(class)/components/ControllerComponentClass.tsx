import { MuxPlayerInternal } from "@/components/MuxPlayer";

interface ControllerComponentClassProps {
    type: "video" | "archive" | "none" | "empty" | "image" | "audio";
    currentClass: any;
}

export function ControllerComponentClass({ type, currentClass }: ControllerComponentClassProps) {
    console.log(currentClass.content)
    const Component = {
        "video": <MuxPlayerInternal playbackId="fVS5VETZ9gkWcqGpgNlwFhPs8g7dYM019cc3WvL5srbY" />,
        "archive": (
            <>
                {/* { currentClass.content.archiveExtension == "pdf" ? (
                    <iframe width={320} height={420} className="container mt-2" src={currentClass.content.key}></iframe>
                ) : <></> } */}
            </>
        ),
        "image": <img width={320} height={320} src={currentClass.content.key} className="object-cover rounded-md" />,
        "audio": <audio src={currentClass.content.key} controls />,
        "none": <></>,
        "empty": <></>
    }

    return Component[type];
}