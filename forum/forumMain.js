// Select DOM elements
const postModal = document.getElementById("postModal");
const createPostBtn = document.getElementById("createPostBtn");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");
const postsContainer = document.getElementById("posts");

// Open modal
createPostBtn.addEventListener("click", () => {
  postModal.classList.remove("hidden");
});

// Close modal
cancelBtn.addEventListener("click", () => {
  postModal.classList.add("hidden");
});

// Save post
saveBtn.addEventListener("click", () => {
  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;

  if (title && content) {
    // Create a new post element
    const newPost = document.createElement("div");
    newPost.classList.add("bg-white", "shadow-md", "p-4", "rounded", "mt-4");
    newPost.innerHTML = `
      <h2 class="text-xl font-bold">${title}</h2>
      <p class="text-gray-600">${content}</p>
      <div class="mt-4 flex space-x-4">
        <button class="px-4 py-2 bg-gray-200 rounded">Like</button>
        <button class="px-4 py-2 bg-gray-200 rounded">Comment</button>
      </div>
    `;

    // Append to posts container
    postsContainer.appendChild(newPost);

    // Clear form and close modal
    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";
    postModal.classList.add("hidden");
  } else {
    alert("Please fill in all fields.");
  }
});