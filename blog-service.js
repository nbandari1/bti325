/********************************************************************************** 
 * BTI325 – Assignment 04* I declare that this assignment is my own work in accordance with Seneca 
 * Academic Policy. No part* of this assignment has been copied manually or electronically from any 
 * other source* (including 3rd party web sites) or distributed to other students.
 * ** Name: Nishnath Bandari ID: 105202220 Date: 2023-10-20** 
 * *********************************************************************************/

const fs = require('fs').promises;

let posts = [];
let categories = [];

module.exports.initialize = () => {
  return new Promise(async function(resolve, reject) {
      try {
          await readPosts();
          await readCategories();
          resolve();
      }
      catch {
          reject("Error reading files");
      }
  })
}
function readPosts() {
  return new Promise ((resolve, reject) => {
      fs.readFile('data/posts.json', 'utf-8', (error, data) => {
          let postData = JSON.parse(data);
          posts = postData;
          resolve();
      })
  })
}
  module.exports.getAllPosts = function(){
    return new Promise((resolve,reject)=>{
        (posts.length > 0 ) ? resolve(posts) : reject("no results returned"); 
    });
}
function readCategories() {
  return new Promise ((resolve, reject) => {
      fs.readFile('data/categories.json', 'utf-8', (error, data) => {
          let categoryData = JSON.parse(data);
          categories = categoryData;
          resolve();
      })
  })
} 

module.exports.getPublishedPosts = function(){
  return new Promise((resolve,reject)=>{
      let pposts = posts.filter(post => post.published == true);
      if (pposts.length > 0){
        resolve(pposts);
      }
      else {
        reject("No published posts returned");
      }
  });
}

module.exports.getCategories = function(){
  return new Promise((resolve,reject)=>{
      (categories.length > 0 ) ? resolve(categories) : reject("no results returned"); 
  });
}

  module.exports.addPost(postData) = function(){
    return new Promise((resolve, reject)=>{
      let newPost = {};
        // assign id
        newPost.id = posts.length + 1;
        // store body
        newPost.body = postData.body;
        // store title
        newPost.title = postData.title;
        // assign postDate
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        newPost.postDate = formattedDate;
        // assign category
        newPost.category = Number(postData.category);
        // add featureImage
        newPost.featureImage = postData.featureImage;
        // assign published
        postData.published ? newPost.published = true : newPost.published = false;
        posts.push(newPost);
        resolve(newPost);
    });
  }
  module.exports.getPostsByCategory(category)= function(){
    return new Promise((resolve, reject) => {
      const filteredPosts = posts.filter(post => post.category === category);
      if (filteredPosts.length > 0) {
        resolve(filteredPosts);
      } else {
        reject(new Error('No results returned'));
      }
    });
  }
  module.exports.getPostsByMinDate(minDateStr)= function(){
    return new Promise((resolve, reject) => {
      const filteredPosts = posts.filter(post => moment(post.postDate).isSameOrAfter(moment(minDateStr), 'day'));
      if (filterPosts.length > 0){
        const somePostObj = filteredPosts[0];
        if(new Date(somePostObj.postDate) >= new Date(minDateStr)){
          console.log("The postDate value is greater than minDateStr");
         resolve(filteredPosts);
       } 
      }
      else {
        console.log('No results returned');
        reject(filteredPosts);
      }
    });
  }
  module.exports. getPostById(id)= function(){
    return new Promise((resolve, reject) => {
      const post = posts.find(post => post.id === id);
      if (post) {
        resolve(post);
      } else {
        reject(new Error('No result returned'));
      }
    });
  }
  module.exports.getPubishedPostsByCategory = (category) => {
    return new Promise ((resolve, reject) => {
      let publishedPosts = posts.filter(post => 
        post.published == true & 
        post.category == category);
      if (publishedPosts.length > 0) {
        resolve(publishedPosts);
      }
      else {
        reject("No published posts in that category returned");
      }
    })
  }
