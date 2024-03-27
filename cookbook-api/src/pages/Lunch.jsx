import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { createClient } from 'contentful';
import DisplayRecipes from '../ui/DisplayRecipes';

function Lunch() {

    const [lunchRecipes, setLunchRecipes] = useState([]);
    const [assets, setAssets] = useState([]);

    // const client = createClient({ space: `${import.meta.env.VITE_contentful_space_id}`, accessToken: `${import.meta.env.VITE_contentful_delivery_api_key}`});


//     useEffect(() => {
//     async function fetchData() {

//         try {
//           await client.getEntries().then((data) => {
//             const filteredRecipes = data.items.filter(recipe => recipe.fields.typeOfFood === 2);
//             console.log(filteredRecipes)
//             setLunchRecipes(filteredRecipes);
//           });

//         } catch (error) {
//           console.error(error);
//         }

//       }
  
//       fetchData();
//     }, []);

//     return (
//         <div className="recipe-card-container">
//         {lunchRecipes?.map((recipe) => (
//             <Link key={recipe.sys.id} to={`/${recipe.sys.id}`}>
//                 <DisplayRecipes recipe={recipe} />
//             </Link>
//         ))}
//         </div>
//     );
  
// }

useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch(import.meta.env.VITE_SERVER_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data.includes.Asset);
            setAssets(data.includes.Asset);
            const filteredRecipes = data.items.filter(item => item.fields.typeOfFood === 2);
            console.log(filteredRecipes)
            setLunchRecipes(filteredRecipes);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchData();
}, []);

return (
    <div className="recipe-card-container">
        {lunchRecipes.map(recipe => {
            const asset = assets.find(asset => asset.fields.title === recipe.fields.title);
            if (!asset) return null; // Skip if asset not found
            return (
                <Link key={recipe.metadata.sys.id} to={`/${recipe.metadata.sys.id}`}>
                    <DisplayRecipes recipeAsset={asset.fields} />
                </Link>
            );
        })}
    </div>
);
}

export default Lunch;
