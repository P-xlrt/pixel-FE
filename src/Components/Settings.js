// User settings page: Update Email, Update Password, Delete Account, Add/Change Image and Log-out
import { useState } from "react";
import { Navigate } from "react-router-dom";
import "../styling/settings.css";
import {
  updateUser,
  // updatePass,
  // updateImageProfile,
  // deleteUser,
  updateProfileUser
} from "../utils";

export const Settings = ({user}) => {
  // Define Update Handler
  const [username, setUsername] = useState();
  const [pass, setPass] = useState();
  const [bool, setBool] = useState(false);
  const [loadedImage, setImage] = useState(null);

  // ========== Event Handler
  const passNameHandler = (e) => {
    e.preventDefault();
    let changeName = document.getElementById("chg_displ_nme");
    let changePass = document.getElementById("chg_pass");

    // if (changeName) {
    //   updateUser(username);
    // } else if (changePass) {
    //   updatePass(pass);
    // } else {
    //   console.error("That is not a valid entry");
    // }
  };

  // ========== Event Handler
  const submitImageHandler = (e) => {
    e.preventDefault();

    if (bool) {
      updateImageProfile(img, userID);
    }
  };

  //============ Preview Profile image thumbnail ==========
  const previewFile = () => {
    let preview = document.querySelector("img");
    let file = document.querySelector("input[type=file]").files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      preview.src = reader.result;
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  };

  return (
    <>
      {!user && <Navigate to='/login' />}
      <section className='settings_wrap'>
        <h1 className='settingsTitle'>Settings</h1>
        <p>{username}</p>

        {/* ========== User can upload profile image here ========= */}
        <article>
          <form onSubmit={submitImageHandler}>
            <label>Profile image</label>
            <figure>
              <img src='' height='80' alt='Image preview...' />
              <figcaption>
                Images should be square e.g. 150px X 150px
              </figcaption>
              {/* Display the image here */}
            </figure>

            <input
              className=''
              type='file'
              name='user-image'
              onChange={(event) => {
                previewFile();
              }}
            />
            <button onClick={() => {updateProfileUser(loadedImage)}}>Upload</button>
          </form>

          {/* ========== Update User display name here  ========= */}
          <form
            id='chg_displ_nme'
            className='change_pass'
            onChange={passNameHandler}
          >
            <input
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              name='UpdateDisplayName'
              type='text'
              placeholder='Enter display name'
              className='username'
            />
            <button
              onClick={() => {
                setBool(!bool);
              }}
            >
              Change Display Name
            </button>
          </form>

          {/* ========== Update User Password Here ========= */}
          <form id='chg_pass' onChange={passNameHandler}>
            <input
              name='updateUserPass'
              onChange={(event) => setPass(event.target.value)}
              type='password'
              placeholder='Enter new password'
              className='form_item-control'
            />
            <button onClick={() => {}}>Update Password</button>
          </form>

          {/* ========== Delete User  Here ========= */}
          <div>
            <p>
              Are you sure you want to delete your profile? This action is NOT
              reversible!
            </p>
            <button click={() => {}}>Delete Profile</button>
          </div>
        </article>
      </section>
    </>
  );
};

{
  /* <div className='settingsOther'>
        <div className='settings'>
          <h2>Set lading page</h2>
          <input />
        </div>
        <div className='settings'>
          <h2>Change email</h2>
          <input />
        </div>
        <div className='settings'>
          <h2>Change password</h2>
          <input />
        </div>
        <div className='settings' id='deleteAccount'>
          <h2>Delete account</h2>
        </div>
      </div>
      <div className='settingsPic'>
        <img src='' alt='user profile image' id='userProfileImage' />
        <h2>Change profile image</h2>
      </div> */
}
