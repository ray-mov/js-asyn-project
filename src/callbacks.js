

const timerText = document.getElementById("timer-text");
const timer = document.getElementById("timer");

function callbackRequest() {
  let time = 1000
  timerText.innerHTML = `"Posts will be shown after 5 sec delay"`
  for (let i = 5; i > 0; i--) {
    setTimeout(() => {
      showTimer(i)
    }, time);
    time += 1000
    console.log(i)
  }

  setTimeout(() => {
    const timerContainer = document.getElementById("timer-container")
    timerContainer.style.display = "none"
    fetchPost();
  }, 5500);
}

function showTimer(i) {
  timer.innerHTML = i
}

function fetchPost() {
  const posts = fetch("https://dummyjson.com/posts?limit=10")

  posts.then(
    response => response.json()
  ).then((result) => {
    console.log(result.posts)
    const list = document.getElementById("posts-list")
    for (const post of result.posts) {
      const postItem = document.createElement("li")
      const postTitle = document.createElement("h1")
      const postBody = document.createElement("p")
      postTitle.textContent = post.title;
      postBody.textContent = post.body;
      postItem.appendChild(postTitle);
      postItem.appendChild(postBody)
      list.appendChild(postItem);
    }
  }).catch(error => console.log(error))

}