import React from 'react';

const Welcome = () => {
    return ( 
        <React.Fragment>
            <h1 style={{ textAlign: 'center'}}>Welcome to To-Do-List</h1>
            <br />
            <br />
            <br />

            <p>
                If you're a new user then 
                <a style={{ textDecoration: 'none'}} href="/sign-up">
                    <h3>Sign-Up</h3>
                </a>
                
                <br />
                
                Already have an account? Try
                <a style={{ textDecoration: 'none'}} href="/log-in">
                    <h3>Log-In</h3>
                </a>
            </p>

        </React.Fragment>
    )
}
 
export default Welcome;