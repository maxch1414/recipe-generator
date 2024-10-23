import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Recipe } from "@/lib/types";
import Image from "next/image";

type Props = {
  recipe: Recipe;
};

export const RecipeCard = ({ recipe }: Props) => {
  return (
    <Card className="overflow-hidden" role="griditem">
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
  );
};
