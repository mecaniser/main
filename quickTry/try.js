const posts = [
  { title: "Post one", body: "This is my body text content" },
  { title: "Post two", body: "This is my body text content and I am post 2" },
];

const getPost = (post) => {
  setTimeout(() => {
    let appendTo = "";
    posts.forEach((post, index) => {
      appendTo += `<li>${post.title}</li>`;
    });
    document.getElementById("post").innerHTML = appendTo;
  }, 1000);
};

const createPost = (newPost) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(newPost);
      const error = false;

      if (!error) {
        resolve();
      } else {
        reject("Error: Something went wrong");
      }
    }, 2000);
  });
};
createPost({
  title: "Post 3 just created",
  body: "This is my content of post # 3",
}).then(getPost);
