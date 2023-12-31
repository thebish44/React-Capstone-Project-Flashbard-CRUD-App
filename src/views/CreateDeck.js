import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import NavigationBar from "../Layout/NavigationBar";

function CreateDeck() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleChange = ({target}) => {
        if (target.name === "name") {
            setName(target.value);
        } else if (target.name === "description") {
            setDescription(target.value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newDeck = await createDeck({
            name,
            description,
        });
        history.push(`/decks/${newDeck.id}`)
        setName("");
        setDescription("");
    };

    return (
        <div>
            <NavigationBar current="Create Deck"/>
            <h2>Create Deck</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">
                        Name:
                        <input id="name" name="name" type="text" placeholder="Deck Name" className="form-control" onChange={handleChange} value={name}/>
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="description">
                        Description:
                        <textarea id="description" name="description" type="textbox" placeholder="Description" className="form-control" onChange={handleChange} value={description}/>
                    </label>
                </div>
                <button className="btn btn-secondary" onClick={() => history.push("/")}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default CreateDeck;