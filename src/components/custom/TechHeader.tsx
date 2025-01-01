'use client'

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import {SunIcon} from "lucide-react";
import {MoonIcon} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";


interface TechHeaderProps {
    defaultchecked: boolean;
}

export default function TechHeader({defaultchecked}: TechHeaderProps) {

    const { setTheme } = useTheme();


    return (
        <header>
            <div className="border-b px-4 py-2 flex flex-row justify-between">
                <div className="flex items-center">
                    <Link href="/" legacyBehavior passHref>
                        <a className="text-lg font-bold text-primary"> Tech Interpretations </a>
                    </Link>
                </div>
                <div className="flex flex-row gap-4">
                <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/create" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle() + `border`}>
                                        Create
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="flex items-center space-x-2">
                        <SunIcon/>
                        <Switch onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                        defaultChecked={defaultchecked}/>
                        <MoonIcon/>
                    </div>
                </div>
            </div>
        </header>
    );
}