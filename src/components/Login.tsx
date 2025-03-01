import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useContext, useState} from "react";
import {PocketBaseContext} from "@/lib/pocketbase.ts";
import {toast} from "sonner";

export function LoginForm() {
    const [email, setEmail] = useState('')
    const [passwd, setPasswd] = useState('')
    const pb = useContext(PocketBaseContext)

    function login() {
        const authData = pb.admins.authWithPassword(
            email,
            passwd,
        )

        authData
            .then(() => setTimeout(() => window.location.reload(), 300))
            .catch(err => toast(`fehler :( :: ${err}`))
            .finally(() => {
                setEmail('')
                setPasswd('')
            })
    }

    return (
        <Card className="mx-auto h-min">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Pocketbase Benutzerdaten
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input id="password" type="password" required onChange={e => setPasswd(e.target.value)} />
                    </div>
                    <Button type="submit" className="w-full" onClick={login}>
                        Login
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
