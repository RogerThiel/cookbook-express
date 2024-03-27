// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// // import { createClient } from 'contentful';
// import DisplayRecipes from '../ui/DisplayRecipes';

// function Breakfast() {

//     const [breakfastRecipes, setBreakfastRecipes] = useState([]);

//     // const client = createClient({ space: `${import.meta.env.VITE_contentful_space_id}`, accessToken: `${import.meta.env.VITE_contentful_delivery_api_key}`});

//     useEffect(() => {
//     async function fetchData() {

//         try {
//           await client.getEntries().then((data) => {
//             const filteredRecipes = data.items.filter(recipe => recipe.fields.typeOfFood === 1);
//             console.log(filteredRecipes)
//             setBreakfastRecipes(filteredRecipes);
//           });

//         } catch (error) {
//           console.error(error);
//         }
//       }
  
//       fetchData();
//     }, []);

//     return (
//         <div className="recipe-card-container">
//         {breakfastRecipes?.map((recipe) => (
//             <Link key={recipe.sys.id} to={`/${recipe.sys.id}`}>
//                 <DisplayRecipes recipe={recipe} />
//             </Link>
//         ))}
//         </div>
//     );
// }

// export default Breakfast;

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Breakfast() {
    const [breakfastRecipes, setBreakfastRecipes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(import.meta.env.VITE_SERVER_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                const filteredRecipes = data.items.filter(recipe => recipe.fields.typeOfFood === 1);
                console.log(filteredRecipes);
                setBreakfastRecipes(filteredRecipes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
  
        fetchData();
    }, []);

    return (
        <div className="recipe-card-container">
            {breakfastRecipes.map(recipe => (
                <Link key={recipe.id} to={`/${recipe.id}`}>
                    <div className='recipe-card'>
                        <figcaption className="recipe-caption">{recipe.title}</figcaption>
                        <img className="recipe-image" src={recipe.image} alt={recipe.title} />
                        <div className="recipe-teaser">{recipe.description}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Breakfast;
