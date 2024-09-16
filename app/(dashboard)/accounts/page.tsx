"use client";

import { useNewAccount } from "@/features/accounts/hooks/use-new-accounts";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { columns, Payment } from "./columns";
import { DataTable } from "@/components/ui/data-table";


const data: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    }
]

const AccountsPage = () => {
    const newAccount = useNewAccount();
    return (
        <div className="-mt-24">
            <Card className="border-none drop-shadow-sm bg-white">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Accounts page
                    </CardTitle>
                    <Button onClick={newAccount.onOpen} size="sm" className="bg-black text-white">
                        <Plus className="size-4 mr-2" />
                        Add account
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={data} />

                </CardContent>
            </Card>
        </div>
    );
};

export default AccountsPage;