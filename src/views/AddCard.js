import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";
import NavigationBar from "../Layout/NavigationBar";

function AddCard() {
    const history = useHistory();
    const {deckId} = useParams();
    const [deck, setDeck] = useState({
        name: "",
        description: "",
    });
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    useEffect(() => {
        async function loadDeck(){
            try {
                setDeck(await readDeck(deckId, new AbortController().signal));
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

    const handleChange = ({target}) => {
        if (target.name === "front") {
            setFront(target.value);
        } else if (target.name === "back") {
            setBack(target.value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createCard(deckId, {front,  back,});
        setFront("");
        setBack("");
    };

    return (
        <div>
            <NavigationBar tabText={deck.name} tabUrl={`/decks/${deckId}`} current="Add Card"/>
            <h2>{deck.name}: Add Card</h2>
            <CardForm deckId={deckId} front={front} back={back} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    );
}

export default AddCard;