const form = document.getElementById("form");
const input = document.querySelector("input");
const linkWrapper = document.querySelector(".link-wrapper");
const errorDiv = document.querySelector(".error");
const shortenedLink = document.querySelector(".short-link");
const hitsDiv = document.querySelector(".hits");
const updateForm = document.querySelector(".update-url");
const newUrlInput = document.querySelector("#new-url");

const handleSubmit = async () => {
  let url = input.value;
  const response = await fetch("http://localhost:3001/link", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ url }),
  }).then((response) => response.json());

  if (response.type == "failure") {
    input.style.border = "2px solid red";
    errorDiv.textContent = `${response.message}, please try another one!`;
  }
  if (response.type == "success") {
    linkWrapper.style.opacity = 1;
    linkWrapper.style.transform = "scale(1)";
    linkWrapper.style.display = "flex";
    shortenedLink.textContent = response.message;
    hitsDiv.textContent = "Hits: 0";
    updateForm.style.display = "block";
  }
};

const clearFields = () => {
  input.value = "";
  errorDiv.textContent = "";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit();
  clearFields();
});

// Update URL
const updateUrl = async (shortId) => {
  const url = newUrlInput.value;

  if (!url) {
    return;
  }

  const response = await fetch(`http://localhost:3001/${shortId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({ url }),
  }).then((response) => response.json());

  if (response.type === "success") {
    shortenedLink.textContent = response.message;
  } else {
    alert(response.message);
  }
};

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  updateUrl(shortenedLink.textContent.split("/").pop());
  newUrlInput.value = "";
  updateForm.style.display = "none";
});

const getUrls = async () => {
  const response = await fetch("http://localhost:3001/urls");
  const data = await response.json();

  const urlsTableBody = document.querySelector(".previous-urls tbody");
  urlsTableBody.innerHTML = "";

  data.forEach((url) => {
    const tr = document.createElement("tr");
    const shortUrlTd = document.createElement("td");
    const originalUrlTd = document.createElement("td");
    const hitsTd = document.createElement("td");

    const shortUrlLink = document.createElement("a");
    shortUrlLink.href = `http://localhost:3001/${url.id}`;
    shortUrlLink.textContent = `http://localhost:3001/${url.id}`;

    const originalUrlLink = document.createElement("a");
    originalUrlLink.href = url.url;
    originalUrlLink.textContent = url.url;

    shortUrlTd.appendChild(shortUrlLink);
    originalUrlTd.appendChild(originalUrlLink);
    hitsTd.textContent = url.hits;

    tr.appendChild(shortUrlTd);
    tr.appendChild(originalUrlTd);
    tr.appendChild(hitsTd);

    urlsTableBody.appendChild(tr);
  });
};

getUrls();
setInterval(getUrls, 30000);
