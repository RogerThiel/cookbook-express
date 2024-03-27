function DisplayRecipes({ recipeAsset }) {
    return (
        <div className='recipe-card'>
            <figcaption className="recipe-caption">{recipeAsset.title}</figcaption>
            <img className="recipe-image" src={recipeAsset.file.url} alt={recipeAsset.title} />
            <div className="recipe-teaser">{recipeAsset.description}</div>
        </div>
    );
}

export default DisplayRecipes;