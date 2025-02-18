import { useEffect, useState } from "react";
import axios from "axios";

export function TestDjango() {
    const [message, setMessage] = useState("");

    useEffect(() => {
      axios.get("http://127.0.0.1:8000/api/hello/")
        .then(response => setMessage(response.data.message))
        .catch(error => console.error("Erreur API:", error));
    }, []);
  
    return (
      <div>
        <h1>React + Django</h1>
        <p>Message du backend : {message}</p>
      </div>
    );
}
