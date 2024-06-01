export default function Messages() {
    const messages = [
        { id: 1, text: "Olá, tudo bem?", type: "sent" },
        { id: 2, text: "Sim, e você?", type: "received" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        { id: 3, text: "Estou bem também!", type: "sent" },
        // Adicione mais mensagens conforme necessário
    ];

    return (
        <ul className="overflow-y-auto  w-full h-full p-4 flex flex-col space-y-2 text-gray-50 scrollbar-custom">
            {messages.map((message) => (
                <li
                    key={message.id}
                    className={`rounded-3xl px-4 py-2 max-w-[70%] break-words shadow-md shadow-gray-700 ${
                        message.type === "sent" ? "self-start bg-gray-500" : "self-end bg-purple-700"
                    }`}
                >
                    {message.text}
                </li>
            ))}
        </ul>
    );
}
