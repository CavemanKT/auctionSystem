import {useState} from 'react';

export const useGoogleAuth = () => {
    
    const [googleCredentials, setGoogleCredentials] = useState(null)

    const googleAuth = (response) => {
        const {accessToken} = response
        setGoogleCredentials(accessToken)
    }
    const googleAuthLogout = () => {
        setGoogleCredentials(null)
    }

    return {
        googleCredentials,
        googleAuth,
        googleAuthLogout
    }
}
