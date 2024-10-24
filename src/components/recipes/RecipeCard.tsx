import React, { Dispatch, SetStateAction } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FullRecipe } from "@/lib/types";
import Image from "next/image";

type Props = {
  recipe: FullRecipe;
  setSelectedRecipe: Dispatch<SetStateAction<FullRecipe | null>>;
  openModal: () => void;
};

export const RecipeCard = ({ recipe, setSelectedRecipe, openModal }: Props) => {
  const handleClick = () => {
    setSelectedRecipe(recipe);
    openModal();
  };
  return (
    <Card
      className="overflow-hidden cursor-pointer"
      role="griditem"
      onClick={handleClick}
    >
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-semibold line-clamp-2">
          {recipe.strMeal}
        </CardTitle>
      </CardContent>
    </Card>
    // <Card
    //   className="w-full max-w-3xl overflow-hidden"
    //   role="griditem"
    //   onClick={handleClick}
    // >
    //   <CardHeader className="p-0">
    //     <div className="relative h-48 w-full">
    //       <Image
    //         src={recipe.strMealThumb}
    //         alt={recipe.strMeal}
    //         fill
    //         className="object-cover"
    //         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    //       />
    //     </div>
    //   </CardHeader>
    //   <CardContent className="p-4">
    //     <ScrollArea className="h-[400px] pr-4">
    //       <CardTitle className="text-2xl font-semibold mb-2">
    //         {recipe.strMeal}
    //       </CardTitle>

    //       <section className="mb-4">
    //         <h3 className="text-lg font-semibold mb-2">General Information</h3>
    //         <p>
    //           <strong>ID:</strong> {recipe.idMeal}
    //         </p>
    //         <p>
    //           <strong>Category:</strong> {recipe.strCategory}
    //         </p>
    //         <p>
    //           <strong>Area:</strong> {recipe.strArea}
    //         </p>
    //         {recipe.strDrinkAlternate && (
    //           <p>
    //             <strong>Drink Alternate:</strong> {recipe.strDrinkAlternate}
    //           </p>
    //         )}
    //         {recipe.strTags && (
    //           <div className="flex flex-wrap gap-2 mt-2">
    //             {recipe.strTags.split(",").map((tag) => (
    //               <Badge key={tag} variant="secondary">
    //                 {tag.trim()}
    //               </Badge>
    //             ))}
    //           </div>
    //         )}
    //       </section>

    //       {/* <Separator className="my-4" /> */}

    //       <section className="mb-4">
    //         <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
    //         {/* <ul className="list-disc pl-5">{renderIngredients()}</ul> */}
    //       </section>

    //       {/* <Separator className="my-4" /> */}

    //       <section className="mb-4">
    //         <h3 className="text-lg font-semibold mb-2">Instructions</h3>
    //         <p>{recipe.strInstructions}</p>
    //       </section>

    //       {/* <Separator className="my-4" /> */}

    //       <section className="mb-4">
    //         <h3 className="text-lg font-semibold mb-2">
    //           Additional Information
    //         </h3>
    //         <Button variant="outline" asChild className="mb-2">
    //           <Link
    //             href={recipe.strYoutube}
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             Watch on YouTube <LinkIcon className="ml-2 h-4 w-4" />
    //           </Link>
    //         </Button>
    //       </section>
    //     </ScrollArea>
    //     <Button onClick={handleClick} className="w-full mt-4">
    //       View Full Recipe
    //     </Button>
    //   </CardContent>
    // </Card>
  );
};
