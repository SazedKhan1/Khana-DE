const loadFood = (search) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then(res => res.json())
        .then(data => displayFood(data.meals))
}
const displayFood = (meals) => {
    const foodContainer = document.getElementById("food-list");
    foodContainer.innerHTML = ``;
    for (meal of meals) {
        console.log(meal);
        const mealDiv = document.createElement("div");
        mealDiv.classList.add("col")
        mealDiv.innerHTML = `
            <div class="card" onclick="loadFoodDetails(${meal.idMeal})">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-info">${meal.strMeal}</h5>
                         <p class="card-text">${meal.strInstructions.slice(0, 250)}</p>
                    </div>
             </div>
        `;
        foodContainer.appendChild(mealDiv)
    }
}
const searchFood = () => {
    const searchField = document.getElementById("searchField");
    const searchText = searchField.value;
    loadFood(searchText);
    searchField.value = ``;

}
const loadFoodDetails = (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoodDetails(data.meals[0]))
}

const displayFoodDetails = meal => {
    const displayFoodContainer = document.getElementById("food-details-container");
    displayFoodContainer.innerHTML = ``;
    const foodDetailsDiv = document.createElement("div");
    foodDetailsDiv.classList.add("card")
    foodDetailsDiv.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title text-success">Dish Name: ${meal.strMeal}</h5>
      <h4 class="text-danger"> Famous : ${meal.strArea}</h4>
      <h5 class="card-title"> Price: 100$</h5>
      <p class="card-text">For watching full receipe click on watch video button</p>
      <a href="${meal.strYoutube}" target="_blank"class="btn btn-primary">Watch video</a>
    </div>
    `;
    displayFoodContainer.appendChild(foodDetailsDiv)
}

loadFood(``);