import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { findMapping, recordClick } from "../utils/urlHelpers";

const RedirectPage = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const mapping = findMapping(shortcode);

    if (!mapping) {
      alert("Invalid shortcode");
      window.location.href = "/";
      return;
    }

    if (Date.now() > mapping.expiry) {
      alert("This link has expired");
      window.location.href = "/";
      return;
    }

    recordClick(shortcode);
    window.location.href = mapping.longUrl;
  }, [shortcode]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
