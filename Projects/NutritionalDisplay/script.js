
const btn = document.querySelector("button");

btn.addEventListener("click", function fetchNutritionalInfo(event) {

    event.preventDefault();

    const foodItem = document.getElementById("food-input").value;

    fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-app-id": "f7dc4c66",
            "x-app-key": "61e9ba0ffb878223f04b1095b5e2dd5b"
        },
        body: JSON.stringify({ query: foodItem })
    })

    .then(response => response.json())
    .then(data => {
        displayNutritionalInfo(data);
    })
    .catch(error => console.error("Error fetching data:", error));
});

function displayNutritionalInfo(data) {

    const nutritionInfoDiv = document.getElementById("nutrition-info");
    nutritionInfoDiv.innerHTML = '';

    data.foods.forEach( food => {

        const foodName = food.food_name.toUpperCase();

        const info = `
        <h2>${foodName}</h2>
        <p><strong>Serving size:</strong> ${food.serving_qty} ${food.serving_unit} (${food.serving_weight_grams}g)</p>
        <p><strong>Calories:</strong> ${food.nf_calories} kcal </p>
        <p><strong>Protein:</strong> ${food.nf_protein} g</p>
        <p><strong>Carbs:</strong> ${food.nf_total_carbohydrate} g</p>
        <p><strong>Fat:</strong> ${food.nf_total_fat} g</p>
        `;

        nutritionInfoDiv.innerHTML += info;
    });
}

