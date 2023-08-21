import { useContext, useState } from 'react';
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
  } = useContext(Context);

  const location = useLocation();

  const [isMeal, setRecipeType] = useState(location.pathname === '/meals');

  if (loadingMeals || loadingDrink) {
    return <div>Loading...</div>;
  }

  const getTwelveRecipes = () => {
    if (isMeal && mealInf && mealInf.length > 0) {
      return mealInf.slice(0, 12);
    }
    if (!isMeal && drinkInf && drinkInf.length > 0) {
      return drinkInf.slice(0, 12);
    }
    return [];
  };

  const twelveRecipes = getTwelveRecipes();
  const headerTitle = isMeal ? 'Meals' : 'Drinks';
  const iconTitle = isMeal ? plateIcon : drinkIcon;

  return (
    <div>
      <Header
        title={ headerTitle }
        searchIcon={ searchIcon }
        profileIcon={ profileIcon }
        iconTitle={ iconTitle }
      />
      <div className="cards">
        {twelveRecipes.map((recipe, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="recipe-card"
          >
            <span
              data-testid={ `${index}-card-name` }
            >
              {('strMeal' in recipe) ? recipe.strMeal : recipe.strDrink}
            </span>
            <img
              src={ ('strMealThumb' in recipe)
                ? recipe.strMealThumb
                : recipe.strDrinkThumb }
              alt={ ('strMeal' in recipe)
                ? recipe.strMeal
                : recipe.strDrink }
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