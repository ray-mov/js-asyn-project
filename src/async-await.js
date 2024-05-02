
const asyncAwaitButton = document.querySelector(".asyncAwaitBtn")
const postList = document.getElementById("asynWait-posts")

asyncAwaitButton.addEventListener("click", fetchData)

async function fetchData() {

  const loading = document.createElement("li")
  const errorMesage = document.createElement("li")
  loading.textContent = "Loading..."
  loading.style.textAlign = "center"
  errorMesage.style.textAlign = "center"
  loading.classList.add("async-load")
  postList.appendChild(loading)


  // instance of AbortController
  const controller = new AbortController();
  const signal = controller.signal;


  // Setting  timeout 
  const timer = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const response = await fetch("https://dummyjson.com/posts?limit=10", { signal })

    if (!response.ok) {
      loading.textContent = "Connection Error"
    } else {
      loading.remove()
      errorMesage.remove()
      //remove timer 
      clearTimeout(timer);
    }

    const data = await response.json()

    //displaying data 
    for (const post of data.posts) {
      const postItem = document.createElement("li")
      const postTitle = document.createElement("h1")
      const postBody = document.createElement("p")
      postTitle.textContent = post.title;
      postBody.textContent = post.body;
      postItem.appendChild(postTitle);
      postItem.appendChild(postBody)
      postList.appendChild(postItem);
    }
  } catch (err) {
    postList.appendChild(errorMesage)
    errorMesage.textContent = `${err.name}: ${err.message}`;
    if (err.name === 'AbortError') {
      loading.textContent = "Request timed out";
    } else {
      loading.textContent = "Connection Error";
    }
  }


}