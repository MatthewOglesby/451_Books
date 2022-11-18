import React from 'react';
import { Link } from 'react-router-dom';

const AllUsers = ({users}) => {

    console.log(users)

    return (
        <div>
            {
                users ?
                    (
                        users.map((user) => {
                            const { id, username, email, isAdmin } = user;
                            
                            let isAdminText = isAdmin.toString();

                            return (
                                <div key={id}>
                                    <div>
                                        <p>User ID: {id}</p>
                                        <p>{username}</p>
                                        <p>{email}</p>
                                        <p>Administrator: {isAdminText}</p>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <p></p>
                    )
            }
        </div>
    )
}

export default AllUsers;