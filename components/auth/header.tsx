interface HeaderProps {
    label: string;
}

export const Header = ({label}: HeaderProps) => {
    return (
        <header className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className="text-3xl font-semibold">
                🔐 Auth
            </h1>
            <p className="text-sm text-muted-foreground">{label}</p>
        </header>
    );
};
