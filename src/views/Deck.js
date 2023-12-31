import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";
import NavigationBar from "../Layout/NavigationBar";

function Deck() {
    const history = useHistory();
    const {deckId} = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function loadDeck(){
            try {
                const response = await readDeck(deckId, new AbortController().signal);
                setDeck(response);
                setCards(response.cards);
            } catch (error) {
                if (error === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        loadDeck();
    }, []);

    const handleDeleteDeck = (deckId) => {
        if (window.confirm("Are you sure you want to delete this deck?")) {
            deleteDeck(deckId);
            setDeck({});
            history.push("/");
        }
    }
    
    const handleDeleteCard = (cardId) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            deleteCard(cardId);
            async function reload() {
                const response = await readDeck(deckId, new AbortController().signal);
                setDeck(response);
                setCards(response.cards);
            }
            reload();
        }
    }

    if (deck) {
        return (
            <div>
                <NavigationBar current={deck.name}/>
                <div>
                <h2>{deck.name}</h2>
                <p>{deck.description}</p>
                <Link to={`/decks/${deckId}/edit`}><button type="button" className="btn btn-secondary">Edit</button></Link>
                <Link to={`/decks/${deckId}/study`}><button type="button" className="btn btn-primary" onClick={() => {}}>Study</button></Link>
                <Link to={`/decks/${deckId}/cards/new`}><button type="button" className="btn btn-primary" onClick={() => {}}>+ Add Cards</button></Link>
                <button type="button" className="btn btn-danger" onClick={() => {handleDeleteDeck(deckId)}}>Delete</button>
                </div>
                <br/>
                <div>
                    <h2>Cards</h2>
                    <ul className="list-unstyled">
                        {
                            cards.map((card, index) => (
                                    <li key={index} className="card border-light">
                                        <div className="card-body">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col">
                                                        {card.front}
                                                    </div>
                                                    <div className="col">
                                                        {card.back}
                                                        <br/>
                                                        <Link to={`/decks/${deckId}/cards/${card.id}/edit`}><button type="button" className="btn btn-secondary">Edit</button></Link>
                                                        <button type="button" className="btn btn-danger" onClick={() => {handleDeleteCard(card.id)}}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
            </div>
        );      
    }

    return (
        <div>
            Loading...
        </div>
    );
}

export default Deck;