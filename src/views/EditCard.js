import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";
import NavigationBar from "../Layout/NavigationBar";

function EditCard() {
    const history = useHistory();
    const {deckId, cardId} = useParams();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});

    useEffect(() => {
        async function loadCard(){
            try {
                setDeck(await readDeck(deckId, new AbortController().signal))
                setCard(await readCard(cardId, new AbortController().signal));
            } catch (error) {
                if (error === "AbortError") {
                    console.log("Aborted");
                } else {
                    throw error;
                }
            }
        }
        loadCard();
    }, []);

    const handleChange = ({target}) => {
        if (target.name === "front") {
            setCard({...card, front: target.value})
        } else if (target.name === "back") {
            setCard({...card, back: target.value})
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateCard(card);
        history.push(`/decks/${deckId}`);
    };

    return (
        <div>
            <NavigationBar tabText={"Deck " + deck.name} tabUrl={`/decks/${deckId}`} current={"Edit " + card.id}/>
            <h2>
                Edit Card
            </h2>
            {
                <CardForm deckId={deckId} front={card.front} back={card.back} handleChange={handleChange} handleSubmit={handleSubmit}/>
            }
        </div>
    );
}

export default EditCard;