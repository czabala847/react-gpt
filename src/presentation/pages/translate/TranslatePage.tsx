import { useState } from "react"
import { translateUseCase } from "../../../core"
import {
  GptMessage,
  MyMessage,
  TextMessageBoxSelect,
  TypingLoader,
} from "../../components"

interface Message {
  text: string;
  isGpt: boolean;
}

export const TranslatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedOption: string) => {
    const newMessage = `Traduce "${text}" al idioma ${selectedOption}`;

    setIsLoading(true);
    setMessages((prev) => [...prev, { text: newMessage, isGpt: false }]);

    const { ok, text: translatedText } = await translateUseCase(
      text,
      selectedOption
    );
    if (!ok) {
      setMessages((prev) => [...prev, { text: translatedText, isGpt: true }]);
    } else {
      setMessages((prev) => [...prev, { text: translatedText, isGpt: true }]);
    }
    setIsLoading(false);

    // Todo: Añadir el mensaje de isGPT en true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="¿Qué deseas traducir hoy?" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>

      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
        options={[
          { id: "alemán", text: "Alemán" },
          { id: "árabe", text: "Árabe" },
          { id: "bengalí", text: "Bengalí" },
          { id: "francés", text: "Francés" },
          { id: "hindi", text: "Hindi" },
          { id: "inglés", text: "Inglés" },
          { id: "japonés", text: "Japonés" },
          { id: "mandarín", text: "Mandarín" },
          { id: "portugués", text: "Portugués" },
          { id: "ruso", text: "Ruso" },
        ]}
      />
    </div>
  );
};
