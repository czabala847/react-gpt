export const prosConsStreamUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_GPT_API + "/pros-cons-discusser-stream",
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

    const reader = response.body?.getReader();

    if (!reader) {
      console.error("No se pudo obtener el reader");
      return null;
    }

    return reader;

    // const decoder = new TextDecoder();
    // let text = "";

    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) break;
    //   const decodedChunk = decoder.decode(value, { stream: true });
    //   text += decodedChunk;
    //   console.log(text);
    // }

    // return text;
  } catch (error) {
    console.error(error);
    return null;
  }
};
