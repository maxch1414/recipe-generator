"use client";

import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
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

  const handles: SubmitHandler<FormValues> = (data) => {
    onSubmit(data.ingredientSearch.label);
  };

  return (
    <form onSubmit={handleSubmit(handles)}>
      <Controller
        name="ingredientSearch"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={ingredientOptions}
            placeholder="Search Ingredients"
            onChange={(selectedOption) => field.onChange(selectedOption)}
            instanceId="ingredient-select"
          />
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
