const apiUrl = "https://localhost:7260/api/Contact";

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phoneNumber");
const emailInput = document.getElementById("email");
const contactList = document.getElementById("contactList");
const searchInput = document.getElementById("searchInput");

let editingId = null;

// تحميل كل جهات الاتصال
async function loadContacts() {
    try {
        const res = await fetch(apiUrl);
        const contacts = await res.json();
        contacts.sort((a, b) => a.name.localeCompare(b.name)); // ترتيب أبجدي
        renderContacts(contacts);
    } catch (err) {
        console.error("Error loading contacts:", err);
    }
}

// عرض القائمة
function renderContacts(contacts) {
    contactList.innerHTML = "";
    contacts.forEach(contact => {
        const li = document.createElement("li");
        li.innerHTML = `
      <strong>${contact.name}</strong><br>
      📞 ${contact.phoneNumber} <br>
      📧 ${contact.email}
      <div>
        <button onclick="editContact(${contact.id}, '${contact.name}', '${contact.phoneNumber}', '${contact.email}')">Edit</button>
        <button onclick="deleteContact(${contact.id})">Delete</button>
      </div>
    `;
        contactList.appendChild(li);
    });
}

// إضافة أو تعديل جهة اتصال
contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const contact = {
        name: nameInput.value,
        phoneNumber: phoneInput.value,
        email: emailInput.value
    };

    try {
        if (editingId) {
            contact.id = editingId;

            await fetch(`${apiUrl}/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contact)
            });
        } else {
            await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contact)
            });
        }

        editingId = null;
        document.getElementById("submitBtn").innerText = "Add Contact";
        contactForm.reset();
        loadContacts();
    } catch (err) {
        console.error("Error saving contact:", err);
    }
});

// حذف جهة اتصال
async function deleteContact(id) {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    try {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        loadContacts();
    } catch (err) {
        console.error("Error deleting contact:", err);
    }
}

// تعبئة النموذج للتعديل
function editContact(id, name, phone, email) {
    editingId = id;
    nameInput.value = name;
    phoneInput.value = phone;
    emailInput.value = email;
    document.getElementById("submitBtn").innerText = "Update Contact";
}

// البحث المباشر
searchInput.addEventListener("input", async () => {
    const query = searchInput.value;
    if (query === "") {
        loadContacts();
        return;
    }

    try {
        const res = await fetch(`${apiUrl}/search?query=${encodeURIComponent(query)}`);
        const results = await res.json();
        results.sort((a, b) => a.name.localeCompare(b.name));
        renderContacts(results);
    } catch (err) {
        console.error("Error searching contacts:", err);
    }
});

// تحميل أولي
loadContacts();
