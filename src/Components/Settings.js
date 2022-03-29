// User settings page: Update Email, Update Password, Delete Account, Add/Change Image and Log-out
import "../styling/settings.css";
import { deleteUser, updateUser } from "../utils";

export const Settings = () => {
  // Define Update Handler
  const submitHandler = (e) => {
    e.preventDefault();

    if (bool) {
      updateUser(username, pass);
    }
  };

  // Preview Profile image thumbnail
  const previewFile = () => {
    let preview = document.querySelector("img");
    let file = document.querySelector("input[type=file]").files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      preview.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  };

  return (
    <section className='settings_wrap'>
      <h1 className='settingsTitle'>Settings</h1>

      {/* <div className='settingsOther'>
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
      </div> */}

      {/* ========== User can upload profile image here ========= */}
      <article>
        <form>
          <label>Profile image</label>
          <figure>
            <img src='' height='80' alt='Image preview...' />
            <figcaption>Images should be square e.g. 150px X 150px</figcaption>
            {/* Display the image here */}
          </figure>

          <input
            type='file'
            onChange={(event) => {
              previewFile();
              setUsername(event.target.value);
            }}
          />
          <button onclick={() => {}}>Upload</button>
        </form>

        {/* ========== Update User display name here  ========= */}
        <form className='change_pass'>
          <input
            name='UpdateDisplayName'
            type='text'
            placeholder='Enter display name'
            className=''
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
        <form action=''>
          <input
            name='updateUserPass'
            onChange={(event) => setPass(event.target.value)}
            type='password'
            placeholder='Enter new password'
            className='form_item-control'
          />
          <button onclick={() => {}}>Update Password</button>
        </form>
      </article>
    </section>
  );
};
