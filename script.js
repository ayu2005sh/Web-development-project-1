const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

let contacts = [];

// Fetch contacts from JSON file (simulate with localStorage for simplicity)
function loadContacts() {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
        contacts = JSON.parse(savedContacts);
    }
    displayContacts();
}

// Save contacts to JSON file (simulate with localStorage)
function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Add a new contact
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const newContact = { id: Date.now(), name, email, phone };
    contacts.push(newContact);
    saveContacts();
    displayContacts();

    contactForm.reset();
});

// Display contacts in the table
function displayContacts() {
    contactList.innerHTML = "";
    contacts.forEach((contact) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>
                <button class="action" onclick="deleteContact(${contact.id})">Delete</button>
            </td>
        `;
        contactList.appendChild(row);
    });
}

// Delete a contact
function deleteContact(id) {
    contacts = contacts.filter((contact) => contact.id !== id);
    saveContacts();
    displayContacts();
}

// Load contacts on page load
loadContacts();
