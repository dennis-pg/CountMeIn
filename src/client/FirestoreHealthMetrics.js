import React, {
  useState, useEffect, Fragment, useContext
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from './firebase';
import { useAuth } from './contexts/AuthContext';

function FirestoreHealthMetrics() {
  const { currentUser } = useAuth();
  const currentUserId = currentUser ? currentUser.uid : null;
  const [userHealthMetrics, setUserHealthMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [bp, setBp] = useState('');

  const memberMetricsRef = firebase.firestore().collection('UserHealthMetrics');

  // REALTIME GET FUNCTION
  function getUserHealthMetrics() {
    setLoading(true);
    memberMetricsRef
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setUserHealthMetrics(items);
        setLoading(false);
      });
    console.log(`userHealthMetrics: ${userHealthMetrics}`);
  }

  useEffect(() => {
    getUserHealthMetrics();
    // eslint-disable-next-line
  }, []);

  // ADD FUNCTION
  function addUserHealthMetric(userId, data) {
    data.userId = userId;
    memberMetricsRef.add(data);
  }


  // //DELETE FUNCTION
  // function deleteUserHealthMetric(userHealthMetric) {
  //   memberMetricsRef
  //     .doc(userHealthMetric.id)
  //     .delete()
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  // // EDIT FUNCTION
  // function editUserHealthMetric(userHealthMetric) {
  //   const updatedUserHealthMetric = {
  //       bp: bp,
  //   };
  //   setLoading();
  //   memberMetricsRef
  //     .doc(userHealthMetric.id)
  //     .update(updatedUserHealthMetric)
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }
}

export default FirestoreHealthMetrics;
