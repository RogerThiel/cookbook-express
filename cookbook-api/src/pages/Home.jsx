import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { createClient } from 'contentful';
import DisplayRecipes from '../ui/DisplayRecipes';

function Home() {

    const [recipes, setRecipes] = useState([]);

    // const client = createClient({ space: `${import.meta.env.VITE_contentful_space_id}`, accessToken: `${import.meta.env.VITE_contentful_delivery_api_key}`});

    useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(import.meta.env.VITE_SERVER_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setRecipes(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
  
      fetchData();
    }, []);

    return (
        <div className="recipe-card-container">
            {recipes?.includes?.Asset?.map(({ fields, sys }) => (
                <Link key={sys.id} to={`/${sys.id}`}>
                    <DisplayRecipes recipeAsset={fields} />
                </Link>
            ))}
        </div>
    );

}

export default Home;
