import { CSSProperties } from "react";

type JsonDisplayProps = {
    data: object;
    title: string;
    style?: CSSProperties;
};

export default function JsonDisplay({ data, title, style }: JsonDisplayProps) {
    const defaultStyle: CSSProperties = {
        backgroundColor: '#a8a8a8',
        color: '#454545',
        padding: '16px',
        borderRadius: '8px',
        overflowX: 'auto',
        fontFamily: 'Consolas, Monaco, monospace',
        whiteSpace: 'pre-wrap',
        margin: 0,
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <h2>{title}</h2>
            <pre style={{ ...defaultStyle, ...style }}>
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}