import type { OrthographyResponse } from "../../interfaces"

export const orthographyUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_GPT_API + "/orthography-check",
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
      throw new Error("No se pudo corregir la ortografía");
    }

    const data = (await response.json()) as OrthographyResponse;

    return {
      ok: true,
      userScore: data.userScore,
      errors: data.errors,
      message: data.message,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: "Error al corregir la ortografía",
    };
  }
};
