import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

interface ModalProps {
    open: boolean;
    id: string;
    time: string;
    date: Date;
    scramble: string;
    solveNumber: number;
    onClickHandler: (timeId: string) => void;
}

const SingleTimeModal = ({
    open,
    id,
    time,
    date,
    scramble,
    onClickHandler,
    solveNumber
}: ModalProps) => {
    const dateInLocalTime = new Date(date).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata"
    });

    return (
        <Dialog open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Solve details (#{solveNumber})</DialogTitle>
                    <DialogDescription>
                        This modal provides information about this solve
                    </DialogDescription>
                </DialogHeader>
                <div>Time: {time}</div>
                <div>Scramble: {scramble}</div>
                <div>Date: {dateInLocalTime}</div>
                <DialogFooter>
                    <Button
                        variant={"destructive"}
                        type="button"
                        onClick={() => onClickHandler(id)}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SingleTimeModal;
