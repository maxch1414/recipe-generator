import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FullRecipe } from "@/lib/types";
import { ScrollArea } from "../ui/scroll-area";
import { ExternalLink } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";

type Props = {
  recipe: FullRecipe;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function RecipeModal({ recipe, open, setOpen }: Readonly<Props>) {
  const renderIngredients = () => {
    return Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
      const ingredient = recipe[`strIngredient${num}` as keyof FullRecipe];
      const measure = recipe[`strMeasure${num}` as keyof FullRecipe];
      if (ingredient && ingredient.toString().trim() !== "") {
        return (
          <li key={num} className="mb-1">
            {ingredient}: {measure}
          </li>
        );
      }
      return null;
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[60vw] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {recipe.strMeal}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>ID: {recipe.idMeal}</DialogDescription>
        <ScrollArea className="pr-4 max-h-[calc(75vh-120px)]">
          <div className="space-y-6">
            <div className="relative h-48 w-full">
              <Image
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <section>
              <p>
                <strong>Course:</strong> {recipe.strCategory}
              </p>
              <p>
                <strong>Origin:</strong> {recipe.strArea}
              </p>
              {recipe.strDrinkAlternate && (
                <p>
                  <strong>Drink Alternate:</strong> {recipe.strDrinkAlternate}
                </p>
              )}
              {recipe.strTags && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <strong className="w-full">Tags:</strong>
                  {recipe.strTags.split(",").map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc pl-5">{renderIngredients()}</ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Instructions</h3>
              <p className="whitespace-pre-line">{recipe.strInstructions}</p>
            </section>

            <div className="space-y-2">
              <Button variant="outline" asChild className="w-full">
                <a
                  href={recipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch on YouTube <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="space-y-2">
              <Button variant="outline" asChild className="w-full">
                <a
                  href={recipe.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Recipe Source <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
