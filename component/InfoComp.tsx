export const Info = ({ label, value }: { label: string; value: string }) => (
        <div>
            <p className="font-medium">{label}:</p>
            <p>{value}</p>
        </div>
    );