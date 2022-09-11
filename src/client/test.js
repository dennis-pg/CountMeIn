//import firebase from '../firebase.js';
import firebase from 'firebase/app/dist/index.cjs.js';
import 'firebase/auth/dist/index.cjs.js';
import "firebase/firestore/dist/index.cjs.js"
const app = firebase.initializeApp({
    apiKey: "AIzaSyCnvXnzoSMWlPIq0gRH-yi6TO_Hplg7Y4o",
    authDomain: "countmein-4f942.firebaseapp.com",
    projectId: "countmein-4f942",
    storageBucket: "countmein-4f942.appspot.com",
    messagingSenderId: "437545739820",
    appId: "1:437545739820:web:57cc1c1470ff338d541389",
    measurementId: "G-G7DF5VSGQE"
  })
  
const memberRef = firebase.firestore().collection('Member');
function addUserHealthMetric(requestUserId, data) {
    memberRef.doc(requestUserId).set(transformDataToFireStore(requestUserId,data), { merge: true });
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
      age:20,
      user_id: requestUserId,
    };
    for (let i = 0; i < data.length; i++)
    {
      var data_point_name=data[i]['data_point_name']
      var access_control=data[i]['access_control']
      console.log("access_control: ",access_control);
      console.log("data_point_name",data_point_name)
      for (let j = 0; j < access_control.length; j++)
      {
          console.log("responseData[basePrice][data_point_name]:",responseData.basePrice.data_point_name);
          responseData["Access"][access_control[j].access_name][data_point_name]=access_control[j].access
          responseData["basePrice"][data_point_name] =access_control[j].base_price
      }
    }
    console.log("responseData: ",responseData)
    return responseData;
  }
// //REALTIME GET FUNCTION
// function getUserMember() {
//   // setLoading(true);

//   memberRef
//     .onSnapshot((querySnapshot) => {
//       const items = [];
//       querySnapshot.forEach((doc) => {
//         items.push(doc.data());
//         var c=doc.data();
//         if(c.user_id=="TcB17gKybpPiIdNHZp9NeCxpFbd2")
//         {
//         console.log("Access: ",c['Access']['Government']);
//         // if c['Access']['Government']['master_access']==True || ;
//         const dataPointsList = ['Blood Pressure', 'SpO2', 'RBC Count', 'SGPT', 'SGOT', 'Serum Creatinine', 'HDL-Cholestorol', 'LDL-Cholestorol', 'TSH'];
//         for (var i = 0; i < dataPointsList.length; i++)
//         {   
//             console.log("c: ",key,doc.data());
//             var key=dataPointsList[i]
//             var data_item={
//                 "Data Point Name": key,
//                 "Govt": {
//                     "access": c['Access']['Government']['master_access'] || c['Access']['Government'][key],
//                     "basePrice": c['basePrice'][key]
//                 },
//                 "Commercial": {
//                     "access": c['Access']['Commercial']['master_access'] || c['Access']['Commercial'][key],
//                     "basePrice": c['basePrice'][key]
//                 },
//                 "Academia": {
//                     "access": c['Access']['Academia']['master_access'] || c['Access']['Academia'][key],
//                     "basePrice": c['basePrice'][key]
//                 }
//             }
//             console.log("next...") 
//             items.push(data_item);
//         }   
//         }
//         console.log(items);
//         return items;
//       });
//       // setMember(items);
//       // setLoading(false);
//     });
//     // return items;
// }


// //ADD FUNCTION
// function addUserMember(requestUserId) {
//     // setLoading(true);
//     memberRef.doc(requestUserId).set({foo:'bar'}, {merge: true})
//   }
// const dataPointsList = ['Blood Pressure', 'SpO2', 'RBC Count', 'SGPT', 'SGOT', 'Serum Creatinine', 'HDL-Cholestorol', 'LDL-Cholestorol', 'TSH'];


// // REALTIME GET FUNCTION
// function getMemberDetails(requestDataPoint,filters) {
//     // const snapshot=memberRef.where(Access.Academia.Spo2,false).get();
//     const Buyertype="Government";
//     var snapshot=memberRef
//     if(filters['age'])
//     {
//         var snapshot=snapshot.where('age','>=',filters['age'][0]).where('age','<=',filters['age'][1])
//     }
//     if(filters['conditions'])
//     {
//         var snapshot=snapshot.where("conditions", "in", filters['conditions'])
//     }
//     // .where(`Access.${type}.requestDataPoint` ||, '==', true)


//     if (snapshot.empty) {
//         console.log('No matching documents.');
//         return;
//       }  
//   const q = snapshot.get()
//     .then(snapshot => {
//       snapshot.forEach(doc => {
//         console.log(doc.data())
//       })
//     })
//   }

// // editUserHealthMetric("dsfdsf443fef",{"abc":"fdfdfd"});

// const filters={
//     "age":[25,30],
//     "conditions":["diametic"],
//     "gender":"Male"
// }


// getMemberDetails("ggdgdgd",filters)

// import { getUserDetails } from './FirestoreMember.js'

// getUserDetails()

export async function getUserDetails(requestUserId) {
    const dataPointsObjArray = [];
    const querySnapshot = await memberRef.get();
    console.log("querySnapshot.docs: ",querySnapshot.docs.length)
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
var data=[{
    "data_point_name": 'Blood Pressure',
    "access_control": [{
        "access_name": "Government",
        "access": true,
        "base_price": 100
      },{
        "access_name": "Commercial",
        "access": true,
        "base_price": 200
      },{
        "access_name": "Academia",
        "access": false,
        "base_price": 50
      }
    ],
  }
]
//var x=await getUserDetails("jghj21434")

var profile={
  "profile":{
  "age":23,
  "sex": "i dont get it"
  }
}
const requestUserId="orDQHhsmbyPCe6LKyYW4HxOAJui1"
memberRef.doc(requestUserId).set(profile, { merge: true });

//console.log("x: ",x);


//   "type": "module",