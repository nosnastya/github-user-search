import React from "react";
import spinner from "./octocat-spinner-128.gif";

export const LoadingView: React.FC = () => {
    return (
        <div className="disp-flex flex-just--center flex-align--center page-height">
            <img src={spinner} alt="Github spinner"width="50" height="50"/>
        </div>
    );
};
