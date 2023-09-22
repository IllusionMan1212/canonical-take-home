const url = "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json"; 

function fetchPosts() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((post) => {
        insertHTML(post);
      });
    });
}

function insertHTML(post) {
  const postsDiv = document.getElementById("posts");

  const postDiv = document.createElement("div");
  postDiv.classList.add("col-3");
  postDiv.style.display = "flex";

  const localDate = new Date(`${post.date_gmt}Z`);
  const localDateString = localDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const groupOrTopic = post._embedded["wp:term"][2][0]?.name ?? post._embedded["wp:term"][1][0].name;

  postDiv.innerHTML += `
    <div class="p-card--highlighted u-no-padding card">
      <hr class="p-rule--highlight purple-highlight">
      <div class="p-card__inner card-header">
        <p style="font-weight: 300" class="p-text--small-caps u-no-padding u-no-margin">
          ${groupOrTopic}
        </p>
      </div>
      <hr style="width: 95%" class="p-rule--muted">
      <div style="flex-grow: 1" class="p-card__inner">
        <img class="p-card__image" src="${post.featured_media}">
        <a href="${post.link}">
          <h3 style="font-weight: 300">
            ${post.title.rendered}
          </h3>
        </a>
        <p>
          <em style="font-weight: 300">By <a href="${post._embedded.author[0].link}">
            ${post._embedded.author[0].name}</a> on ${localDateString}
          </em>
        </p>
      </div>
      <hr style="width: 95%" class="p-rule--muted">
      <div class="p-card__inner">
        <p style="font-weight: 200" class="p-text--small u-padding--top u-no-margin">
          ${post._embedded["wp:term"][0][0].name}
        </p>
      </div>
    </div>
  `;

  postsDiv.appendChild(postDiv);
}
