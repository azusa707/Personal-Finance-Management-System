import { useNewAccount } from "@/features/accounts/hooks/use-new-accounts";
import { insertAccountSchema } from "@/db/schema";
import { AccountForm } from "@/features/accounts/components/account-form";
import { z } from "zod";
import {
    Sheet,
    SheetDescription,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useCreateAccount } from "../api/use-create-accounts";

const formSchema = insertAccountSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();

    const mutation = useCreateAccount();

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values);
    };
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
                <AccountForm onSubmit={onSubmit} disabled={false} defaultValues={{
                    name: "",
                }} />
            </SheetContent>
        </Sheet>
    );
};
