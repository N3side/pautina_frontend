import {$fetch} from "@/shared/api/fetch";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dracula} from "react-syntax-highlighter/dist/cjs/styles/prism";


export default function DocumentCard({ document }) {

    async function approve() {
        const response = await $fetch(`admin/documents/${document?.id}/approve`, {method: "PATCH"})
    }

    async function reject() {
        const response = await $fetch(`admin/documents/${document?.id}/reject`, {method: "PATCH"})
    }

    return (
        <div className="glass-effect rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">

            {/* Индикатор статуса: Желтый для ожидания, Красный для отклоненного */}
            {document.status === "pending" && (
                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"/>
            )}
            {document.status === "rejected" && (
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"/>
            )}

            <img src={document?.file_url} alt=""/>

            <SyntaxHighlighter
                language="json"
                style={dracula}
                customStyle={{
                    width: "100%",
                    background: "transparent"
                }}
            >
                {JSON.stringify(document, null, 2)}
            </SyntaxHighlighter>

            <div className="flex gap-3">
                <ActionButton text="Принять" onClick={approve} />
                <ActionButton text="Отклонить" onClick={reject} />
            </div>

        </div>
    );
}