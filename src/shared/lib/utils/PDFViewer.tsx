'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useState, useEffect, useRef } from 'react';

export function PDFFirstPage({ file }) {
    const [isWorkerReady, setIsWorkerReady] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number | null>(null);

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@5.4.296/build/pdf.worker.mjs';
        setIsWorkerReady(true);
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            setContainerWidth(containerRef?.current?.offsetWidth);
        }
    }, [isWorkerReady]);

    if (!isWorkerReady) return <div>Загрузка...</div>;

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                maxHeight: '500px',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px'
            }}
        >
            <Document
                file={file}
                loading={<div style={{ padding: '20px' }}>Загрузка PDF...</div>}
                error={<div style={{ padding: '20px', color: 'red' }}>Ошибка загрузки PDF</div>}
            >
                <Page
                    pageNumber={1}
                    width={containerWidth || 400}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    loading={<div style={{ padding: '20px' }}>Загрузка страницы...</div>}
                />
            </Document>
        </div>
    );
}