import OpenAI from "openai";
import { cache } from "react";

const openai = new OpenAI();

const fetchStructure = cache(async (input: string, model: string) => {
  console.log("asking gpt for structure");
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
You are a skillful frontend code provider, your job is to take in a data with arbitrary format, and then output a suitable react jsx component format for displaying the data. 
The data size is limited to 20 records and below so that no pagination is required. 
The data format might be a javascript array or a singular data. What listed below is your fundamental guideline for your response.

# Input format
- Might contain a single object with arbitrary amount of key-value pairs.
- Might contain an array of arbitrary number of objects, each object might contain arbitrary amount of key-value pairs.
- Values in the object might be numbers, strings, ISO8601 dates, or boolean values.

# Return format
- Should be plain html/css format so it can be dangerously set inter div's innerHTML.
- Should not include any lexical response.
- Should not include imports.
- Should not include returns.
- Should not include any variable declaration or assignments.
- All the stylings should be done by inline html tag css styling.
- According to the input format, the return format should be in two of the following structures: Table structure and Card structure.

## Table structure
- Should have a header row for the object keys with emphasizing stylings.
- For the header rows, the text should not be wrapped, and should be formatted according to human readable format.
- Should have body rows displaying all the input data.
- Should align the text (including header and body rows) according to different values associated with the key:
    - For numbers, the text should be aligned to the right.
    - For strings and ISO8601 dates, the text should be aligned to the left.
    - For the boolean values, the header text should be aligned to the left, and the body value should be displayed as a checkbox.
- Should not have wrapping text in the cells.
- If an object id is present in the object, all table rows should have an anchor linked to the detail page of the object, which the href should be "<data model name>/<object id>". 
  e.g.: "users" with object id "1" should be linked to "/users/1", "courses" with object id "math" should be linked to "/courses/math".

## Card structure
- Should have a border radius and box shadow to indicate a card styling.
- Should display input key and value together, separated with a colon, and aligned to the left ends of the text.
- Should have a minimum width of 200px, if the content will be wrapped, the card width should be set to fit-content.
- Should display the maximum amount of the data possible.
- Should not have any 'view details' button.
- Should have respective display format for different data types:
    - For strings and numbers, the value should be plain text.
    - For ISO8601 dates, the value should be converted into the date format "YYYY-MM-DD HH:mm".
    - For boolean values, the value should be displayed as a green dot for "true", and a red dot for "false".
- If there is a key value pair you think might be suitable for the Card head, then use it as the head, and give it a different styling to let it stand out.
`,
      },
      {
        role: "user",
        content: `${input}, data model is ${model}`,
      },
    ],
    model: "gpt-4o",
    temperature: 0,
    seed: 87,
  });
  console.log("gpt responsed");
  return completion.choices[0];
});

export { fetchStructure };
