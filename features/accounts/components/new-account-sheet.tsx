import { useNewAccount } from "@/features/accounts/hooks/use-new-accounts";

import {
    Sheet,
    SheetDescription,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm } from "@/features/accounts/components/account-form";

export const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New Account
                    </SheetTitle>
                    <SheetDescription>
                        Create a new account for your personal finance management.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm onSubmit={() => { }} disabled={false} />
            </SheetContent>
        </Sheet>
    );
};
