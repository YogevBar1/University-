import React from "react";
import "./PageNotFound.css";
import imgSrc from "../../../Assets/Images/404img.jpg";

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <h1>404 Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/">Go back to homepage</a>
            <br /><br />


            <iframe
                width="500"
                height="350"
                src="https://www.youtube.com/embed/t3otBjVZzT0"
                title="Something Went Terribly Wrong"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            >
            </iframe>
        </div>
    );
}

export default PageNotFound;
