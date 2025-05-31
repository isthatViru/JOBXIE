import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../style/Skills.css"
const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const auth = getAuth();

  // ✅ Detect logged-in user properly
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userRef = doc(db, "users", firebaseUser.uid);

        try {
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setSkills(userSnap.data().skills || []);
          } else {
            await setDoc(userRef, { skills: [] }); // create doc if not exists
          }
        } catch (err) {
          setError("Failed to load skills.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe(); // cleanup
  }, [auth]);

  const handleAddSkill = async () => {
    const trimmed = inputSkill.trim();
    if (!trimmed || skills.includes(trimmed)) return;

    const newSkills = [...skills, trimmed];
    setSkills(newSkills);
    setInputSkill("");

    try {
      await updateDoc(doc(db, "users", user.uid), {
        skills: newSkills,
      });
    } catch (err) {
      setError("Failed to add skill");
      console.error(err);
    }
  };

  const handleDeleteSkill = async (skillToRemove) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(newSkills);

    try {
      await updateDoc(doc(db, "users", user.uid), {
        skills: newSkills,
      });
    } catch (err) {
      setError("Failed to delete skill");
      console.error(err);
    }
  };

  return (
      <div className="container" style={{ marginTop: "15rem" }}>
    {loading && <p>Loading...</p>}

    {!loading && !user && (
      <p className="text-danger">You must be logged in to manage skills.</p>
    )}

    {error && <p className="text-danger">{error}</p>}

    {!loading && user && !error && (
    <>
    <div className="card p-4 mb-4 shadow-sm" style={{ marginTop: "15rem" }}>
      <h5>Your Skills</h5>

      <div className="mb-3 d-flex flex-wrap gap-2">
        {skills.length === 0 ? (
          <p>No skills added yet.</p>
        ) : (
          skills.map((skill, idx) => (
            <span
              key={idx}
              className="badge bg-primary px-3 py-2 rounded-pill d-flex align-items-center"
            >
              {skill}
              <button
                className="btn btn-sm btn-close btn-close-white ms-2"
                onClick={() => handleDeleteSkill(skill)}
              ></button>
            </span>
          ))
        )}
      </div>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Add a skill"
          value={inputSkill}
          onChange={(e) => setInputSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
        />
        <button className="btn btn-success" onClick={handleAddSkill}>
          Add
        </button>
      </div>
    </div>
    </>
     )}
  </div>
  );
};

export default Skills;
