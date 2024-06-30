import { useDispatch, useSelector } from "react-redux";
import styles from "./profile.module.css"; // Importing custom styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../../Redux/user/userSlice";
import { app } from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Alert, Button, Form, FormControl } from 'react-bootstrap';  
import { BACKEND_URL } from "../../utils/constants";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`${BACKEND_URL}/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(formData),
        credentials: 'include',  
      });
      
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile</h1>

      {updateUserSuccess && (
        <Alert variant='success' className='mt-3'>
          {updateUserSuccess}
        </Alert>
      )}
      
      {updateUserError && (
        <Alert variant='danger' className='mt-3'>
          {updateUserError}
        </Alert>
      )}
      <Form onSubmit={handleSubmit} className={styles.form}>
        <FormControl
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className={styles.profilePictureContainer}
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '5rem',
                  height: '5rem',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={styles.profilePicture}
            style={
              imageFileUploadProgress && imageFileUploadProgress < 100
                ? { opacity: 0.6 }
                : {}
            }
          />
        </div>
        {imageFileUploadError && (
          <Alert variant='danger'>{imageFileUploadError}</Alert>
        )}
        <FormControl
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className={styles.input}
        />
        <FormControl
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className={styles.input}
          disabled
        />
        <FormControl
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          className={styles.input}
        />
        <Button type="submit" className={styles.button}>
          Update
        </Button>
      </Form>
      <div className={styles.actions}>
        <span className={styles.action}>
          <FontAwesomeIcon icon={faTrash} /> Delete Account
        </span>
        <span className={styles.action}>
          <FontAwesomeIcon icon={faSignOut} /> Sign Out
        </span>
      </div>
    
    
    </div>
  );
}
