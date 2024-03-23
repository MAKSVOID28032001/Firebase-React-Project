import React, { useState } from "react";
import { getDatabase, ref, set, update } from "firebase/database";
import { app } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const AddStu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [Sroll, setSroll] = useState(location.state ? location.state[0] : "");
    const [Sname, setSname] = useState(location.state ? location.state[1].Name : "");
    const [Semail, setSemail] = useState(location.state ? location.state[1].Email : "");
    const [Sphone, setSphone] = useState(location.state ? location.state[1].Phone : "");
    const [Simage, setImage] = useState(null);

    //Add Image Start
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    }
    //ADD Image End

    const DataSubmit = async (event) => {
        //ADD DATA START
        event.preventDefault();
        const OBJ = { roll: Sroll, name: Sname, email: Semail, phone: Sphone, image: Simage };
        const DB = getDatabase(app);

        //Add Image Start
        const STORAGE = getStorage(app);
        const ImgRef = storageRef(STORAGE, `StuImage/${OBJ.roll}`);
        let imageURL = "";
        if (Simage) {
            await uploadBytes(ImgRef, OBJ.image);
            imageURL = await getDownloadURL(ImgRef);
        } else {
            // Fetch current image URL if no new image is selected
            const existingImgRef = storageRef(STORAGE, `StuImage/${location.state[0]}`);
            imageURL = await getDownloadURL(existingImgRef);
        }
        //ADD Image End

        set(ref(DB, `Student/${OBJ.roll}`), {
            Roll: OBJ.roll, Name: OBJ.name, Email: OBJ.email, Phone: OBJ.phone, Image: imageURL,
        }).then(res => {
            navigate("/StuList");
        }).catch(error => {
            console.log(error.message);
        });
        setSroll("");
        setSname("");
        setSemail("");
        setSphone("");
        //ADD DATA END

        //Data Edit Start
        if (location.state) {
            const StuRef = ref(DB, `Student/${location.state[0]}`);
            update(StuRef, { Name: Sname, Email: Semail, Phone: Sphone, Image: imageURL })
                .then(res => navigate("/StuList"))
                .catch(error => console.log(error.message));
        }
        //Data Edit End
    };

    return (
        <>
            <h1>Add Student Data</h1>
            <form onSubmit={DataSubmit}>
                <div>
                    <label htmlFor="roll">Stu Roll:</label>
                    <input value={Sroll} required type="number" placeholder="Student Roll" onChange={(e) => setSroll(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="name">Stu Name:</label>
                    <input value={Sname} required type="text" placeholder="Student Name" onChange={(e) => setSname(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Stu Email:</label>
                    <input value={Semail} required type="email" placeholder="Student Email" onChange={(e) => setSemail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="phone">Stu Phone:</label>
                    <input value={Sphone} required type="text" placeholder="Student Phone" onChange={(e) => setSphone(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="image">Stu Image:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    );
};
export default AddStu;