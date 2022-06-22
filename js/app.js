("use strict");
let postWrapper = document.querySelector("#post-holder");
let title = document.querySelector("#title");
let body = document.querySelector("#body");
let postForm = document.querySelector("#post-form");

let postBox = [];
function getPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      console.log(postBox);
      postBox = data;
      let postHolder = "";
      postBox.forEach((post) => {
        console.log(post);
        postHolder += `
        <div class="container d-flex ">
        <div class="post-container">
        <div class="row" id="post-holder">
          <div class="">
            <div class="card border-1 mx-3 my-2">
              <div class="card-body">    
                    
                <h6 id="post-title">${post.title}</h6>
                <p class="post-body text-break">
                  ${post.body}
                </p>
                <div class="navigate d-flex justify-content-around">                
                    <button type="button" class="text-danger border-0 bg-light" onclick="deletePost(${post.id})">
                    <i class="fa fa-trash"></i>
                    </button>                
                    <button type="button" class="border-0 bg-light text-primary text-capitalize" onclick="updatePost(${post.id})">edit</button>              
                    <button type="button" class="text-success border-0 bg-light" onclick="openSingle(${post.id})">view</button>                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
      </div>`;
      });
      postWrapper.innerHTML = postHolder;
    });
}
getPosts();

postForm.addEventListener("submit", createPost);

function createPost(e) {
  e.preventDefault();

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: title.value,
      body: body.value,
      userId: 2,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      postBox.unshift(data);
      console.log(postBox);
      let postHolder = "";
      postBox.forEach((post) => {
        console.log(post);
        postHolder += ` 
        <div class="container d-flex ">
        <div class="post-container">
        <div class="row" id="post-holder">
          <div class="">
            <div class="card border-1 mx-3 my-2">
              <div class="card-body">    
                    
                <h6 id="post-title">${post.title}</h6>
                <p class="post-body text-break">
                  ${post.body}
                </p>
                <div class="navigate d-flex justify-content-around">                
                    <button type="button" class="text-danger border-0 bg-light" onclick="deletePost(${post.id})">
                    <i class="fa fa-trash"></i>
                    </button>                
                    <button type="button" class="border-0 bg-light text-primary text-capitalize" onclick="updatePost(${post.id})">edit</button>              
                    <button type="button" class="text-success border-0 bg-light" onclick="openSingle(${post.id})">view</button>                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
      </div>`;
      });
      postWrapper.innerHTML = postHolder;
    });
}

function updatePost(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      title: title.value,
      body: body.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let postTitles = document.querySelectorAll("#post-title");
      let postBodies = document.querySelectorAll(".post-body");
      postTitles.forEach((postTitle, element) => {
        if (element + 1 === id) {
          if (data.title !== "") {
            postTitle.innerHTML = data.title;
          }
        }
      });

      postBodies.forEach((postBody, element) => {
        if (element + 1 === id) {
          if (data.body !== "") {
            postBody.innerHTML = data.body;
          }
        }
      });
    });
}
function openSingle(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("viewedPage", JSON.stringify(data));
      window.location.href = "test.html";
    });
}
function deletePost(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      postBox = postBox.filter((post) => post.id !== id);
      console.log(postBox);
      let postHolder = "";
      postBox.forEach((post) => {
        console.log(post);
        postHolder += `
        <div class="container d-flex ">
        <div class="post-container">
        <div class="row" id="post-holder">
          <div class="">
            <div class="card border-1 mx-3 my-2">
              <div class="card-body">    
                    
                <h6 id="post-title">${post.title}</h6>
                <p class="post-body text-break">
                  ${post.body}
                </p>
                <div class="navigate d-flex justify-content-around">                
                    <button type="button" class="text-danger border-0 bg-light" onclick="deletePost(${post.id})">
                    <i class="fa fa-trash"></i>
                    </button>                
                    <button type="button" class="border-0 bg-light text-primary " onclick="updatePost(${post.id})">edit</button>              
                    <button type="button" class="text-success border-0 bg-light" onclick="openSingle(${post.id})">view</button>                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
      </div>`;
      });
      postWrapper.innerHTML = postHolder;
    });
}
