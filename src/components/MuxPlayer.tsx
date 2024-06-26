import MuxPlayer, { MuxPlayerProps } from "@mux/mux-player-react";

interface IMuxPlayerProps extends MuxPlayerProps {

}

export function MuxPlayerInternal({ ...rest }: IMuxPlayerProps) {
    return (
        <MuxPlayer 
            // playbackId="fVS5VETZ9gkWcqGpgNlwFhPs8g7dYM019cc3WvL5srbY"
            // envKey=""
            metadata={{
                video_id: "",
                video_title: "Título da trilha",
            }}

            {...rest}
        />
    )
}