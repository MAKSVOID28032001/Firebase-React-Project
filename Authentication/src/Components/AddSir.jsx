import React, { useState } from "react";
import { collection, addDoc, getFirestore, doc as firestoreDoc, updateDoc } from "firebase/firestore";
import { app } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref } from "firebase/storage"; // Add this line
const storage = getStorage(app);
const AddSir = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const defaultState = { SirRoll: "", SirName: "", SirEmail: "", SirPhone: "" };
    const [Sroll, setSroll] = useState(location.state ? location.state.SirRoll : defaultState.SirRoll);
    const [Sname, setSname] = useState(location.state ? location.state.SirName : defaultState.SirName);
    const [Semail, setSemail] = useState(location.state ? location.state.SirEmail : defaultState.SirEmail);
    const [Sphone, setSphone] = useState(location.state ? location.state.SirPhone : defaultState.SirPhone);
    const [Simage, setImage] = useState(null);

    //Add Image Start
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    }
    //ADD Image End

    const handleImageUpload = async () => {
        if (!Simage) {
            // If no new image is selected, return the existing image URL
            return location.state ? location.state.SirImage : "";
        }
    
        const storageRef = ref(storage, `SirImage/${Simage.name}`);
        await uploadBytes(storageRef, Simage);
    
        const imageUrl = await getDownloadURL(storageRef);
        return imageUrl;
    }

    const DataSubmit = async (event) => {
        event.preventDefault();
        const imageUrl = await handleImageUpload();
        const OBJ = { roll: Sroll, name: Sname, email: Semail, phone: Sphone, image: imageUrl };

        const DB = getFirestore(app);
        if (location.state) {
            // Edit existing document
            const docRef = firestoreDoc(DB, "Sir", location.state.id);
            try {
                await updateDoc(docRef, {
                    SirRoll: OBJ.roll,
                    SirName: OBJ.name,
                    SirEmail: OBJ.email,
                    SirPhone: OBJ.phone,
                    SirImage: OBJ.image,
                });
                navigate("/SirList");
            } catch (error) {
                console.log(error.message);
            }
        } else {
            // Add new document
            const docRef = await addDoc(collection(DB, "Sir"), {
                SirRoll: OBJ.roll,
                SirName: OBJ.name,
                SirEmail: OBJ.email,
                SirPhone: OBJ.phone,
                SirImage: OBJ.image,
            });
            navigate("/SirList");
            console.log(docRef, docRef.id);
        }

        setSroll("");
        setSname("");
        setSemail("");
        setSphone("");
    };

    return (
        <>
            <h1>{location.state ? "Edit" : "Add"} Sir Data</h1>
            <form onSubmit={DataSubmit}>
                <div>
                    <label htmlFor="roll">Sir Roll:</label>
                    <input required type="number" placeholder="Sir Roll" value={Sroll} onChange={e => setSroll(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="name">Sir Name:</label>
                    <input required type="text" placeholder="Sir Name" value={Sname} onChange={e => setSname(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Sir Email:</label>
                    <input required type="email" placeholder="Sir Email" value={Semail} onChange={e => setSemail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="phone">Sir Phone:</label>
                    <input required type="text" placeholder="Sir Phone" value={Sphone} onChange={e => setSphone(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="image">Stu Image:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div>
                    <button type="submit">{location.state ? "Update" : "Submit"}</button>
                </div>
            </form>
        </>
    );
};
export default AddSir;