import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "NowChatApp",
  description = "this is the chat app called NowChatApp",
}) => {
  return(
    <Helmet>
      <title>{title}</title>
      <meta name="de scription" content={description} />
    </Helmet>
    );
};

export default Title;
