const endorsementContainer = document.getElementById("endorsement-container");
const endorsementFormEl = document.getElementById("endorsement-form");

const postsFromLocalStorage = JSON.parse(localStorage.getItem("postArray"));

let postArray = [];
if (postsFromLocalStorage) {
  postArray = postsFromLocalStorage;
}

renderPosts();
function createElements() {
  const postWrapper = document.createElement("div");
  postWrapper.classList.add("post");

  const postReceiver = document.createElement("h3");
  const postBody = document.createElement("p");
  const divFlex = document.createElement("div");
  divFlex.classList.add("flex");

  const postSender = document.createElement("h3");
  const likeIcon = document.createElement("span");
  likeIcon.textContent = "❤️ ";

  const numsLike = document.createElement("p");

  const likeWrapper = document.createElement("div");
  likeWrapper.classList.add("post-like", "flex");
  likeWrapper.append(likeIcon, numsLike);

  divFlex.append(postSender, likeWrapper);
  postWrapper.append(postReceiver, postBody, divFlex);

  return {
    postWrapper,
    postReceiver,
    postBody,
    postSender,
    numsLike,
    likeWrapper,
  };
}

// Save posts to localStorage
function savePostsToLocalStorage(postArray) {
  localStorage.setItem("postArray", JSON.stringify(postArray));
}

// Handle form submission
endorsementFormEl.addEventListener("submit", function (event) {
  event.preventDefault();

  const endorsementEl = document.getElementById("endorsement");
  const fromEl = document.getElementById("from");
  const toEl = document.getElementById("to");

  const newPost = {
    to: toEl.value,
    body: endorsementEl.value,
    from: fromEl.value,
    likes: 0,
    liked: false,
  };

  postArray.unshift(newPost);
  savePostsToLocalStorage(postArray);

  endorsementEl.value = "";
  fromEl.value = "";
  toEl.value = "";

  renderPosts();
});

// Handle like click
document.addEventListener("click", function (e) {
  const likeWrapper = e.target.closest(".post-like");
  if (likeWrapper && likeWrapper.dataset.index !== undefined) {
    const index = Number(likeWrapper.dataset.index);
    postArray[index].liked = !postArray[index].liked;
    postArray[index].likes += postArray[index].liked ? 1 : -1;

    savePostsToLocalStorage(postArray);
    renderPosts();
  }
});

// Render all posts
function renderPosts() {
  endorsementContainer.innerHTML = "";

  postArray.forEach((post, index) => {
    const {
      postWrapper,
      postReceiver,
      postBody,
      postSender,
      numsLike,
      likeWrapper,
    } = createElements();

    postReceiver.textContent = `To ${post.to}`;
    postBody.textContent = post.body;
    postSender.textContent = `From ${post.from}`;
    numsLike.textContent = post.likes;
    likeWrapper.dataset.index = index;
    postWrapper.dataset.index = index;

    endorsementContainer.appendChild(postWrapper);
  });
}
renderPosts();

// Handle double-click to delete a post
document.addEventListener("dblclick", function (e) {
  const postWrapper = e.target.closest(".post");
  if (postWrapper && postWrapper.dataset.index !== undefined) {
    const index = Number(postWrapper.dataset.index);
    postArray.splice(index, 1);
    savePostsToLocalStorage(postArray);
    renderPosts();
  }
});
