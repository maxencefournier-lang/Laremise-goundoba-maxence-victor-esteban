export function Button({label, type, children}) {
    return (
        <button>
            {label}, {type}, {children}
        </button>
    )
}