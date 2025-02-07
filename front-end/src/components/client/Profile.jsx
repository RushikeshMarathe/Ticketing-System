import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, token, BASE_URL } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [about, setAbout] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const [editMode, setEditMode] = useState(false);

  // console.log("user : ",user);

  useEffect(() => {
    // Fetch user details based on user id and role when the component is mounted
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getClientDetails`, {
          headers: {
            "Content-Type":'Application/json',
            Authorization: `Bearer ${token}` },
        });


        if (response.data.success) {
          const { firstName, lastName, email, phoneNo, about, city, gender, dateOfBirth } = response.data.data;
          setFirstName(firstName || '');
          setLastName(lastName || '');
          setEmail(email || '');
          setPhoneNo(phoneNo || '');
          setAbout(about || '');
          setCity(city || '');
          setGender(gender || '');
          setDateOfBirth(dateOfBirth || '');
        } else {
          toast.error('Failed to fetch user details.');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('Failed to fetch user details.');
      }
    };

    fetchUserDetails();
  }, [user, BASE_URL, token]);

  // Handle save functionality
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/clientUpdateProfile`,
        { firstName, lastName, email, phoneNo, about, city, gender, dateOfBirth },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        dispatch({ type: 'UPDATE_USER', payload: response.data.data });
        setEditMode(false); // Exit edit mode
        toast.success('Profile Updated Successfully!');
      } else {
        toast.error('Failed to save profile data.');
      }
    } catch (error) {
      console.error('Error saving profile', error);
      toast.error('Failed to save profile data.');
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
      <div className="space-y-4">
        <div className="p-4 border border-slate-300 rounded-lg">
          {/* First Name */}
          <div>
            <p className="font-semibold">First Name :</p>
            {editMode ? (
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your First name"
                className="w-full p-2 border border-slate-300 rounded-lg"
              />
            ) : (
              <p>{firstName || 'Not Provided'}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <p className="font-semibold">Last Name :</p>
            {editMode ? (
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="w-full p-2 border border-slate-300 rounded-lg"
              />
            ) : (
              <p>{lastName || 'Not Provided'}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <p className="font-semibold">Email :</p>
            {editMode ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border border-slate-300 rounded-lg"
                readOnly
              />
            ) : (
              <p>{email || 'Not Provided'}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <p className="font-semibold">Phone No :</p>
            {editMode ? (
              <input
                type="number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full p-2 border border-slate-300 rounded-lg"
              />
            ) : (
              <p>{phoneNo || 'Not Provided'}</p>
            )}
          </div>

          {/* About */}
          <div>
            <p className="font-semibold">About :</p>
            {editMode ? (
              <textarea
                maxLength={200}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell us about yourself"
                className="w-full p-2 border border-slate-300 rounded-lg"
              />
            ) : (
              <p>{about || 'Not Provided'}</p>
            )}
          </div>

          {/* City */}
          <div>
            <p className="font-semibold">City :</p>
            {editMode ? (
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                className="w-full p-2 border border-slate-300 rounded-lg"
              />
            ) : (
              <p>{city || 'Not Provided'}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <p className="font-semibold">Gender :</p>
            {editMode ? (
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <p>{gender || 'Not Provided'}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <p className="font-semibold">Date of Birth :</p>
            {editMode ? (
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg"
              />
            ) : (
              <p>{dateOfBirth || 'Not Provided'}</p>
            )}
          </div>

          {/* Save Button */}
          {editMode ? (
            <button
              onClick={handleSave}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
