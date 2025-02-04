
document.addEventListener("DOMContentLoaded", () => {


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