import { ChatCompletion } from "openai/resources/index.mjs";
import { fetchStructure } from "./gpt";
import { cache } from "react";
import { COURSES, USERS } from "./database";

export const getUsers = cache(async (): Promise<ChatCompletion.Choice> => {
  return new Promise((resolve) => {
    resolve(fetchStructure(JSON.stringify(USERS), "users"));
  });
});

export const getUser = cache(
  async (id: string): Promise<ChatCompletion.Choice> => {
    return new Promise((resolve, reject) => {
      const user = USERS.find((user) => user.id === id);
      if (!user) {
        reject(new Error("User not found"));
      }
      resolve(fetchStructure(JSON.stringify(user), "users"));
    });
  }
);

export const getCourses = cache(async (): Promise<ChatCompletion.Choice> => {
  return new Promise((resolve) => {
    resolve(fetchStructure(JSON.stringify(COURSES), "courses"));
  });
});

export const getCourse = cache(
  async (id: string): Promise<ChatCompletion.Choice> => {
    return new Promise((resolve, reject) => {
      const course = COURSES.find((course) => course.id === id);
      if (!course) {
        reject(new Error("Course not found"));
      }
      resolve(fetchStructure(JSON.stringify(course), "courses"));
    });
  }
);
