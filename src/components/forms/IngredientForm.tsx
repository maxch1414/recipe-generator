"use client";

import React from "react";
import { useForm, Controller, SubmitHandler, useWatch } from "react-hook-form";
import { Ingredient } from "../../lib/types";
import { Button } from "../ui/button";
import Select from "react-select";

type IngredientFormProps = {
  ingredients: Ingredient[];
  onSubmit: (ingredientId: string) => void;
};

type FormValues = {
  ingredientSearch: { label: string };
};

export const IngredientForm = ({
  ingredients,
  onSubmit,
}: IngredientFormProps) => {
  const { control, handleSubmit } = useForm<FormValues>();

  const ingredientOptions = ingredients.map((ingredient) => ({
    value: ingredient.idIngredient,
    label: ingredient.strIngredient,
  }));

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    onSubmit(data.ingredientSearch.label);
  };

  const selectedIngredient = useWatch({
    control,
    name: "ingredientSearch",
  });

  return (
    <div className="flex justify-center items-center w-full px-4 py-8">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="w-full max-w-md"
      >
        <Controller
          name="ingredientSearch"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={ingredientOptions}
              placeholder="Search Ingredient"
              onChange={(selectedOption) => field.onChange(selectedOption)}
              instanceId="ingredient-select"
            />
          )}
        />
        <Button
          className="w-full mt-2"
          type="submit"
          disabled={!selectedIngredient}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
