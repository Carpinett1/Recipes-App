import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../../context/context';
import Header from '../../components/Header/Header';
import searchIcon from '../../images/searchIcon.svg';
import profileIcon from '../../images/profileIcon.svg';
import plateIcon from '../../images/icone-prato.png';
import drinkIcon from '../../images/icone-bebida.png';
import Footer from '../../components/Footer/Footer';

function Recipes() {
  const {
    mealInf,
    loadingMeals,
    drinkInf,
    loadingDrink,
    mealCategories,
    drinksCategories,
    setButtonName,
    buttonName,
  } = useContext(Context);

  const location = useLocation();

  const [isMeal, setRecipeType] = useState(location.pathname === '/meals');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(isMeal ? mealCategories : drinksCategories);
  }, [isMeal, mealCategories, drinksCategories]);

  const getTwelveRecipes = () => {
    let recipesToDisplay = isMeal ? mealInf : drinkInf;

    if (buttonName) {
      recipesToDisplay = recipesToDisplay.filter(
        (recipe) => ('strCategory' in recipe) && recipe.strCategory === buttonName,
      );
    }
    if (recipesToDisplay.length >= 12) {
      return recipesToDisplay.slice(0, 12);
    }
    return recipesToDisplay;
  };

  const twelveRecipes = getTwelveRecipes();
  const headerTitle = isMeal ? 'Meals' : 'Drinks';
  const iconTitle = isMeal ? plateIcon : drinkIcon;

  const getFiveCategories = () => {
    return categories.slice(0, 5);
  };

  const fiveCategories = getFiveCategories();

  const handleCategories = (category: string) => {
    setButtonName(category);
  };

  if (loadingMeals || loadingDrink) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header
        title={ headerTitle }
        searchIcon={ searchIcon }
        profileIcon={ profileIcon }
        iconTitle={ iconTitle }
      />
      <div>
        {fiveCategories.map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category}-category-filter` }
            onClick={ () => handleCategories(category) }
          >
            {category}
          </button>
        ))}
      </div>
      <div className="cards">
        {twelveRecipes.map((recipe, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="recipe-card"
          >
            <span data-testid={ `${index}-card-name` }>
              {('strMeal' in recipe) ? recipe.strMeal : recipe.strDrink}
            </span>
            <img
              src={ ('strMealThumb' in recipe)
                ? recipe.strMealThumb
                : recipe.strDrinkThumb }
              alt={ ('strMeal' in recipe) ? recipe.strMeal : recipe.strDrink }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
      </div>
      <Footer setRecipeType={ setRecipeType } />
    </div>
  );
}

export default Recipes;
