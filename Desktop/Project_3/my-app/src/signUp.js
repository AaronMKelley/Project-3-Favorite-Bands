import React from 'react';

const signUp = (props) => (

    <form action="/signup" method="POST">
    <input type="text" name='email' placeholder='enter email' />
    <p></p>
    <input type="text" name='password' placeholder='please enter a password '/>
    <p></p>
    <input type="file"
       name='pic' 
       accept="image/png, image/jpeg" placeholder='upload photo'/>
       <p></p>
    <input type='url' name='spotifyPlaylist' placeholder='enter your spotify playlist!'/>
    <p></p>
    <button type="submit" name="action"> Submit </button>
    <p></p>
    </form>

);

export default signUp;