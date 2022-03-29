// User proile page [displays personal gallery]
import "../styling/profile.css";

export const Profile = () => {
  return (
    <div className="profileContainer">
      <h1>Profile</h1>
      <div className="profileData">
        {/* <h2>{user.name}</h2> */}
        <div><h2>username</h2>
        <img scr="" alt="user profile image"/></div>
      </div>
      <div className="userGallery">
        <h2>usergallery</h2>
        {/* we will have to figure out how to flag images as public or private */}
        <div className="userImages">
          {/* {userImages.map((img, index) => {
            return (
              <div key={index}>
                <img src={img.img.path} alt={img.img.name}/>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};
