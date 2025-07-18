interface TextWidgetProps {
    text: any;
    className?: string;
}

export const TextWidget = ({ className, text }: TextWidgetProps) => {
    return (
        <div
            className={className}
        >
            {text}
        </div>
    );
}
