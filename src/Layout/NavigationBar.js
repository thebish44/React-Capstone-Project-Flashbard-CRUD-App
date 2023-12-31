import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function NavigationBar({tabText, tabUrl, current}) {
    const { url } = useRouteMatch();
    return (
        <nav>
            <Link to="/">Home </Link>
            /
            {(tabText && tabUrl) && (
                <>
                <Link to={tabUrl}> {tabText} </Link>
                /
                </>
            )}
            <Link to={url}> {current} </Link>
        </nav>
    );
}

export default NavigationBar;