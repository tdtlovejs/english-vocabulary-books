import {useEffect, useState} from "react";
import BookContent from "./components/BookContent";
import "./assets/css/App.css"
import {ArrowLeftOutlined} from "@ant-design/icons";
import 'antd/dist/antd.css';

const listBooks = [
    {
        code: 'book_1',
        name: 'Book 1',
        description: `1<sup>st</sup> - 200<sup>th</sup> most frequently words`
    },
    {
        code: 'book_2',
        name: 'Book 2',
        description: `201<sup>st</sup> - 400<sup>th</sup> most frequently words`
    },
    {
        code: 'book_3',
        name: 'Book 3',
        description: `401<sup>st</sup> - 600<sup>th</sup> most frequently words`
    },
    {
        code: 'book_4',
        name: 'Book 4',
        description: `601<sup>st</sup> - 800<sup>th</sup> most frequently words`
    },
    {
        code: 'book_5',
        name: 'Book 5',
        description: `801<sup>st</sup> - 1000<sup>th</sup> most frequently words`
    },
    {
        code: 'book_6',
        name: 'Book 6',
        description: `1001<sup>st</sup> - 1200<sup>th</sup> most frequently words`
    },
    {
        code: 'book_7',
        name: 'Book 7',
        description: `1201<sup>st</sup> - 1400<sup>th</sup> most frequently words`
    },
    {
        code: 'book_8',
        name: 'Book 8',
        description: `1401<sup>st</sup> - 1600<sup>th</sup> most frequently words`
    },
    {
        code: 'book_9',
        name: 'Book 9',
        description: `1601<sup>st</sup> - 1800<sup>th</sup> most frequently words`
    },
    {
        code: 'book_10',
        name: 'Book 10',
        description: `1801<sup>st</sup> - 2000<sup>th</sup> most frequently words`
    },
    {
        code: 'book_11',
        name: 'Book 11',
        description: `2001<sup>st</sup> - 2048<sup>th</sup> most frequently words`
    }
];
function App() {
    const [selected, setSelected] = useState(0);
    const [currentBook, setCurrentBook] = useState(null);
    const [refreshBook, setRefreshBook] = useState(false);

    useEffect(() => {
        if (refreshBook) {
            setRefreshBook(false);
        }
    }, [refreshBook])
    return (
        <div className="App_wrapper">
            <div className="App_header">
                English Vocabulary Books
            </div>
            {
                currentBook === null
                ?
                    <>
                        <div className="App_bookCarousel">
                            {
                                listBooks.map((book, index) => {
                                    const absIndex = index - selected;

                                    let className = "";
                                    switch (absIndex) {
                                        case -2:
                                            className = "App_bookPrevLeftSecond";
                                            break;
                                        case -1:
                                            className = "App_bookPrev";
                                            break;
                                        case 0:
                                            className = "App_bookSelected";
                                            break;
                                        case 1:
                                            className = "App_bookNext";
                                            break;
                                        case 2:
                                            className = "App_bookNextRightSecond";
                                            break;
                                        default:
                                            if (absIndex < -2) {
                                                className = "App_bookHideLeft";
                                            } else {
                                                className = "App_bookHideRight";
                                            }
                                            break;
                                    }
                                    return (
                                        <div
                                            className={className}
                                            onClick={() => {
                                                setSelected(index);
                                            }}
                                        >
                                            <div className="App_bookItemWrapper">
                                                <div className="App_nameCurrentBook">
                                                    {book.name}
                                                </div>
                                                <div dangerouslySetInnerHTML={{ __html: book.description }} className="App_descriptionCurrentBook">

                                                </div>
                                                {absIndex === 0 && <div
                                                    className="App_btnCurrentBook"
                                                    onClick={() => {
                                                        setCurrentBook(index);
                                                    }}
                                                >
                                                    Learn
                                                </div>}
                                            </div>

                                        </div>
                                    )}
                                )
                            }
                        </div>
                        <div className="App_action">
                            {selected === 0 ? <div></div> : <div className="App_actionPrev" onClick={() => {
                                setSelected( prev => {
                                    return prev - 1;
                                })
                            }}>
                                Prev
                            </div>}
                            {selected === listBooks.length - 1 ? <div></div> : <div className="App_actionNext" onClick={() => {
                                setSelected( prev => {
                                    return prev + 1;
                                })
                            }}>
                                Next
                            </div>}
                        </div>
                    </>
                    :
                    <>
                        <div className="App_bookHeader">
                            <div className="App_bookBack" onClick={() => {
                                setCurrentBook(null);
                            }}>
                                <ArrowLeftOutlined />
                                <div>Back</div>
                            </div>
                            <div className="App_bookTitle">
                                <div>{listBooks[currentBook].name}</div>
                                <div dangerouslySetInnerHTML={{__html: listBooks[currentBook].description}} className="App_titleDescription" />
                            </div>
                        </div>
                        <div className="App_bookContent">
                            {<BookContent bookData={listBooks[currentBook]}/>}
                        </div>
                    </>
            }
        </div>
    );
}

export default App;
