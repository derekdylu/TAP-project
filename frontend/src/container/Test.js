// This page is mainly for testing backend API

import React, { Component, useState, useEffect }  from 'react';
import { getComments, createComment, getCuisines, getCuisineById, getGames, getGameById, createGame, deleteGameById } from "../utils/axios";

const Test = () => {
    // --- Comment
    const [comments, setComments] = useState({});

    const handleGetComments = async () => {
        const tmp =  await getComments();
        setComments(tmp);
        console.log(tmp);
    }

    const [nickname, setNickname] = useState("grc");
    const [profilePhoto, setProfilePhoto] = useState(":)");
    const [content, setContent] = useState("hello from react");
    const [score, setScore] = useState(88);

    const handleCreateComment = async (event) => {
        event.preventDefault();
        console.log(nickname, profilePhoto, content, score);
        const res = createComment(nickname, profilePhoto, content, score);
        console.log(res);
    }

    // --- Cuisine
    const handleGetCuisines = async () => {
        const tmp = await getCuisines();
        console.log(tmp);
    }

    const [id, setId] = useState("0");

    const handleGetCuisineById = async () => {
        const tmp = await getCuisineById(id);
        console.log(tmp);
    }

    // --- Game
    const handleGetGames = async () => {
        const tmp = await getGames();
        console.log(tmp);
    }

    const handleGetGameById = async () => {
        const tmp = await getGameById(id);
        console.log(tmp);
    }

    const [cuisine, setCuisine] = useState([0]);
    const [cart, setCart] = useState([0]);

    const handleCreateGame = async () => {
        const tmp = await createGame(cuisine, cart, score);
        console.log(tmp);
    }

    const handleDeleteGameById = async () => {
        const tmp = await deleteGameById(id);
        console.log(tmp);
    }

    return (
        <div>
            <div>
                <button onClick={handleGetComments}> GetComments </button>
            </div>

            <div>
                <form onSubmit={handleCreateComment}>
                    Nickname:
                    <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} /> <br />
                    Profile photo:
                    <input type="text" value={profilePhoto} onChange={(e) => setProfilePhoto(e.target.value)} /> <br />
                    Content:
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)} /> <br />
                    Score:
                    <input type="number" value={score} onChange={(e) => setScore(e.target.value)} /> <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>

            <div>
                <button onClick={handleGetCuisines}> GetCuisines </button>
            </div>

            <div>
                <button onClick={handleGetCuisineById}> GetCuisineById </button>
            </div>

            <div>
                <button onClick={handleGetGames}> GetGames </button>
            </div>

            <div>
                <button onClick={handleGetGameById}> GetGameById </button>
            </div>

            <div>
                Id:
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} /> <br />
                <button onClick={handleCreateGame}> CreateGame </button>
            </div>

            <div>
                <button onClick={handleDeleteGameById}> DeleteGameById </button>
            </div>
        </div>
    )
}

export default Test;