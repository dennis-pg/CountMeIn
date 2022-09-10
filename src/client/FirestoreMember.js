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
function getUserDetails(requestUserId) {
  // setLoading(true);

  memberRef
    .onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push();
        var c=doc.data();
        if(c.user_id==requestUserId)
        {
        const dataPointsList = ['Blood Pressure', 'SpO2', 'RBC Count', 'SGPT', 'SGOT', 'Serum Creatinine', 'HDL-Cholestorol', 'LDL-Cholestorol', 'TSH'];
        for (var i = 0; i < dataPointsList.length; i++)
        {   
            var key=dataPointsList[i]
            var data_item={
                "Data Point Name": key,
                "Govt": {
                    "access": c['Access']['Government']['master_access'] || c['Access']['Government'][key],
                    "basePrice": c['basePrice'][key]
                },
                "Commercial": {
                    "access": c['Access']['Commercial']['master_access'] || c['Access']['Commercial'][key],
                    "basePrice": c['basePrice'][key]
                },
                "Academia": {
                    "access": c['Access']['Academia']['master_access'] || c['Access']['Academia'][key],
                    "basePrice": c['basePrice'][key]
                }
            }
            items.push(data_item);
        }   
        }
        console.log(items);
        return items;
      });
      setMember(items);
      // setLoading(false);
    });
    return items;
}

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