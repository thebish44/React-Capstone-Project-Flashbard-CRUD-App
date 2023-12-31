import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function CardForm({deckId, front, back, handleChange, handleSubmit}) {
    const history = useHistory();

    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="front">
          Front:
          <br/>
          <textarea type="textbox" id="front" name="front" className="form-control" onChange={handleChange} value={front}/>
        </label>
        <br/>
        <label htmlFor="back">
          Back:
          <br/>
          <textarea  id="back"  type="textbox"  name="back" className="form-control" onChange={handleChange} value={back}/>
        </label>
        <br/>
        <button type="Done" className="btn btn-secondary" onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
        <button type="Submit" className="btn btn-primary">Save</button>
      </form>
    );
}

export default CardForm;