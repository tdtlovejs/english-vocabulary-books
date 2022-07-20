import {useEffect, useState} from "react";
import {SoundOutlined} from "@ant-design/icons";

const AudioPlay = (props) => {
    const {
        children,
        audioLink,
        className,
        currentLinkPlay,
        changeCurrentLinkPlay,
    } = props;
    const [audioPlay, setAudioPlay] = useState(new Audio(audioLink));
    const [stopPlay, setStopPlay] = useState(true);
    useEffect(() => {
        if (currentLinkPlay !== audioLink) {
            if (
                audioPlay.currentTime > 0
                && !audioPlay.paused
                && !audioPlay.ended
            ) {
                setStopPlay(true);
                audioPlay.pause();
                audioPlay.currentTime = 0;
            }
        }
    }, [currentLinkPlay])
    useEffect(() => {
        return () => {
            if (
                audioPlay.currentTime > 0
                && !audioPlay.paused
                && !audioPlay.ended
            ) {
                setStopPlay(true);
                audioPlay.pause();
                audioPlay.currentTime = 0;
            }
        }
    }, [])
    return (
        <div className={"AudioPlay_wrapper " + (className ?? "")} onClick={(event) => {
            changeCurrentLinkPlay(audioLink);
            audioPlay.play();
            setStopPlay(false);
            event.stopPropagation();
            setTimeout(() => {
                setStopPlay(true);
            }, audioPlay.duration*1000)
        }}>
            {children}
            {!stopPlay && <div className="soundPlay">
                <SoundOutlined />
            </div>}
        </div>
    )
}

export default AudioPlay;