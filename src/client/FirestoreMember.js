import React, { useState, useEffect, Fragment, useContext } from 'react';
import firebase from './firebase';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from "./contexts/AuthContext"

function FirestoreMember() {
  const { currentUser } = useAuth()
  const currentUserId = currentUser ? currentUser.uid : null;
  const [member, setMember] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [academiaAccess, setAcademiaAccess] = useState(False);
  const [bpAccess, setBpAccess] = useState('');

  const memberRef = firebase.firestore().collection('Member');

  //REALTIME GET FUNCTION
  function getUserMember() {
    setLoading(true);
    memberRef
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setMember(items);
        setLoading(false);
      });

  }

  useEffect(() => {
    getUserMember();
    // eslint-disable-next-line
  }, []);

  // ADD FUNCTION
  function addUserHealthMetric(userId,data) {
    memberRef.doc(userId).set({foo:'bar'}, {merge: true})
  }



  // EDIT FUNCTION
  function editUserHealthMetric(userId,fieldToUpdate) {
    setLoading();
    memberMetricsRef
      .doc(userId)
      .update(fieldToUpdate)
      .catch((err) => {
        console.error(err);
      });
  }
}

export default FirestoreMember;