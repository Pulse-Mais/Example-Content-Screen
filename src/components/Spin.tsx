

export function Spin() {
    return (
        <svg className="animate-spin h-5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" className="stroke-current text-blue-600" strokeWidth="3" />
            <circle cx="12" cy="12" r="10" fill="none" strokeDasharray="20, 40" className="stroke-current text-blue-400" strokeWidth="3" />
        </svg>
    )
}