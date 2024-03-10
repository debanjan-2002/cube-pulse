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
    scramble: string;
    solveNumber: number;
    onClickHandler: (timeId: string) => void;
}

const Modal = ({
    open,
    id,
    time,
    scramble,
    onClickHandler,
    solveNumber
}: ModalProps) => {
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

export default Modal;
