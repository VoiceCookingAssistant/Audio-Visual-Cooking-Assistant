
# Table with Intents used during Rasa NLU Tests
| Intents       | Example Sentence   |
| :------------- | :---------------------- |
| FindRecipes | show me recipes with feta |
|SortRecipes | sort the recipes by preparation time please |
| SelectRecipe | lets make chicken curry |
| AddToFavorites| can you add catalan cream to my favorites please |
| RequestRecipeVariant|please show the vegetarian variant |
|StartRecipe | start the recipe |
| CancelRecipe| cancel the recipe |
| GetFunctionHelp|tell me more about using the mixing function |
| NextStep | next step please |
|PreviousStep | show me the previous step |
| SkipStep | can we skip this step please |
| RepeatExplanation| repeat instructions |
| SkipIngredient | i dont have potatoes go on |
| RequestAlternativeIngredient | can we substitute the carrot |
|SetPortions | i am cooking for eight people |
| ShowRecipeStepOverview|how many steps ahead |
|RequestPreparationAlternatives | can you show me an alternative preparation method|
|SetDisplayBrightness |set display brightness to seventy percent |
| IncreaseDisplayBrightness| turn up display brightness please|
| DecreaseDisplayBrightness| lets make the display a bit darker |
|GetTemperature | share the temperature with me|
|SetProcessTime | mix for three minutes |
| IncreaseProcessDuration| increase duration by one minute |
| DecreaseProcessDuration| two minutes less please |
| ChangeSpeed| change speed to level nine |
| ChangeLanguage| switch language to english|
| PowerOff| now turn off |
| GetDuration | when is the meal finished |
| GetAmountOfIngredient | how much powdered sugar do we need |
|ShowToolPicture | how does the double whisk attachment look like |
| ResetScale | please reset the scale |
|ReactionToDisplay | continue please |
| Refuse | no please not |
| Confirm| absolutely |
|RequestFeedback | what should i do when the milk is boiling |
|StartProcess | start with slicing |
| StopProcess | stop it now |
| IncreaseSoundvolume | raise the volume please |
| DecreaseSoundvolume | decrease the sound volume |

# Table with Entities used during Rasa NLU Tests
| Entities       | Example Value   |
| :------------- | :---------------------- |
|recipe| chicken curry |
|ingredient| rice |
|amount| four |
|unit| tablespoons |
|recipe_entity| meal |
|function_name| chop|
|ingredient_name| cinnamon powder|
|recipe_type| vegetarian |
|recipe_category| calories |
|duration| thirty seconds|
|tool| twin beater |
|speed_action| reduce |
|speed_level| eleven |
|process_name| slicing |
|brightness| thirty percent |
|old_language| german |
|new_language| english|
|feedback_topic| water is boiling |
|reaction| add more |
