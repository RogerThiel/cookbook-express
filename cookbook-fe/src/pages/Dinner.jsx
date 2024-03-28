import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { createClient } from 'contentful';
import DisplayRecipes from '../ui/DisplayRecipes';

function Dinner() {

    const [dinnerRecipes, setDinnerRecipes] = useState([]);
    const [assets, setAssets] = useState([]);

    // const client = createClient({ space: `${import.meta.env.VITE_contentful_space_id}`, accessToken: `${import.meta.env.VITE_contentful_delivery_api_key}`});

useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch(import.meta.env.VITE_SERVER_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Assets:', data.includes.Asset);
            setAssets(data.includes.Asset);
            const filteredRecipes = data.items.filter(item => item.fields.typeOfFood === 3);
            console.log('filtered Recipes:', filteredRecipes)
            setDinnerRecipes(filteredRecipes);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchData();
}, []);

return (
    <div className="recipe-card-container">
        {dinnerRecipes.map(recipe => {
            const asset = assets.find(asset => asset.fields.title === recipe.fields.title);
            console.log('Asset:', asset);
            if (!asset) return null; 
            console.log('Asset fields:', asset.fields);
            return (
                <Link key={recipe.sys.id} to={`/${recipe.sys.id}`}>
                    <DisplayRecipes recipeAsset={asset.fields} />
                </Link>
            );
        })}
    </div>
    );
}

export default Dinner;
