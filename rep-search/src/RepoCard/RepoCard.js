import React, { memo } from 'react';
import './RepoCard.css'
const RepoCard = memo((responseData = []) => {
    if (responseData.responseData.length) {
        return (
            responseData.responseData.map((data) =>
                <div key={data.id} className="container">
                    <img src={data.owner.avatar_url} className="image" alt="Avatar" />
                    <div className="details">
                        <h3 className="title">{data.full_name}</h3>
                        <div className="row">
                            <p>Watchers: {data.watchers}</p>
                            <p>Created At: {data.created_at}</p>
                            <p>Updated At: {data.updated_at}</p>
                        </div>
                        <div className="row">
                            <p className="description">Description: {data.description}</p>
                            <p>Language: {data.language}</p>
                            <p>Score: {data.score}</p>
                        </div>
                    </div>
                </div>
            )
        );
    } else {
        return (
            <div></div>
        )
    };

});

export default RepoCard;
