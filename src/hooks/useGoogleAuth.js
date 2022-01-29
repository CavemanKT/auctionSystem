import {useState, useEffect, useReducer} from 'react';

export const useGoogleAuth = () => {
    
    const [googleCredentials, setGoogleCredentials] = useState(null)

    const googleAuth = (response) => {
        const {accessToken} = response
        setGoogleCredentials(accessToken)
    }
    const googleAuthLogout = () => {
        setGoogleCredentials(null)
    }

    console.log(googleCredentials);


    return {
        googleCredentials,
        googleAuth,
        googleAuthLogout
    }
}
