import app from 'firebase/app';
import 'firebase/auth'; // authentication
import 'firebase/firestore';
import 'firebase/storage'
import firebaseConfig from './config';
class Ref{
  constructor(id, collectionName){
    this.id = id;
    this.collectionName = collectionName
    this.call = (callback)=> callback(this.id, this.collectionName)
  }
}

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.storeRef = app.storage().ref()
    this.db = app.firestore();
    this.defCollection = "";
  }
  
  uploadImg = async (path, file) => {
    const storeRef = this.storeRef.child(path)
    const fileData = new Blob([file], {type : 'image/jpeg'})
    return await storeRef.put(fileData)
  }
  delete = async (path) =>{
   const storeRef = this.storeRef.child(path)
   return await storeRef.delete()
  }

  ref =  (id, collectionName) => {
    const createRef = new Ref(id, collectionName)
    return  createRef.call((id, collectionName = this.defCollection)=>
    this.db.collection(collectionName).doc(id));
  }
  getDataViaRef = async (ref) => 
    await ref.get().then(data => data.data())
  
   
  getData = async (id, collectionName = this.defCollection) =>{
    const ref =  this.ref(id, collectionName)   
        return ref.get().then(data => data.data())
  }

  //----------CREATE--------------------------------------------
  onCreate= async (data={}, collectionName= this.defCollection) => 
  this.db.collection(collectionName).add(data)
   
   //-------UPDATE---------------------------------------------
   onUpdateViaRef = async (data={},ref)=>{
    try {
      const doc = await ref.get();
      if(doc.exists){
       ref.update(data)
      }
    }
    catch(error){
      console.log(error)
    }
 }

   onUpdate = async (data={}, id, collectionName = this.defCollection) => {
   const ref =  this.ref(id, collectionName)
    try {
      const doc = await ref.get();
      if(doc.exists){
       ref.update(data)
      }
    }
    catch(error){
      console.log(error)
    }
   } 
   //--------------------------------------------------------------
   //--------DELETE------------------------------------------------
   onDeleteViaRef = async (ref) =>{
    try {
      const doc = await ref.get();
      if(doc.exists){
        ref.delete()
      }
    }
    catch(error){
      console.log(error)
    }
   }

   onDelete = async (id, collectionName = this.defCollection) =>{
   const ref =  this.ref(id, collectionName)
    try {
      const doc = await ref.get();
      if(doc.exists){
       ref.delete()
      }
    }
    catch(error){
      console.log(error)
    }
   } 
   //-------------------------AUTH-------------
   register = async (name, email, password) => {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password)
    return await newUser.user.updateProfile({ displayName: name })
  }

    login = async(email, password) => {
   return await this.auth.signInWithEmailAndPassword(email, password)
  }

    logout = async () => {
    return await this.auth.signOut()
  }
    resetPassword = async () => {
    await this.auth.sendPasswordResetEmail();
  }
}
//-------------------------------------------------


export default new Firebase();