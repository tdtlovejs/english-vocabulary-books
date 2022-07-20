import {useEffect, useState} from "react";
import axios from "axios";
import {
    ENGLISH_VOCABULARY_BOOK,
    ENGLISH_VOCABULARY_BOOKS_KNOW_VOCABULARY,
    VIEW_TYPE_DONT_KNOW, VIEW_TYPE_KNOW
} from "../constants/constants";
import Card from "./Card";
import {BulbOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import "./../assets/css/BookContent.css"
const BookContent = (props) => {
    const {
        bookData
    } = props;
    const [indexVocabulary, setIndexVocabulary] = useState(null);
    const [listVocabulary, setListVocabulary] = useState([]);
    const [listIndex, setListIndex] = useState([]);
    const [listKnowIndex, setListKnowIndex] = useState([]);
    const [refreshVocabulary, setRefreshVocabulary] = useState(false);
    const [viewType, setViewType] = useState(VIEW_TYPE_DONT_KNOW);
    const [initial, setInitial] = useState(false);

    useEffect(() => {
        const dataKnowIndex = localStorage.getItem(ENGLISH_VOCABULARY_BOOKS_KNOW_VOCABULARY+"_"+bookData.code);
        const dataKnowIndexInitial = JSON.parse(dataKnowIndex);
        const dataInitial = Array.isArray(dataKnowIndexInitial) ? dataKnowIndexInitial : []
        setListKnowIndex(dataInitial);
        axios.get(ENGLISH_VOCABULARY_BOOK + bookData.code + ".json")
            .then(res => {
                setInitial(true);
                setListVocabulary(res.data);
                const listIndex = res.data.map((item, index) => index);
                setListIndex(listIndex)
                const listIndexOfType = viewType === VIEW_TYPE_KNOW ? dataInitial : listIndex.filter(item => !dataInitial.includes(item));
                const indexVocabulary = Math.floor(Math.random() * listIndexOfType.length);
                setIndexVocabulary(listIndexOfType[indexVocabulary]);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        if (refreshVocabulary) {
            setRefreshVocabulary(false)
        }
    }, [refreshVocabulary])
    const onRefreshVocabulary = (viewTypeSelected) => {
        setIndexVocabulary(prev => {
            const isTypeKnow = viewTypeSelected !== undefined ? viewTypeSelected === VIEW_TYPE_KNOW : viewType === VIEW_TYPE_KNOW;
            const listIndexOfType = isTypeKnow ? listKnowIndex : listIndex.filter(item => !listKnowIndex.includes(item));
            while (1) {
                const indexVocabularyRandom = Math.floor(Math.random() * listIndexOfType.length);
                if (listIndexOfType.length <= 1 || listIndexOfType[indexVocabularyRandom] !== prev) {
                    setRefreshVocabulary(true);
                    return listIndexOfType[indexVocabularyRandom];
                }
            }
        })
    }



    const onKnowVocabulary = () => {
        if (!listKnowIndex.includes(indexVocabulary)) {
            setListKnowIndex(prev => prev.concat(indexVocabulary))
        } else {
            onRefreshVocabulary();
        }
    }
    const onDontKnowVocabulary = () => {
        if (listKnowIndex.includes(indexVocabulary)) {
            setListKnowIndex(prev => prev.filter(indexA => indexA !== indexVocabulary))
        } else {
            onRefreshVocabulary();
        }
    }
    //
    useEffect(() => {
        if (initial) {
            onRefreshVocabulary();
            localStorage.setItem(ENGLISH_VOCABULARY_BOOKS_KNOW_VOCABULARY+"_"+bookData.code, JSON.stringify(listKnowIndex))
        }
    }, [listKnowIndex])
    //
    const onChangeViewType = (viewTypeSelected) => {
        onRefreshVocabulary(viewTypeSelected);
        setViewType(viewTypeSelected);
    }
    return (
        <div className="BookContent_wrapper">
            <div className="BookContent_header">
                <div className={"BookContent_filterDontKnow" + (viewType === VIEW_TYPE_DONT_KNOW ? " active" : "")} onClick={() => {
                    if (viewType === VIEW_TYPE_KNOW) {
                        onChangeViewType(VIEW_TYPE_DONT_KNOW)
                    }
                }}>
                    <div className="count">{(listIndex.length - listKnowIndex.length < 0) ? '' : listIndex.length - listKnowIndex.length}</div>
                    <QuestionCircleOutlined />
                </div>
                <div className={"BookContent_filterKnow" + (viewType === VIEW_TYPE_KNOW ? " active" : "")} onClick={() => {
                    if (viewType === VIEW_TYPE_DONT_KNOW) {
                        onChangeViewType(VIEW_TYPE_KNOW)
                    }
                }}>
                    <div className="count">{listKnowIndex.length}</div>
                    <BulbOutlined />
                </div>
            </div>
            {
                (indexVocabulary !== null && listVocabulary.length > 0 && !refreshVocabulary) && listVocabulary[indexVocabulary] ? <Card
                    vocabulary={listVocabulary[indexVocabulary]}
                    onRefreshVocabulary={onRefreshVocabulary}
                    onDontKnowVocabulary={onDontKnowVocabulary}
                    onKnowVocabulary={onKnowVocabulary}
                    viewType={viewType}
                /> : <></>
            }
        </div>
    )
}

export default BookContent;