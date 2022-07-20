import "./../assets/css/BackCard.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_DATA_WORD, AUDIO_PREFIX, VIEW_TYPE_DONT_KNOW, VIEW_TYPE_KNOW} from "../constants/constants";
import AudioPlay from "./AudioPlay";
import {Popover} from "antd";
import {CloseCircleOutlined, EllipsisOutlined} from "@ant-design/icons";
const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);
const BackCard = (props) => {
    const {
        vocabulary,
        viewType
    } = props;
    const [listType, setListType] = useState([]);
    const [currentLinkPlay, setCurrentLinkPlay] = useState(null);
    const [currentIndexExpandExample, setCurrentIndexExpandExample] = useState(null);
    useEffect(() => {
        axios.get(API_DATA_WORD + vocabulary + ".json")
            .then(res => {
                setListType(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const changeCurrentLinkPlay = (audioLink) => {
        setCurrentLinkPlay(audioLink);
    }
    const handleClickChange = (index, visible) => {
        if (visible) {
            setCurrentIndexExpandExample(index)
        } else {
            setCurrentIndexExpandExample(null);
        }
    }
    console.log(viewType)
    return (
        <div className="BackCard_wrapper">
            {
                listType.map((type, index) => {
                    return (
                        <div className={"BackCard_typeItem" + (viewType === VIEW_TYPE_DONT_KNOW ? " BackCard_typeItemDontKnow" : "")}>
                           <div>
                               <AudioPlay
                                   currentLinkPlay={currentLinkPlay}
                                   changeCurrentLinkPlay={changeCurrentLinkPlay}
                                   className="BackCard_wordType"
                                   audioLink={AUDIO_PREFIX + vocabulary + "_"+(index+1)+"_word_.mp3"}
                               >
                                   <div>
                                       {type.type}
                                   </div>
                                   <div>
                                       {vocabulary}
                                   </div>
                               </AudioPlay>
                               <AudioPlay
                                   currentLinkPlay={currentLinkPlay}
                                   changeCurrentLinkPlay={changeCurrentLinkPlay}
                                   className="BackCard_wordMean"
                                   audioLink={AUDIO_PREFIX + vocabulary + "_"+(index+1)+"_mean_.mp3"}
                               >
                                   <div>
                                       {type.mean}
                                   </div>
                               </AudioPlay>
                           </div>
                            <div className="BackCard_expandExample" onClick={(event) => {
                                handleClickChange(index, true);
                                event.stopPropagation();
                            }}>
                                <EllipsisOutlined />
                            </div>
                        </div>
                    )
                })
            }
            {currentIndexExpandExample !== null && <Popover
                content={<div className="BackCard_popoverContent" onClick={(event) => {
                    event.stopPropagation()
                }}>
                    <div className="BackCard_popoverClose" onClick={() => {
                        setCurrentIndexExpandExample(null)
                    }}>
                        <CloseCircleOutlined />
                    </div>
                    <div className="BackCard_popoverTitle">
                        List Examples
                    </div>
                    <div className="BackCard_popoverListExample">
                        {
                            listType[currentIndexExpandExample].examples.map((example) => {
                                return (
                                    <AudioPlay
                                        currentLinkPlay={currentLinkPlay}
                                        changeCurrentLinkPlay={changeCurrentLinkPlay}
                                        className="BackCard_example"
                                        audioLink={AUDIO_PREFIX + example.code+".mp3"}
                                    >
                                        <div className="BackCard_textExample">
                                            {example.text}
                                        </div>
                                    </AudioPlay>
                                )
                            })
                        }
                    </div>

                </div>}
                // title="Title"
                trigger="click"
                visible={true}
                className="BackCard_popoverExample"
                onVisibleChange={(visible) => handleClickChange(currentIndexExpandExample, visible)}
            >
                <div>
                    <div className="BackCard_popoverView">

                    </div>
                </div>
            </Popover>}
        </div>
    )
}

export default BackCard;