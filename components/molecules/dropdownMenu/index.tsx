"use client";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuProps } from "./type";
export const  DropDownMenu = ({trigger, options}:DropdownMenuProps)=>{
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {
          options.map((option, index) => (
            <DropdownMenuItem key={index} onClick={option.onClick}>
              {option.icon}
              <span className="ml-2">{option.label}</span>
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
