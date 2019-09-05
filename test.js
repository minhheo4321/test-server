console.log('load this file pls :"<');
const express = require('express');
const path = require('path');
const fs = require('fs');
// const _json = require('./user.json');

// fs.readFile('./user.json', 'utf8', (err, jsonString) => {
//     if (err) {
//         return console.log("File read failed:")
//     };
//     console.log('File data:', jsonString);
// });

var writeJson = require('./user.json');
var userList = writeJson.userList;
console.log(userList);


const data = {
    name: "John Doe",
    age: 32,
    title: "Vice President of JavaScript"
}

const jsonStr = JSON.stringify(data);

console.log(jsonStr);

// fs.readFile('user.json', (error, data) => {
//     if (error) {
//       return console.log('cant read file');
//     };
//     let userList = JSON.parse(data);
//     console.log(userList);
//   });

// fs.writeFile('./newData.json', jsonStr, err => {
//     if (err) {
//         console.log('error');
//     } else {
//         console.log('write succeed');
//     }
// });

// writeJson = JSON.stringify({ userList });
//   fs.writeFile("user.json", writeJson, 'utf8', (err) => {
//     if (err) {
//         console.log("error writing json");
//         return console.log(err);
//     } 
//     console.log("write succeed");
//   });