import type { ProsConsResponse } from "../../interfaces"

export const prosConsUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_GPT_API + "/pros-cons-discusser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!response.ok) {
      throw new Error("No se pudo obtener los pros y los contras");
    }

    const data = (await response.json()) as ProsConsResponse;

    return {
      ok: true,
      content: data.content,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      content: "No se pudo obtener los pros y los contras",
    };
  }
};
