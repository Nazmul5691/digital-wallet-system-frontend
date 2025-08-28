
import { Button } from "@/components/ui/button";

export default function Setting() {
    const handleRestartTour = () => {
        window.dispatchEvent(new Event("restartTour"));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <Button onClick={handleRestartTour} variant="outline" size="sm">
                Restart Guided Tour
            </Button>
        </div>
    );
}
