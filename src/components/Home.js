import React from 'react';
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material'

import books from '../books.jpg';
import logo  from '../451_Books_6.jpg';
import image from '../images.jpg'

const Home = ({ logout, token, navigate, user }) => {
    const { isAdmin } = user
    // console.log(user)
    // console.log(isAdmin)

    return (
        <div className='homeBoxes'>
            {
                isAdmin ? (
                    <>
                        <Card className='home-cards' sx={{width:'300px', background:'linear-gradient(270deg, rgba(223,37,0,1) 0%, rgba(83,13,1,1) 60%, rgba(2,0,1,1) 100%)', color:'white'}}>
                            <CardActionArea onClick={() => navigate('all-users')}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={logo}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <h2 component="div">
                                        ALL USERS
                                    </h2>

                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <Card className='home-cards' sx={{width:'300px', background:'linear-gradient(270deg, rgba(223,37,0,1) 0%, rgba(83,13,1,1) 60%, rgba(2,0,1,1) 100%)', color:'white'}}>
                            <CardActionArea onClick={() => navigate('add-product')}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={logo}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <h2 component="div">
                                        ADD BOOK
                                    </h2>

                                </CardContent>
                            </CardActionArea>
                        </Card>


                    </>
                ) : (
                    <p></p>
                )
            }
            {
                token ? (
                    <>
                        <Card className='home-cards' sx={{background:'linear-gradient(270deg, rgba(223,37,0,1) 0%, rgba(83,13,1,1) 60%, rgba(2,0,1,1) 100%)', color:'white'}}>
                            <CardActionArea onClick={() => navigate('books')}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={books}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <h2 component="div">
                                        BOOKS
                                    </h2>

                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <Card className='home-cards' sx={{width:'300px', background:'linear-gradient(270deg, rgba(223,37,0,1) 0%, rgba(83,13,1,1) 60%, rgba(2,0,1,1) 100%)', color:'white'}}>
                            <CardActionArea onClick={() => logout()}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={image}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <h2 component="div">
                                        LOGOUT
                                    </h2>

                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </>
                ) : (
                    <>
                        <button className='homeBox' onClick={() => navigate('books')}>Books</button>
                        <button className='homeBox' onClick={() => navigate('register')}>Register</button>
                        <button className='homeBox' onClick={() => navigate('login')}>Login</button>
                    </>
                )
            }
        </div>
    )
}

export default Home;