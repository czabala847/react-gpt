export const translateUseCase = async (prompt: string, lang: string) => {
  try {
    const response = await fetch(import.meta.env.VITE_GPT_API + "/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({ prompt, lang }),
    });

    if (!response.ok) {
      throw new Error("No se pudo traducir el texto");
    }

    if (!response.ok) {
      throw new Error("No se pudo obtener los pros y los contras");
    }

    const data = (await response.json()) as { translated: string };

    return {
      ok: true,
      text: data.translated,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      text: "No se pudo traducir el texto",
    };
  }
};
