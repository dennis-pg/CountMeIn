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
export async function getUserDetails(requestUserId) {
  const dataPointsObjArray = [];
  const querySnapshot = await memberRef.get();
  for (const doc of querySnapshot.docs) {
    const c = doc.data();
    console.log("user_id : ",c.user_id,doc.data());
    if (c.user_id === requestUserId) {
      // console.log("data2: ",c);

      const dataPointsList = ['Blood Pressure', 'Cholestrol', 'SGBT', 'SpO2', 'RBC Count', 'SGPT', 'SGOT', 'Serum Creatinine', 'HDL-Cholestorol', 'LDL-Cholestorol', 'TSH'];
      for (let i = 0; i < dataPointsList.length; i++) {
        const key = dataPointsList[i];
        if (c.basePrice[key] == undefined) {
          continue;
        }
        // console.log("c.basePrice[key] ",c.basePrice[key]);

        const dataItem = {
          data_point_name: key,
          access_control: [
            {
              access_name: 'Government',
              access: c.Access.Government.master_access || c.Access.Government[key],
              base_price: c.basePrice[key].Government
            },
            {
              access_name: 'Commercial',
              access: c.Access.Commercial.master_access || c.Access.Commercial[key],
              base_price: c.basePrice[key].Commercial
            },
            {
              access_name: 'Academia',
              access: c.Access.Academia.master_access || c.Access.Academia[key],
              base_price: c.basePrice[key].Academia
            }
          ]
        };
        dataPointsObjArray.push(dataItem);
        // console.log("dataPointsObjArray: ",dataPointsObjArray);

      }
      // console.log('dataPointsObjArray 1: ', dataPointsObjArray);

      return dataPointsObjArray;
    }
  }
}

export const getUserProfile = async (requestUserId) => {
  const userData = await memberRef.doc(requestUserId).get();
  const data = userData.data();
  // if (!data) {
  //   Promise.resolve(data.Profile);
  // }
  return data.Profile;
};


// ADD FUNCTION
export function addUserDetails(requestUserId, data) {
  memberRef.doc(requestUserId).set(transformDataToFireStore(requestUserId,data), { merge: true });
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


function transformDataToFireStore(requestUserId,data) {
  const responseData = {
    Access: {
      Academia:
              {
                master_access: false
              },
      Commercial:
              {
                master_access: false
              },
      Government:
              {
                master_access: false
              }
        
    },
    basePrice:{},
    user_id: requestUserId,
  };
  for (let i = 0; i < data['data'].length; i++)
  {
    var data_point_name=data['data'][i]['data_point_name']
    var access_control=data['data'][i]['access_control']
    for (let j = 0; j < access_control.length; j++)
    {
      responseData["Access"][access_control[j].access_name][data_point_name]=access_control[j].access
      if(responseData["basePrice"][data_point_name] == undefined)
      {
         responseData["basePrice"][data_point_name]={}
      }
      responseData["basePrice"][data_point_name][access_control[j].access_name]=access_control[j].base_price
    }
  }
  return responseData;
}

export default getUserDetails;
