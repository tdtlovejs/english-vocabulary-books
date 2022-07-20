import FrontCard from "./FrontCard";
import BackCard from "./BackCard";
import {useEffect, useRef, useState} from "react";
import "./../assets/css/Card.css"
import {AUDIO_PREFIX, VIEW_TYPE_KNOW} from "../constants/constants";
const Card = (props) => {
    const {
        vocabulary,
        onDontKnowVocabulary,
        onKnowVocabulary,
        viewType
    } = props;
    const cardRef = useRef(null);
    const [isFront, setIsFront] = useState(true);
    const [audioVocabulary, setAudioVocabulary] = useState( new Audio(AUDIO_PREFIX + vocabulary + "_1_word_.mp3"));
    useEffect(() => {
        audioVocabulary.play()
    }, [])
    const toggleFlipper = () => {
        audioVocabulary.pause();
        audioVocabulary.currentTime = 0;
        audioVocabulary.play()
        setIsFront(prev => {
            return !prev;
        })
    }

    useEffect(() => {
        return () => {
            audioVocabulary.pause();
            audioVocabulary.currentTime = 0;
        }
    }, [])

    const btnOnDontKnowVocabulary = (event) => {
        cardRef.current.classList.add('Pass');
        cardRef.current.style.transition ='all .5s';
        cardRef.current.style.opacity = '0';
        cardRef.current.style.marginRight = '200px';
        cardRef.current.style.transform = 'rotate(-20deg)';

        cardRef.current.style.transition ='all .5s';
        cardRef.current.style.opacity = 0;
        setTimeout(() => {
            onDontKnowVocabulary();
        }, 500);
    }

    const btnOnKnowVocabulary = (event) => {
        cardRef.current.classList.add('Buy');
        cardRef.current.style.transition ='all .5s';
        cardRef.current.style.opacity = '0';
        cardRef.current.style.marginLeft = '200px';
        cardRef.current.style.transform = 'rotate(20deg)';

        cardRef.current.style.transition ='all .5s';
        cardRef.current.style.opacity = 0;
        setTimeout(() => {
            onKnowVocabulary();
        }, 500);
    }

    return (
        <div
            ref={cardRef}
            className={"Card_cardWrapper" + (!isFront ? " flipped" : "")}
        >
            <div className={"stamp" + (viewType === VIEW_TYPE_KNOW ? " isKnow" : " isDontKnow")}>{viewType === VIEW_TYPE_KNOW ? "KNOW" : "DON'T KNOW"}</div>
            <div
                className={"Card_viewCardFlipper"}
                onClick={() => toggleFlipper()}
            >
                <div className="Card_cardFront">
                    <FrontCard vocabulary={vocabulary}/>
                </div>
                <div className="Card_cardBack">
                    <BackCard vocabulary={vocabulary} viewType={viewType}/>
                </div>
            </div>
            <div className="Card_action">
                <div
                    onClick={btnOnDontKnowVocabulary}
                    className="Card_btnDontKnow"
                >
                    Don't Know
                </div>
                <div
                    onClick={btnOnKnowVocabulary}
                    className="Card_btnKnow"
                >
                    Know
                </div>
            </div>
        </div>
    )
}

export default Card;