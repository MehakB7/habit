"use client"
import { useTheme } from "next-themes";
import { DropDownMenu } from "."
import { MoonIcon, SunIcon ,MonitorCog, Sun, Moon} from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeMenu = () => {
    const { setTheme } = useTheme();

    const options = [
        {
            icon: <MoonIcon />,
            label: "Dark",
            onClick: () => setTheme("dark"),
        },
        {
            icon: <SunIcon />,
            label: "Light",
            onClick: () => setTheme("light"),
        },
        {
            icon: <MonitorCog/>,
            label: "System",
            onClick: () => setTheme("system"),
        }

    ]


  return (
    <DropDownMenu trigger={
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-accent-foreground transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    }
    options= {options}
    />
  )
}



export default ThemeMenu