import React, {useEffect, useState} from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyDetail from "./StudyDetail";
import NavigationBar from "../Layout/NavigationBar";

function Study() {
    const { deckId } = useParams();
    const { url } = useRouteMatch();
    const [deck, setDeck] = useState([]);

    useEffect(() => {
        async function loadDeck() {
            try {
                const deck = await readDeck(deckId, new AbortController().signal);
                setDeck(deck);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        };
        loadDeck();
    }, []);

    if (!deck.cards) {
        return(
            <p>Loading...</p>
        )
    }

    return (
        <div>
            <NavigationBar tabText={deck.name} tabUrl={`/decks/${deckId}`} current="Study" />
            <section>
                <h2>Study: {deck.name}</h2>
                {deck.cards.length < 3 ? 
                    (
                        <div className="card">
                            <div className="card-body">
                                <h2>Not enough cards</h2>
                                <p>You need at least 3 cards to study. There are only {deck.cards.length} in this deck.</p>
                                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">+ Add Cards</Link>
                            </div>
                        </div>
                    ) 
                    : (<StudyDetail cards={deck.cards}/>)
                }
            </section>
        </div>
    );
}

export default Study;