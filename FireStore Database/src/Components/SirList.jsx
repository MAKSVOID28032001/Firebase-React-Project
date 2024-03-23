import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import { collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getStorage, ref as storageRef, deleteObject, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);

const SirList = () => {
    const navigate = useNavigate();
    const [SirData, SetSirData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const DB = getFirestore(app);
        const docRef = collection(DB, "Sir");
        const docSnap = await getDocs(docRef);
        const Data = docSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(Data);
        SetSirData(Data);
    };

    const handleImageDelete = async (imageURL) => {
        const imageRef = storageRef(storage, imageURL);

        try {
            await deleteObject(imageRef);
            console.log("Image deleted from storage");
        } catch (error) {
            console.log(error.message);
        }
    };

    const DeleteData = async (id, imageURL) => {
        const DB = getFirestore(app);
        const docRef = doc(DB, "Sir", id);
        try {
            await deleteDoc(docRef);
            await handleImageDelete(imageURL);
            getData();
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <h1>Sir Data List</h1>
            {
                SirData.map(value => (
                    <div key={value.id} style={{ display: "flex" }}>
                        <p style={{ margin: "10px" }}>{value.SirRoll}</p>
                        <p style={{ margin: "10px" }}>{value.SirName}</p>
                        <p style={{ margin: "10px" }}>{value.SirEmail}</p>
                        <p style={{ margin: "10px" }}>{value.SirPhone}</p>
                        <img
                            src={value.SirImage}
                            alt="Sir"
                            style={{ width: "100px", height: "100px", margin: "10px" }}
                            onError={(e) => {
                                e.target.src = "default-image-url.jpg"; // Set a default image URL
                            }}
                        />
                        <button style={{ margin: "10px" }} onClick={() => DeleteData(value.id, value.SirImage)}>X</button>
                        <button style={{ margin: "10px" }} onClick={() => navigate("/AddSir", { state: value })}>E</button>
                    </div>
                ))
            }
        </>
    );
};

export default SirList;