import React from "react"
import { Button, Card } from "react-bootstrap";

function MessageCard(props) {

    const dt = new Date(props.created);
    
    

    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {(props.poster === sessionStorage.getItem("username")) && (
            <>
            <Button variant= "danger" type="delete" onClick={() => props.delete(props.id)}>Delete</Button>
            </>
        )}
        {/* SORT OUT IF MESSAGE ATTACHED TO POSTER, MAKE A DELETE BUTTON */}
    </Card>
}

export default MessageCard;