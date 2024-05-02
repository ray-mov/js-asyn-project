
const fetchButton = document.getElementById("promise-btn")
const container = document.getElementById("promise-container")

const messageTitle = document.createElement("h1")
const messageBody = document.createElement("p")

container.appendChild(messageTitle);
container.appendChild(messageBody)

fetchButton.addEventListener("click", fetchPosts)

function fetchPosts() {

  messageTitle.textContent = "Loading ..."

  //defining promise
  fetchData = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject("Operation timed out.")
    }, 5000)


    fetch("https://jsonplaceholder.typicode.com/posts/1").then(
      respose => {
        // if there is respones timer will stop
        clearTimeout(timer)
        return respose.json()
      }
    ).then(result => {
      resolve(result)
    }).catch(error => {
      messageBody.textContent = error;
      console.log(error)
    })
  })

  //handling promise

  fetchData.then(data => {
    messageTitle.textContent = data.title;
    messageBody.textContent = data.body;
  }).catch(error => {
    messageTitle.textContent = error;
  });
}


