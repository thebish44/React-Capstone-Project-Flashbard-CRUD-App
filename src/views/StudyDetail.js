import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function StudyDetail({cards}) {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const history = useHistory();

    const handleFlip = () => {
        setFlipped(!flipped);
    }

    const handleNext = () => {
        if (currentCardIndex === (cards.length - 1)){
            if (window.confirm("Restart cards?")) {
                setFlipped(false);
                setCurrentCardIndex(0);
            } else {
                history.push("/");
            }
        } else {
            setCurrentCardIndex(currentCardIndex + 1);
            setFlipped(false);
        }
    }

    return(
        <div className="card">
            <div className="card-body">
                <h2>Card {currentCardIndex + 1} of {cards.length}</h2>
                {!flipped ? (
                    <div>
                        <p>{cards[currentCardIndex].front}</p>
                        <button type="button" className="btn btn-secondary" onClick={() => handleFlip()}>Flip</button>
                    </div>
                    ) : (
                    <div>
                        <p>{cards[currentCardIndex].back}</p>
                        <button type="button" className="btn btn-secondary" onClick={() => handleFlip()}>Flip</button>
                        <button type="button"className="btn btn-primary" onClick={() => handleNext()}>Next</button>
                    </div>
                    )
                }
            </div>
        </div>
    );
}

export default StudyDetail;