function renderSingle() {
  let newObject = localStorage.getItem("viewedPage");
  let post = JSON.parse(newObject);

  document.getElementById("post-title").innerHTML = post.title;
  document.querySelector(".post-body").innerHTML = post.body;
}

renderSingle();
