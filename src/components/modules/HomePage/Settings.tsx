import { Button } from "@/components/ui/button";

export default function Settings() {
    const handleRestartTour = () => {
        window.dispatchEvent(new Event("restartTour"));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-4">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <Button onClick={handleRestartTour} variant="outline" size="sm">
                Restart Guided Tour
            </Button>
        </div>
    );
}
