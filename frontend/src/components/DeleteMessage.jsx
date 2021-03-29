import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'

const DeleteMessage = () => {

    const history = useHistory();

    const [secretKey, setSecretKey] = useState("");
    const [password, setPassword] = useState("")
    const [btnDisable, setBtnDisable] = useState(true);
    const [response, setResponse] = useState("")

    useEffect(() => {
        if(secretKey.length > 0 && password.length > 0){
            setBtnDisable(false);
        }else{
            setBtnDisable(true)
        }
    }, [secretKey, password])


    const handleDeleteMessage = () => {
        fetch('https://secret-message-back.herokuapp.com/delete-message', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                secretKey: secretKey,
                password: password
            })
        })
        .then((res) => res.json())
        .then((res) => {
            setResponse(res.message);
            setBtnDisable(true)
        })
    }

    return(
        <div className="container mt-4">
            <div>
                <h1 className="mb-5 d-inline-block">Delete Message</h1>
                <button className="btn btn-primary float-right mt-3" onClick={() => {
                    history.push('/')
                }}>Back</button>
            </div>
            <label htmlFor="key">Secret Key : </label>
            <input type="text" className="input-group" id="key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} /><br />
            <label htmlFor="pwd">Password : </label>
            <input type="password" className="input-group" id="pwd" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            {response.length > 0 && <h5 className="mt-2 mb-4">Message : {response}</h5>}
            <button className="btn btn-danger" disabled={btnDisable} onClick={handleDeleteMessage}>Delete</button>
        </div>
    )
}

export default DeleteMessage;