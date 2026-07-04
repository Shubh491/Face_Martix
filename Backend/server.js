import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import { ObjectId } from "mongodb";

const app = express();
const PORT = 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


const MONGO_URI = "mongodb://localhost:27017/Facial_Recog";
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB Connection Error:", err));


const getCollectionModel = (collectionName) => mongoose.connection.db.collection(collectionName);


let users = [
  { Aname: "admin", password: "adminpass", userType: "Admin", secretKey: "ad123" }
];


app.post('/login', (req, res) => {
    const { Aname, password, userType, secretKey } = req.body;
    console.log('Login request received:', { Aname, password, userType, secretKey });

    
    if (userType === 'Admin') {
        if (Aname !== 'admin' || password !== 'adminpass' || secretKey !== 'ad123') {
            console.log('Invalid Admin credentials');
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }
    } else {
        console.log('UserType not allowed');
        return res.status(403).json({ status: 'error', message: 'Access Denied' });
    }

    console.log('Login successful');
    res.json({ status: 'ok', message: 'Login successful' });
});;


app.get("/api/data/:collection", async (req, res) => {
  try {
    const { collection } = req.params;
    const model = getCollectionModel(collection);
    const data = await model.find().toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});


app.put("/api/data/:collection/:id", async (req, res) => {
  try {
    const { collection, id } = req.params;
    const updateData = req.body;
    const model = getCollectionModel(collection);

    const objectId = new ObjectId(id); 
    const result = await model.updateOne({ _id: objectId }, { $set: updateData });

    if (result.modifiedCount > 0) {
      res.json({ message: "Document updated successfully" });
    } else {
      res.status(404).json({ message: "No document found to update" });
    }
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Error updating data", error });
  }
});


app.use((req, res) => {
  res.status(404).send("Route not found");
});


app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.toString() });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
