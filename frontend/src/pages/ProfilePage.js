import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';
import '../style/ProfilePage.css';

function ProfilePage({ onClose }) {
    const [profile, setProfile] = useState(null);
    const { user } = useUserContext();

    useEffect(() => {
        const fetchProfile = async () => {
            const { data } = await axios.get('http://localhost:5000/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setProfile(data);
        };
        fetchProfile();
    }, [user]);

    return (
        <div className="profile-popup">
            <button className="close-button" onClick={onClose}>X</button>
            {profile ? (
                <>
                    <p>User Name: {profile.name}</p>
                    <p>User Email: {profile.email}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProfilePage;
