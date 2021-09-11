import React from "react";
import { Route, Redirect } from "react-router-dom";
import Gallery from "./Gallery";
import Categories from "./Categories";

export default function Routes() {
    return (
        <div className="content">
            <Route path="/" exact render={() => <Redirect to="/gallery" />} />
            <Route path="/categories/" component={Categories} />
            <Route path="/gallery/" component={Gallery} />
        </div>
    );
}
