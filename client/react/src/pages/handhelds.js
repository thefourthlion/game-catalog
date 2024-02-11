import React from "react";
const Handhelds = () => {
    const handheldOption = [
        "Game Boy",
        "Virtual Boy",
        "Game Boy Color",
        "Game Boy Advance",
        "Nintendo DS",
        "PSP",
    ];
    return (
        <div className="Handhelds">
            <div className="container page">
                {handheldOption.map((val, index) => (
                    <a href={`/console/${val}`}>
                        <h1 className="consoles" key={index}>
                            {val}
                        </h1>
                    </a>
                ))}
            </div>
        </div>
    );
};
export default Handhelds;
