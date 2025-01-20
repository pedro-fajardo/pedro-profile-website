export default function Copyright() {
    const getYear = () => {
        const date = new Date();
        return date.getFullYear();
    }

    return (
        <div className="text-center text-white py-4 bg-red-700">
            <p className="text-lg">© {getYear()} Pedro Fajardo - All rights reserved.</p>
        </div>
    );
}
