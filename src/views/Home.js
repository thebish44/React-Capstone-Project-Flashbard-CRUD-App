import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

function Home() {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        async function loadDecks() {
            try {
                const decks = await listDecks(new AbortController().signal);
                setDecks(decks);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        };
        loadDecks();
    }, []);

    const handleDelete = (deckId) => {
       if (window.confirm("Are you sure you want to delete this deck?")) {
            deleteDeck(deckId);
            setDecks(decks.filter((deck) => deck.id !== deckId))
       }
    }

    if (decks) {
        return (
            <div>
                <Link to="/decks/new"><button className="btn btn-secondary">+ Create Deck</button></Link>
                <ul className="list-unstyled">
                    {decks.map((deck, index) => (
                        <li key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">{deck.name}</h2>
                                    <span className="text-right">{deck.cards.length} cards</span>
                                    <p className="card-text">{deck.description}</p>
                                    <Link to={`/decks/${deck.id}`}><button className="btn btn-secondary">View</button></Link>
                                    <Link to={`/decks/${deck.id}/study`}><button className="btn btn-primary">Study</button></Link>
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(deck.id)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div>
            <Link to="/decks/new"><button type="button">+ Create Deck</button></Link>
            Loading...
        </div>
    );
}

export default Home;