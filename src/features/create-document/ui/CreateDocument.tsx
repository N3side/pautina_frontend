import Stepper from "@/shared/ui/Stepper/Stepper";
import {useContext, useEffect, useMemo, useState} from "react";
import UploadFile from "@/features/create-document/ui/UploadFile";
import {UserContext} from "@/entities/user";
import UpdateDocument from "@/features/create-document/ui/UpdateDocument";

export default function CreateDocumentForms({setDocuments, close}) {

    const { user } = useContext(UserContext);

    const [documentId, setDocumentId] = useState<string | null>(user?.main?.last_created_document_id || null);
    const [position, setPosition] = useState<number>(user?.main?.last_created_document_id ? 1 : 0);

    useEffect(() => {
        if (user?.main?.last_created_document_id && !documentId) {
            setDocumentId(user.main?.last_created_document_id);
            setPosition(1);
        }
    }, [user, documentId]);

    const next = () => setPosition((p) => p + 1);
    const prev = () => setPosition((p) => (p > 0 ? p - 1 : p));

    const formContent = useMemo(() => {
        // Описываем компоненты без лишних условий
        const steps = [
            <UploadFile
                key="upload"
                setDocuments={setDocuments}
                setDocumentId={setDocumentId}
                next={next}
                prev={prev}
                close={close}
            />,
            <UpdateDocument
                setDocuments={setDocuments}
                key="update"
                // @ts-ignore
                document_id={+documentId}
                close={close}
            />,
        ];

        return (
            <Stepper position={position}>
                {steps[position] || null}
            </Stepper>
        );
    }, [position, documentId]);

    return (
        formContent
    )
}