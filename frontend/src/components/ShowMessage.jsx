import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

const ShowMessage = () => {

    const history = useHistory()

    const [id, setId] = useState('')
    const [message, setMessage] = useState('')
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        const urlString = window.location.href;
        const url = new URL(urlString);
        setId(url.searchParams.get("rs"))
    }, [])

    useEffect(() => {
        if (id?.length > 0) {
            fetch(`https://secret-back.herokuapp.com/message-by-id/${id}`)
                .then((res) => res.json())
                .then((res) => {
                    setMessage(res.result[0]?.message);
                    setPageLoaded(true)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [id])

    return (
        <React.Fragment>
            {message && pageLoaded ?
                <div className="container mt-3">
                    <h1>Message</h1>
                    <div className="text-center px-5 mx-5 mt-3">
                        <h4>This is a creepy and secret message for you!!!</h4>
                    </div>
                    <div className="bg-warning border rounded text-center p-3 m-5">
                        <div className="divtag">{message}</div>
                    </div>
                    <div className="text-center">
                        <button
                            className="btn btn-success"
                            onClick={() => history.push('/')}
                        >
                            Create a Secret Message
                        </button>
                    </div>
                </div> :
                pageLoaded &&
                <div className="container mt-3">
                    <h1>Message</h1>
                    <div className="bg-warning border rounded text-center p-3 m-5">
                        <h4>Oops!! This message has been deleted by the creator...</h4>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default ShowMessage;