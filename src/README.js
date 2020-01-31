//Vahan Muradyan
//HOW USE MY COD 
//EXAMPLES

import React from "react";
import firebase from "./firebase";

function TestFirebase() {
//similarly "login" , "logout", "resetPassword" register <name, email, password>
//Example!
firebase.register("Person2", "Person2@mail.ru", "123456")

//create new collection and data. onCreate <data{}, collection>
//Example!
firebase.onCreate({name: "NewPerson1", age: 25}, "user")

//set default collection and you can not write it every time
//Example!
firebase.defCollection = "user"
firebase.onCreate({name: "NewPerson2", age: 26})

//create "DocumentReference" how much you need. ref <id, collection>
//Example!
const ref1 = firebase.ref("LuiBrZjxvaql8vgoH67R","user")
const ref2 = firebase.ref("veW6XAJMls2cVFZiMtwB","user")
const refWithDefCollection = firebase.ref("Xs6CJ4EE8dt6zcnsfuaV"/*,default "user"!*/)

//can use ref.get() or set()
//Example!
ref1.get().then(data => console.log(data.data()))

//or use getDataViaRef <reference>
//Example!
const data0 = firebase.getDataViaRef(ref1)
console.log("data0", data0.then(d=>console.log(d)))

//similarly without reference. getData <id, collection>
//Example!
const data1 = firebase.getData("5tIS1B56z4zowCcItiqk","user")
console.log("data1", data1.then(d=>console.log(d)))

//or use default collection name
//Example!
const data2 = firebase.getData("5tIS1B56z4zowCcItiqk"/*,default "user"!*/)
console.log("data2",data2.then(d=>console.log(d)))

// use "DocumentReferences" for update/delete. onUpdateViaRef <data{}, reference>
//Example!
firebase.onUpdateViaRef({name: "Max", age: 14}, ref1) 
firebase.onDeleteViaRef(ref2)

// update/delete without "DocumentReferences". onUpdate <data{}, id, collection>
//Example!
firebase.onUpdate({name: "artur", age: 15},"yXauPLDPlFdE0o0isbig", "user")
firebase.onDelete("yXauPLDPlFdE0o0isbig","user")

// if you set default collection then similarly you can use it. onUpdate <data{}, id>
//Example!
firebase.onUpdate({name: "artur", age: 15},"yXauPLDPlFdE0o0isbig"/*,default "user"!*/)
firebase.onDelete("yXauPLDPlFdE0o0isbig"/*,default "user"!*/)

return (<div>Testing....</div>);
}

export default TestFirebase;
