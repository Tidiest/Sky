import { useState } from 'react'
import "../styles/Book.css"

type BookProps =
{
    title: string;
    author: string;
    read: boolean;
    onMarkAsRead?: ()=>void;
}

export function Book(props:BookProps)
{
    return (
        <article>
            <h2>{props.title}</h2>
            <p>by {props.author}</p>
            <p className={props.read ? "read" : "unread"}>
                {props.read ? "Read" : "Unread"}
            </p>
            <button onClick={props.onMarkAsRead}>
                {props.read ? 'Mark as Unread' : 'Mark as Read'}
            </button>
        </article>
    )
}