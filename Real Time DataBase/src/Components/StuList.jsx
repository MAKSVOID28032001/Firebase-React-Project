import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import {getStorage, ref as storageRef, deleteObject} from "firebase/storage";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
const StuList = () => {
    const navigate = useNavigate();

    //Fetch Data Start
    const [SData, SetData] = useState(null);
    useEffect(() => {
        const DB = getDatabase(app);
        const studentRef = ref(DB, "Student");
        onValue(studentRef, (Sdetail) => {
            const data = Sdetail.val();
            console.log(data);
            SetData(data);
        })
    }, [])
    //Fetch Data End

    //Delete Data Start
    const DeleteData = (key) => {
        const DB = getDatabase(app);
        const studentRef = ref(DB, `Student/${key}`)

        //image delete start
        const STORAGE = getStorage(app);
        const imageRef = storageRef(STORAGE, `StuImage/${key}`);
        deleteObject(imageRef)
        .then(res => remove(studentRef))
        .catch(error => console.log(error.message))
        //image delete end

    }
    //Delete Data End
    return (
        <>
            <h1>Student Data List</h1>
            <div>
                {
                    SData && Object.entries(SData).map(([key, value]) => (
                        <div key={key} style={{ display: "flex" }}>
                            <p style={{ margin: "10px" }}>{key}</p>
                            <p style={{ margin: "10px" }}>{value.Name}</p>
                            <p style={{ margin: "10px" }}>{value.Email}</p>
                            <p style={{ margin: "10px" }}>{value.Phone}</p>
                            <img src={value.Image} width="120px" height="120px" />
                            <button style={{ margin: "10px" }} onClick={() => DeleteData(key)}>X</button>
                            <button style={{ margin: "10px" }} onClick={() => navigate("/",{state: [key, value]})}>E</button>
                        </div>
                    ))
                }
            </div>
        </>
    );
}
export default StuList;