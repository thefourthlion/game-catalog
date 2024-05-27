import React, { useState, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import GameLine from "../components/GameLine";
import Axios from "axios";
import { useSearchParams } from 'react-router-dom';

const Console = () => {
    const [games, setGames] = useState([]);
    const [searchParams] = useSearchParams();

    const id = (searchParams.get('id'));
    const [limit, setLimit] = useState(50);
    const [letter, setLetter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [hideSearch, setHideSearch] = useState(false);
    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchQuery(value);

        if (value === "") {
            setFilteredData(games);
        } else {
            const filtered = games.filter((item) => {
                return item.title.toLowerCase().includes(value.toLowerCase());
            });
            setFilteredData(filtered);
        }
    };

    const getMoreGames = () => {
        setLimit(limit + 150, () => {
            getGames();
        });
    };

    const getGames = async () => {
        try {
            console.log(id)
            const response = await Axios.get(
                `https://api.thebombroms.com/api/games/read/console/${id}/${letter}?limit=${limit}`
            );
            const data = response.data;
            setFilteredData(data);
            setGames(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLetterClick = (selectedLetter) => {
        setSearchQuery("");
        setHideSearch(true); // Reset the search query
        setLetter(selectedLetter, () => {
            getGames();
        });
    };

    console.log(filteredData);

    useEffect(() => {
        console.log(searchParams)
        if (!id) {
            return;
        }
        getGames();
    }, [id, letter, limit]);

    return (
        <div className="ConsoleGames page">
            <div className="letter-container">
                <p
                    onClick={() => {
                        handleLetterClick("#");
                    }}
                >
                    #
                </p>
                <p onClick={() => handleLetterClick("A")}>A</p>
                <p
                    onClick={() => {
                        handleLetterClick("B");
                    }}
                >
                    B
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("C");
                    }}
                >
                    C
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("D");
                    }}
                >
                    D
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("E");
                    }}
                >
                    E
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("F");
                    }}
                >
                    F
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("G");
                    }}
                >
                    G
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("H");
                    }}
                >
                    H
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("I");
                    }}
                >
                    I
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("J");
                    }}
                >
                    J
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("K");
                    }}
                >
                    K
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("L");
                    }}
                >
                    L
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("M");
                    }}
                >
                    M
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("N");
                    }}
                >
                    N
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("O");
                    }}
                >
                    O
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("P");
                    }}
                >
                    P
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("Q");
                    }}
                >
                    Q
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("R");
                    }}
                >
                    R
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("S");
                    }}
                >
                    S
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("T");
                    }}
                >
                    T
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("U");
                    }}
                >
                    U
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("V");
                    }}
                >
                    V
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("W");
                    }}
                >
                    W
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("X");
                    }}
                >
                    X
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("Y");
                    }}
                >
                    Y
                </p>
                <p
                    onClick={() => {
                        handleLetterClick("Z");
                    }}
                >
                    Z
                </p>
            </div>

            {hideSearch && (
                <FloatingLabel
                    className="search-input-label form-label"
                    label="Search Games"
                >
                    <Form.Control
                        className="search-input-form-control form-input"
                        type="text"
                        placeholder="Search Games"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </FloatingLabel>
            )}

            <div className="container">
                {filteredData.length === 0 && searchQuery == "" ? (
                    <h1 className="loading-header">Loading...</h1>
                ) : (
                    <div>
                        {filteredData.map((item, key) => {
                            if (item.downloadSize !== "0 KB") {
                                return (
                                    <GameLine
                                        key={key}
                                        num={key + 1}
                                        gameId={item._id}
                                        console={item.console}
                                        title={item.title}
                                        size={item.downloadSize}
                                        downloadLink={item.downloadLink}
                                    />
                                );
                            } else {
                                return null; // Exclude items with size 0
                            }
                        })}

                        {filteredData.length === 0 && searchQuery != "" ? (
                            <h1 className="no-games-found">No Games Found</h1>
                        ) : (
                            <div className="btn-container">
                                <button
                                    className="secondary-btn view-more-btn"
                                    onClick={() => {
                                        getMoreGames();
                                    }}
                                >
                                    View More
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Console;
