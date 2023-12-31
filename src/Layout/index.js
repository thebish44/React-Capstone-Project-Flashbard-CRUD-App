import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "../views/Home";
import NotFound from "./NotFound";
import Study from "../views/Study";
import CreateDeck from "../views/CreateDeck";
import Deck from "../views/Deck";
import EditDeck from "../views/EditDeck";
import AddCard from "../views/AddCard";
import EditCard from "../views/EditCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
