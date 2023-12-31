import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck, updateDeck } from "../utils/api";
import NavigationBar from "../Layout/NavigationBar";

function EditDeck() {
    const history = useHistory();
    const {deckId} = useParams();
    const [deck, setDeck] = useState({
        name: "",
        description: "",
    });

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
        if (target.name === "name") {
            setDeck({...deck, name: target.value});
        } else if (target.name === "description") {
            setDeck({...deck, description: target.value});
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedDeck = await updateDeck(deck);
        setDeck(updatedDeck);
        history.push(`/decks/${deckId}`)
    };
    
    return (
        <div>
            <NavigationBar tabText={deck.name} tabUrl={`/decks/${deckId}`} current="Edit Deck"/>
            <h2>Edit Deck</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">
                        Name:
                        <input id="name" name="name" type="text" className="form-control" onChange={handleChange} value={deck.name}/>
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="description">
                        Description:
                        <textarea id="description" name="description" type="textbox" className="form-control" onChange={handleChange} value={deck.description}/>
                    </label>
                </div>
                <button className="btn btn-secondary" onClick={() => {history.push(`/decks/${deckId}`)}}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
    
}

export default EditDeck;