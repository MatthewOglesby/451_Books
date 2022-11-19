import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AllUsers = ({ users }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const userMatches = (user, string) => {
        const { id, username, email, isAdmin } = user;

        if ((username.toLowerCase().includes(string)) || email.toLowerCase().includes(string)) {
            return user;
        }
    }

    const filteredUsers = users.filter(user => userMatches(user, searchTerm));

    const usersToDisplay = searchTerm.length ? filteredUsers : users;

    // console.log(users)

    return (
        <div className='allUsersContainer'>
            <div className='allUserBox'>
                <form
                    className='searchUsersForm'
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}>
                    <div className='returnedFormContent'>
                        <h3 className='searchHeader'>Search For User Here</h3>
                        <input
                            className='userSearchInput'
                            type='text'
                            placeholder='Enter Search For User'
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>
                </form>
            </div>
            {
                users ?
                    (
                        usersToDisplay.map((user) => {
                            const { id, username, email, isAdmin } = user;

                            let isAdminText = isAdmin.toString();

                            return (
                                <div key={id} className='allUserBox'>
                                    <div className='allUserBoxContent'>
                                        <p>User ID: {id}</p>
                                        <p>Username: {username}</p>
                                        <p>Email: {email}</p>
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