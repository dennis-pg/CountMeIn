import React, {
  useState, useEffect, Fragment, useContext
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import firebase from './firebase';
import { useAuth } from './contexts/AuthContext';

export const memberRef = firebase.firestore().collection('Member');

function getUserMember() {
  memberRef.onSnapshot((querySnapshot) => {
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    setMember(items);
  });
}

export function getUserDetails(requestUserId) {
// setLoading(true);
  memberRef.onSnapshot((querySnapshot) => {
    const dataPointsObjArray = [];
    querySnapshot.forEach((doc) => {
      dataPointsObjArray.push();
      const c = doc.data();
      if (c.user_id == requestUserId) {
        const dataPointsList = ['Blood Pressure', 'SpO2', 'RBC Count', 'SGPT', 'SGOT', 'Serum Creatinine', 'HDL-Cholestorol', 'LDL-Cholestorol', 'TSH'];
        for (let i = 0; i < dataPointsList.length; i++) {
          const key = dataPointsList[i];
          const dataItem = {
            'Data Point Name': key,
            Govt: {
              access: c.Access.Government.master_access || c.Access.Government[key],
              basePrice: c.basePrice[key]
            },
            Commercial: {
              access: c.Access.Commercial.master_access || c.Access.Commercial[key],
              basePrice: c.basePrice[key]
            },
            Academia: {
              access: c.Access.Academia.master_access || c.Access.Academia[key],
              basePrice: c.basePrice[key]
            }
          };
          dataPointsObjArray.push(dataItem);
        }
      }
      console.log(dataPointsObjArray);
      return dataPointsObjArray;
    });

    // setLoading(false);
  });
}


// ADD FUNCTION
function addUserHealthMetric(userId, data) {
  memberRef.doc(userId).set({ foo: 'bar' }, { merge: true });
}


// EDIT FUNCTION
function editUserHealthMetric(userId, fieldToUpdate) {
  memberMetricsRef
    .doc(userId)
    .update(fieldToUpdate)
    .catch((err) => {
      console.error(err);
    });
}

export default getUserDetails;
