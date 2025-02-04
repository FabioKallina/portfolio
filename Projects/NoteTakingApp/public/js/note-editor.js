
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".note-form");
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);
        const noteId = formData.get("noteId"); // If you"ve added a hidden field for the ID
        const title = formData.get("title");
        const text = formData.get("text");

        console.log("Note ID:", noteId);


        // Assuming you"re sending JSON, if not, you can remove this part
        const data = {
            title: title,
            text: text
        };

        console.log(`Update route hit: ${noteId}`);

        try {
            const response = await fetch(`/notes/${noteId}`, {
                method: "PUT",  // or use "POST" if you"re using the method override
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log("Note updated successfully:", result);
            // Here you can redirect or show a success message
            window.location.href = "/notes"; // Redirect back to notes list
        } catch (error) {
            console.error("Error updating note:", error);
            // Show error message to user
            alert("Failed to update note. Please try again.");
        }
    });

    //Function to allow "Tab" to create an indent in the text-area
    const textArea = document.querySelector(".text-area");

    textArea.addEventListener("keydown", function(event) {

        if (event.key === "Tab") {
            event.preventDefault(); //Prevents default which is moving focus to the next element

            const start = this.selectionStart;
            const end = this.selectionEnd;

            //Insert tab space
            const tabSpace = "    " //4 spaces
            this.value = this.value.substring(0, start) + tabSpace + this.value.substring(end);

            //Move cursor after inserted tab
            this.selectionStart = this.selectionEnd = start + tabSpace.length;

        }

    });


});