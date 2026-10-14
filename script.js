const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

let notes = [];

function render() {
    list.replaceChildren();

    notes.forEach((note) => {
        const li = document.createElement("li");
        li.classList.add("note", `category-${note.category}`);

        const text = document.createElement("p");
        text.classList.add("note-text");
        text.textContent = note.text;

        const meta = document.createElement("div");
        meta.classList.add("note-meta");

        const category = document.createElement("span");
        category.classList.add("category-label");
        category.textContent =
            note.category.charAt(0).toUpperCase() + note.category.slice(1);

        const date = document.createElement("time");
        date.textContent = note.createdAt;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";

        meta.append(category, date);
        li.append(text, meta, deleteButton);
        list.appendChild(li);
    });

    if (notes.length === 0) {
        count.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        count.textContent = "You have 1 note.";
    } else {
        count.textContent = `You have ${notes.length} notes.`;
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();
    const category = categoryInput.value;

    if (!text) {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
        return;
    }

    const note = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);
    input.value = "";
    errorMessage.textContent = "";

    render();
    input.focus();
});

render();